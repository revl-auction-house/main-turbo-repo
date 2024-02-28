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
  DepositProof,
  DepositHashProof,
  EncryptedBalance1,
  EncryptedSum,
  TransferProof,
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

  /**
   * currentBalance (C) = amount (A) + resultingBalance (B)
   */
  @runtimeMethod()
  public transfer(transferProof: TransferProof) {
    const transferProofOutput = transferProof.publicOutput;
    transferProof.verify();
    const sender = this.transaction.sender.value;
    /**
     * Check that the transferProof's innitial balance matches
     * with the known/stored balance on chain.
     */
    const currentBalance = this.ledger.get(sender).value;
    assert(
      transferProofOutput.currentBalance.equals(currentBalance),
      "Proven encrypted balance does not match current known encrypted balance"
    );
    /**
     * Update the encrypted balance stored in the ledger using
     * the value from the proof
     */
    this.ledger.set(sender, transferProofOutput.resultingBalance);
    /**
     * create claim for the recipient
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
   * resultingBalance (C) = amount (A) + currentBalance (B)
   * @param claimKey
   * @param claimProof
   */
  @runtimeMethod()
  public addClaim(claimKey: ClaimKey, encryptedSumProof: EncryptedSum) {
    encryptedSumProof.verify();
    const encryptedSum = encryptedSumProof.publicOutput;
    const sender = this.transaction.sender.value;
    // only intended receipent can add
    assert(claimKey.recipient.equals(sender), "wrong owner");

    const claim = this.claims.get(claimKey).value;
    //  the Claim spend should have the same balance as in the claimProof
    assert(
      claim.equals(encryptedSum.encA),
      "claim amount does not match claimProof amount"
    );
    const currentBalance = this.ledger.get(sender);
    // if "first time" finalBalance = amount
    // else finalBalance = currentBalance + amount
    const finalBalance = Provable.if(
      currentBalance.isSome,
      encryptedSum.encC,
      encryptedSum.encA
    );
    // if not "first time" then check if the proof used the correct currentBalance.
    assert(
      Provable.if(
        currentBalance.isSome,
        currentBalance.value.equals(encryptedSum.encB),
        Bool(true)
      ),
      "currentBalance missmatch"
    );

    // Update the encrypted balance of the ledger
    this.ledger.set(sender, finalBalance);
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
      this.transaction.sender.value,
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
    const currentBalance = this.ledger.get(to);
    // check if the proof used the correct currentBalance.
    assert(
      Provable.if(
        currentBalance.isSome,
        currentBalance.value.equals(proofOutput.currentBalance),
        Bool(true)
      ),
      "currentBalance missmatch"
    );
    // Update the encrypted balance of the ledger
    const finalBalance = Provable.if(
      currentBalance.isSome,
      proofOutput.resultingBalance,
      proofOutput.amount
    );
    this.ledger.set(to, finalBalance);
  }

  /**
   * currentBalance(C) = amount(A) + resultingBalance(B)
   */
  @runtimeMethod()
  public withdraw(encProof: EncryptedSum) {
    encProof.verify();
    const encryptedSum = encProof.publicOutput;
    const sender = this.transaction.sender.value;
    const currentBalance = this.ledger.get(sender);
    assert(currentBalance.isSome, "have no balance");
    // Check that the proof's innitial balance matches with on chain amount
    assert(
      encryptedSum.encC.equals(currentBalance.value),
      "proofs encrypted balance does not match currently known encrypted balance"
    );
    assert(encryptedSum.AisRevealed, "A is not revealed");
    // Update the encrypted balance stored in the ledger
    this.ledger.set(sender, encryptedSum.encB);
    // return the user Tokens
    this.unlockBalance(sender, encryptedSum.A);
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
