import {
  runtimeMethod,
  RuntimeModule,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { assert, State, StateMap } from "@proto-kit/protocol";
import {
  Bool,
  Encoding,
  Field,
  Poseidon,
  Provable,
  PublicKey,
  Struct,
  UInt64,
} from "o1js";
import {
  EncryptedBalance,
  ClaimProof,
  DepositProof,
  TransferProof,
  DepositHashProof,
  WithdrawProof,
  EncryptedBalance1,
} from "./Proofs";
import { inject } from "tsyringe";
import { Balances } from "../Balances";

export class ClaimKey extends Struct({
  recipient: PublicKey,
  index: UInt64,
}) {
  public static from(recipient: PublicKey, index: UInt64) {
    return new ClaimKey({ recipient, index });
  }
}

@runtimeModule()
export class PrivateToken extends RuntimeModule<unknown> {
  public readonly DEPOSIT_ADDRESS = PublicKey.from({
    x: Poseidon.hash(Encoding.stringToFields("PrivateToken.deposit")),
    isOdd: Bool(false),
  });

  @state() public ledger = StateMap.from<PublicKey, EncryptedBalance>(
    PublicKey,
    EncryptedBalance
  );
  // unspent claims, like unspent outputs?
  @state() public claims = StateMap.from<ClaimKey, EncryptedBalance1>(
    ClaimKey,
    EncryptedBalance1
  );
  // a counter per user for each new claim
  @state() public nonces = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

  @state() public deposits = StateMap.from<UInt64, Field>(UInt64, Field);
  @state() public depositNounce = State.from(UInt64);

  @state() public nullifiers = StateMap.from<Field, Field>(Field, Field);

  public constructor(@inject("Balances") public balance: Balances) {
    super();
    // this.depositNounce.set(Field(0));
  }

  @runtimeMethod()
  public transfer(transferProof: TransferProof) {
    const transferProofOutput = transferProof.publicOutput;
    transferProof.verify();
    /**
     * Check that the transferProof's innitial balance matches
     * with the known/stored balance on chain.
     */
    const currentBalance = this.ledger.get(transferProofOutput.owner).value;
    assert(
      transferProofOutput.currentBalance.equals(currentBalance),
      "Proven encrypted balance does not match current known encrypted balance"
    );
    /**
     * Update the encrypted balance stored in the ledger using
     * the calculated values from the proof
     */
    this.ledger.set(
      transferProofOutput.owner,
      transferProofOutput.resultingBalance
    );
    /**
     * At this point we have authorized the sender knows their balance,
     * and also that it is sufficient to make this transfer.
     *
     * We can create a claim that will increase the recipient's balance
     * when eventually claimed
     */
    const to = transferProofOutput.to;
    const claimKey = ClaimKey.from(to, this.nonces.get(to).value);
    // update nounce
    this.nonces.set(to, this.nonces.get(to).value.add(1));
    // store the claim so it can be claimed later
    this.claims.set(
      claimKey,
      EncryptedBalance1.fromEncryptedBalance(transferProofOutput.amount)
    );
  }

  /**
   * Adds the Claim amount to ledger balance.
   * resultingBalance = currentBalance + amount
   * @param claimKey
   * @param claimProof
   */
  @runtimeMethod()
  public addClaim(claimKey: ClaimKey, claimProof: ClaimProof) {
    claimProof.verify();
    const claimProofOutput = claimProof.publicOutput;
    // only intended receipent can add
    assert(claimKey.recipient.equals(claimProofOutput.owner), "wrong owner");

    const claim = this.claims.get(claimKey).value;
    //  the Claim spend should have the same balance as in the claimProof
    assert(
      claim.equals(claimProofOutput.amount),
      "claim amount does not match claimProof amount"
    );
    const currentBalance = this.ledger.get(claimProofOutput.owner);
    // if "first time" finalBalance = amount
    // else finalBalance = currentBalance + amount
    const finalBalance = Provable.if(
      currentBalance.isSome,
      claimProofOutput.resultingBalance,
      claimProofOutput.amount
    );
    // if not "first time" then check if the proof used the correct currentBalance.
    assert(
      Provable.if(
        currentBalance.isSome,
        currentBalance.value.equals(claimProofOutput.currentBalance),
        Bool(true)
      ),
      "currentBalance missmatch"
    );

    // Update the encrypted balance of the ledger
    this.ledger.set(claimProofOutput.owner, finalBalance);
    // update the claim to prevent double spent
    // TODO use .delete
    this.claims.set(claimKey, EncryptedBalance1.empty());
  }
  /**
   * deposit normal token to get private Token
   */
  @runtimeMethod()
  public deposit(depositHashProof: DepositHashProof) {
    const nounce = this.depositNounce.get();
    depositHashProof.verify();
    this.deposits.set(nounce.value, depositHashProof.publicOutput);
    // update depositNounce
    this.depositNounce.set(nounce.value.add(Field(1)));
    // transfer amount to dEPOSITADDRESS
    this.balance.transferFrom(
      this.transaction.sender,
      this.DEPOSIT_ADDRESS,
      depositHashProof.publicInput // amount
    );
  }

  /**
   * converts deposited token to private token
   */
  @runtimeMethod()
  public addDeposit(depositProof: DepositProof) {
    depositProof.verify();
    const proofOutput = depositProof.publicOutput;

    // check nullifier does not already exist
    assert(
      this.nullifiers.get(proofOutput.nullifierHash).isSome.not(),
      "Nullifier already used"
    );

    // TODO verifies storage proof
    // proofOutput.path == this.deposits.path
    // proofOutput.rootHash exists in historical hashes

    const to = proofOutput.to;
    const claimKey = ClaimKey.from(to, this.nonces.get(to).value);
    // update nounce
    this.nonces.set(to, this.nonces.get(to).value.add(1));
    // store the claim so it can be claimed later
    this.claims.set(
      claimKey,
      EncryptedBalance1.fromEncryptedBalance(proofOutput.amount)
    );
  }

  /**
   * Transter to `this.WITHDRAW_ADDRESS` to get tokens back
   */
  @runtimeMethod()
  public withdraw(withdrawProof: WithdrawProof) {
    const withdrawProofOutput = withdrawProof.publicOutput;
    withdrawProof.verify();
    // Check that the withdrawProof's innitial balance matches with on chain amount
    const currentBalance = this.ledger.get(withdrawProofOutput.owner).value;
    assert(
      withdrawProofOutput.currentBalance.equals(currentBalance),
      "Proven encrypted balance does not match current known encrypted balance"
    );
    // Update the encrypted balance stored in the ledger
    this.ledger.set(
      withdrawProofOutput.owner,
      withdrawProofOutput.resultingBalance
    );
    // return the user Tokens
    this.unlockBalance(withdrawProofOutput.owner, withdrawProofOutput.amount);
  }
  /**
   * to process withdrawals or to return locked funds by other runtimes
   * @param address
   * @param amount
   */
  public unlockBalance(address: PublicKey, amount: UInt64) {
    this.balance.transferFrom(this.DEPOSIT_ADDRESS, address, amount);
  }
}
