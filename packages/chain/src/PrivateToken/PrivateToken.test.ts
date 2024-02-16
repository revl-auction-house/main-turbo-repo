import "reflect-metadata";
import { AppChainTransaction, TestingAppChain } from "@proto-kit/sdk";
import { ModuleQuery } from "@proto-kit/sequencer";
import {
  Bool,
  Field,
  MerkleMap,
  MerkleMapWitness,
  Poseidon,
  PrivateKey,
  PublicKey,
  UInt64,
} from "o1js";
import { log } from "@proto-kit/common";
import { ClaimKey, PrivateToken } from "./PrivateToken";

import {
  EncryptedBalance,
  DepositProof,
  EncryptedSum,
  DepositHashProof,
  generateDepositHash,
  EncryptedBalance1,
  TransferProof,
} from "./Proofs";
import { Balances } from "../Balances";
import { Pickles } from "o1js/dist/node/snarky";
import { dummyBase64Proof } from "o1js/dist/node/lib/proof_system";

log.setLevel("ERROR");

describe("Private Token", () => {
  let appChain: TestingAppChain<
    {
      PrivateToken: typeof PrivateToken;
      Balances: typeof Balances;
    },
    {}
  >;
  let alicePrivateKey: PrivateKey;
  let alice: PublicKey;
  let bobPrivateKey: PrivateKey;
  let bob: PublicKey;
  let privateToken: PrivateToken;
  let privateTokenQuery: ModuleQuery<PrivateToken>;
  let balances: Balances;
  let balanceQuery: ModuleQuery<Balances>;

  beforeEach(async () => {
    //@ts-ignore
    appChain = TestingAppChain.fromRuntime({
      modules: {
        PrivateToken,
        Balances,
      },
    });
    appChain.configure({
      Runtime: {
        PrivateToken: {},
        Balances: {},
      },
    });
    await appChain.start();

    alicePrivateKey = PrivateKey.random();
    alice = alicePrivateKey.toPublicKey();
    bobPrivateKey = PrivateKey.random();
    bob = bobPrivateKey.toPublicKey();

    privateToken = appChain.runtime.resolve("PrivateToken");
    privateTokenQuery = appChain.query.runtime.PrivateToken;
    balances = appChain.runtime.resolve("Balances");
    balanceQuery = appChain.query.runtime.Balances;

    // console.log("Alice: ", alice.toBase58());
    // console.log("Bob:   ", bob.toBase58());

    // Alice mints 1000 tokens
    appChain.setSigner(alicePrivateKey);

    let tx = await appChain.transaction(alice, () => {
      balances.addBalance(alice, UInt64.from(1000));
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
  });

  it(
    "should demonstrate how deposit, transfer, claim works",
    async () => {
      // alice deposits 100
      appChain.setSigner(alicePrivateKey);
      const r = Field.random(); // only alice knows
      const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
      const depositHashProof = new DepositHashProof({
        proof: dummy,
        publicInput: UInt64.from(100),
        publicOutput: generateDepositHash(UInt64.from(100), r),
        maxProofsVerified: 2,
      });
      let tx = await appChain.transaction(alice, () => {
        privateToken.deposit(depositHashProof);
      });
      await tx.sign();
      await tx.send();
      let block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);
      expect((await balanceQuery.balances.get(alice))?.toBigInt()).toBe(900n);
      expect(
        (
          await balanceQuery.balances.get(privateToken.DEPOSIT_ADDRESS)
        )?.toBigInt()
      ).toBe(100n);
      expect((await privateTokenQuery.depositNounce.get())?.toBigInt()).toBe(
        1n
      );

      // Alice adds deposited amount to encrypted balance
      const dummyMerkelMap = new MerkleMap(); // TODO remove later when using appChain state
      const dummyWitness = dummyMerkelMap.getWitness(Field(0));

      tx = await addDepositTxn(
        alicePrivateKey,
        UInt64.from(100),
        r,
        dummyWitness
      );
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      let aliceBalance = (await privateTokenQuery.ledger.get(
        alice
      )) as EncryptedBalance;
      expect(aliceBalance.decrypt(alicePrivateKey).toBigInt()).toBe(100n);

      // alice sends some to bob
      tx = await transferFromTxn(alicePrivateKey, bob, UInt64.from(10));
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      aliceBalance = (await privateTokenQuery.ledger.get(
        alice
      )) as EncryptedBalance;
      let bobClaimBalance = await privateTokenQuery.claims.get(
        ClaimKey.from(bob, UInt64.from(0))
      );
      expect(aliceBalance.decrypt(alicePrivateKey).toBigInt()).toBe(90n);
      expect(bobClaimBalance?.decrypt(bobPrivateKey).toBigInt()).toBe(10n);

      // bod adds his claim to ledger
      tx = await addClaimTxn(bobPrivateKey, 0);
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      let bobBalance = (await privateTokenQuery.ledger.get(
        bob
      )) as EncryptedBalance;
      expect(bobBalance.decrypt(bobPrivateKey).toBigInt()).toBe(10n);
      bobClaimBalance = await privateTokenQuery.claims.get(
        ClaimKey.from(bob, UInt64.from(0))
      );
      expect(bobClaimBalance?.cipherText1[0].toBigInt()).toBe(0n);

      // alice deposits another 50
      const r1 = Field.random();
      const depositHashProof2 = new DepositHashProof({
        proof: dummy,
        publicInput: UInt64.from(50),
        publicOutput: generateDepositHash(UInt64.from(50), r1),
        maxProofsVerified: 2,
      });
      appChain.setSigner(alicePrivateKey);

      tx = await appChain.transaction(alice, () => {
        privateToken.deposit(depositHashProof2);
      });
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);
      expect((await privateTokenQuery.depositNounce.get())?.toBigInt()).toBe(
        2n
      );
      // Alice adds deposited amount to ledger balance
      tx = await addDepositTxn(
        alicePrivateKey,
        UInt64.from(50),
        r1,
        dummyWitness
      );
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      expect(
        (
          await balanceQuery.balances.get(privateToken.DEPOSIT_ADDRESS)
        )?.toBigInt()
      ).toBe(150n);

      aliceBalance = (await privateTokenQuery.ledger.get(
        alice
      )) as EncryptedBalance;
      expect(aliceBalance.decrypt(alicePrivateKey).toBigInt()).toBe(140n);

      // Alice withdraws 100
      appChain.setSigner(alicePrivateKey);
      tx = await withdrawTxn(alicePrivateKey, UInt64.from(100));
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);
      // alice's balance should decrease by 100
      aliceBalance = (await privateTokenQuery.ledger.get(
        alice
      )) as EncryptedBalance;
      expect(aliceBalance.decrypt(alicePrivateKey).toBigInt()).toBe(40n);
      // alice's token balance should increase by 100 (850 -> 950)
      expect((await balanceQuery.balances.get(alice))?.toBigInt()).toBe(950n);

      expect(
        (
          await balanceQuery.balances.get(privateToken.DEPOSIT_ADDRESS)
        )?.toBigInt()
      ).toBe(50n);
    },
    1000 * 60
  );

  /**
   * deposit 100 each from alice & bob address -> privateWallet
   */
  it("should demonstrate how deposit from multiple sources works to hide the balance", async () => {
    // alice deposits 100
    const r = Field.random(); // only alice knows
    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    const depositHashProof = new DepositHashProof({
      proof: dummy,
      publicInput: UInt64.from(100),
      publicOutput: generateDepositHash(UInt64.from(100), r),
      maxProofsVerified: 2,
    });
    appChain.setSigner(alicePrivateKey);
    let tx = await appChain.transaction(alice, () => {
      privateToken.deposit(depositHashProof);
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    expect((await balanceQuery.balances.get(alice))?.toBigInt()).toBe(900n);

    const privateWalletKey = PrivateKey.random();
    const privateWallet = privateWalletKey.toPublicKey();

    // addDeposit to privateWallet
    const dummyMerkelMap = new MerkleMap(); // TODO remove later when using appChain state
    const dummyWitness = dummyMerkelMap.getWitness(Field(0));
    tx = await addDepositTxn(
      privateWalletKey,
      UInt64.from(100),
      r,
      dummyWitness
    );
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    let privateWalletBalance = (await privateTokenQuery.ledger.get(
      privateWallet
    )) as EncryptedBalance;
    expect(privateWalletBalance.decrypt(privateWalletKey).toBigInt()).toBe(
      100n
    );

    // bob deposits 100 to privateWallet
    const r1 = Field.random();
    const depositHashProof1 = new DepositHashProof({
      proof: dummy,
      publicInput: UInt64.from(100),
      publicOutput: generateDepositHash(UInt64.from(100), r1),
      maxProofsVerified: 2,
    });
    appChain.setSigner(bobPrivateKey);
    tx = await appChain.transaction(bob, () => {
      privateToken.deposit(depositHashProof1);
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    // addDeposit to privateWallet
    tx = await addDepositTxn(
      privateWalletKey,
      UInt64.from(100),
      r1,
      dummyWitness
    );
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    privateWalletBalance = (await privateTokenQuery.ledger.get(
      privateWallet
    )) as EncryptedBalance;
    expect(privateWalletBalance.decrypt(privateWalletKey).toBigInt()).toBe(
      200n
    );
    // withdraw 50 from privateWallet
    tx = await withdrawTxn(privateWalletKey, UInt64.from(50));
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    privateWalletBalance = (await privateTokenQuery.ledger.get(
      privateWallet
    )) as EncryptedBalance;
    expect(privateWalletBalance.decrypt(privateWalletKey).toBigInt()).toBe(
      150n
    );
    // the 50 will return to privateWallet's normal balance
    expect((await balanceQuery.balances.get(privateWallet))?.toBigInt()).toBe(
      50n
    );
  });

  // Helpers
  async function transferFromTxn(
    fromPrivateKey: PrivateKey,
    to: PublicKey,
    amount: UInt64
  ): Promise<AppChainTransaction> {
    // set signer
    appChain.setSigner(fromPrivateKey);

    // get from's balance
    const currentBalance = (await privateTokenQuery.ledger.get(
      fromPrivateKey.toPublicKey()
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      throw Error("have no balance");
    }
    // create dummy proof
    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    const decryptedBalance = currentBalance.decrypt(fromPrivateKey);
    const resultingBalance = EncryptedBalance.from(
      decryptedBalance.sub(amount),
      fromPrivateKey.toPublicKey()
    );
    const transferProof = new TransferProof({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        to,
        currentBalance,
        resultingBalance,
        amount: EncryptedBalance.from(amount, to),
      },
      maxProofsVerified: 2,
    });
    // create transaction
    return appChain.transaction(fromPrivateKey.toPublicKey(), () => {
      privateToken.transfer(transferProof);
    });
  }

  async function addClaimTxn(
    ownerPrivateKey: PrivateKey,
    claimIndex: number
  ): Promise<AppChainTransaction> {
    // set signer
    appChain.setSigner(ownerPrivateKey);

    let currentBalance = (await privateTokenQuery.ledger.get(
      ownerPrivateKey.toPublicKey()
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      currentBalance = EncryptedBalance.from(
        UInt64.from(0),
        ownerPrivateKey.toPublicKey()
      );
    }

    const claimKey = ClaimKey.from(
      ownerPrivateKey.toPublicKey(),
      UInt64.from(claimIndex)
    );
    const claimBalance = (await privateTokenQuery.claims.get(
      claimKey
    )) as EncryptedBalance1;

    // create dummy proof
    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    const resultingBalance = EncryptedBalance.from(
      currentBalance
        .decrypt(ownerPrivateKey)
        .add(claimBalance.decrypt(ownerPrivateKey)),
      ownerPrivateKey.toPublicKey()
    );
    const encryptedSumProof = new EncryptedSum({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        encA: claimBalance.toEncryptedBalance(),
        encB: currentBalance,
        encC: resultingBalance,
        AisRevealed: Bool(false),
        A: UInt64.zero,
      },
      maxProofsVerified: 2,
    });
    // create transaction
    return appChain.transaction(ownerPrivateKey.toPublicKey(), () => {
      privateToken.addClaim(claimKey, encryptedSumProof);
    });
  }

  async function addDepositTxn(
    ownerPrivateKey: PrivateKey,
    amount: UInt64,
    r: Field,
    merkelWitness: MerkleMapWitness
  ): Promise<AppChainTransaction> {
    // set signer
    appChain.setSigner(ownerPrivateKey);

    const depositHash = Poseidon.hash([...amount.toFields(), r]);
    const nullifierHash = Poseidon.hash([r]);
    const [root, key] = merkelWitness.computeRootAndKey(depositHash);

    let currentBalance = (await privateTokenQuery.ledger.get(
      ownerPrivateKey.toPublicKey()
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      currentBalance = EncryptedBalance.from(
        UInt64.from(0),
        ownerPrivateKey.toPublicKey()
      );
    }
    const resultingBalance = EncryptedBalance.from(
      currentBalance.decrypt(ownerPrivateKey).add(amount),
      ownerPrivateKey.toPublicKey()
    );

    // create dummy proof
    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    const depositProof = new DepositProof({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        rootHash: root,
        nullifierHash: nullifierHash,
        to: ownerPrivateKey.toPublicKey(),
        currentBalance: currentBalance,
        resultingBalance: resultingBalance,
        amount: EncryptedBalance.from(amount, ownerPrivateKey.toPublicKey()),
      },
      maxProofsVerified: 2,
    });
    // create transaction
    return appChain.transaction(ownerPrivateKey.toPublicKey(), () => {
      privateToken.addDeposit(depositProof);
    });
  }

  async function withdrawTxn(
    ownerPrivateKey: PrivateKey,
    amount: UInt64
  ): Promise<AppChainTransaction> {
    let currentBalance = (await privateTokenQuery.ledger.get(
      ownerPrivateKey.toPublicKey()
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      throw Error("have no balance");
    }
    const resultingBalance = EncryptedBalance.from(
      currentBalance.decrypt(ownerPrivateKey).sub(amount),
      ownerPrivateKey.toPublicKey()
    );
    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    const encryptedSumProof = new EncryptedSum({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        encA: EncryptedBalance.from(amount, ownerPrivateKey.toPublicKey()),
        encB: resultingBalance,
        encC: currentBalance,
        AisRevealed: Bool(true),
        A: amount,
      },
      maxProofsVerified: 2,
    });
    appChain.setSigner(ownerPrivateKey);
    return appChain.transaction(ownerPrivateKey.toPublicKey(), () => {
      privateToken.withdraw(encryptedSumProof);
    });
  }
});
