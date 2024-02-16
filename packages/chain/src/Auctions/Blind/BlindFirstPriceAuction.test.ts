import "reflect-metadata";
import { AppChainTransaction, TestingAppChain } from "@proto-kit/sdk";
import {
  Poseidon,
  PrivateKey,
  UInt32,
  Encoding,
  UInt64,
  PublicKey,
  Field,
  MerkleMap,
} from "o1js";
import { NFTKey, NFT } from "../../NFT";
import { BlindFirstPriceAuctionModule } from "./BlindFirstPriceAuction";
import { log } from "@proto-kit/common";
import { Balances } from "../../Balances";
import { ClaimKey, PrivateToken } from "../../PrivateToken/PrivateToken";
import {
  DepositHashProof,
  DepositProof,
  EncryptedBalance,
  generateDepositHash,
} from "../../PrivateToken/Proofs";
import { Pickles } from "o1js/dist/node/snarky";
import { dummyBase64Proof } from "o1js/dist/node/lib/proof_system";
import { RevealBidProof, SealedBidProof, calcBidHash } from "./Proofs";
import {
  BlockProducerModule,
  InMemoryDatabase,
  LocalTaskQueue,
  LocalTaskWorkerModule,
  ManualBlockTrigger,
  ModuleQuery,
  NoopBaseLayer,
  PrivateMempool,
  UnprovenProducerModule,
} from "@proto-kit/sequencer";
import { GlobalCounter } from "../../GlobalCounter";

log.setLevel("ERROR");

describe("BlindFirstPriceAuction", () => {
  let appChain: TestingAppChain<
    {
      BlindFirstPriceAuctionModule: typeof BlindFirstPriceAuctionModule;
      NFT: typeof NFT;
      GlobalCounter: typeof GlobalCounter;
      Balances: typeof Balances;
      PrivateToken: typeof PrivateToken;
    },
    {}
  >;
  let alicePrivateKey: PrivateKey;
  let alice: PublicKey;
  let bobPrivateKey: PrivateKey;
  let bob: PublicKey;
  let balances: Balances;
  let balanceQuery: ModuleQuery<Balances>;
  let nfts: NFT;
  let nftQuery: ModuleQuery<NFT>;
  let blindAuctions: BlindFirstPriceAuctionModule;
  let auctionQuery: ModuleQuery<BlindFirstPriceAuctionModule>;
  let privateToken: PrivateToken;
  let privateTokenQuery: ModuleQuery<PrivateToken>;
  let dummy: any;

  beforeAll(async () => {
    //@ts-ignore
    appChain = TestingAppChain.fromRuntime({
      modules: {
        BlindFirstPriceAuctionModule,
        NFT,
        GlobalCounter,
        Balances,
        PrivateToken,
      },
    });
    appChain.configure({
      Runtime: {
        BlindFirstPriceAuctionModule: {},
        NFT: {},
        GlobalCounter: {},
        Balances: {},
        PrivateToken: {},
      },
    });

    await appChain.start();

    [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);

    alicePrivateKey = PrivateKey.random();
    alice = alicePrivateKey.toPublicKey();
    bobPrivateKey = PrivateKey.random();
    bob = bobPrivateKey.toPublicKey();

    balances = appChain.runtime.resolve("Balances");
    balanceQuery = appChain.query.runtime.Balances;
    nfts = appChain.runtime.resolve("NFT");
    nftQuery = appChain.query.runtime.NFT;
    blindAuctions = appChain.runtime.resolve("BlindFirstPriceAuctionModule");
    auctionQuery = appChain.query.runtime.BlindFirstPriceAuctionModule;
    privateToken = appChain.runtime.resolve("PrivateToken");
    privateTokenQuery = appChain.query.runtime.PrivateToken;

    // console.log("Alice: ", alice.toBase58());
    // console.log("Bob:   ", bob.toBase58());

    // Alice, Bob mints 1000 tokens
    appChain.setSigner(alicePrivateKey);
    let tx = await appChain.transaction(alice, () => {
      balances.addBalance(alice, UInt64.from(1000));
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    tx = await appChain.transaction(alice, () => {
      balances.addBalance(bob, UInt64.from(1000));
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    // Alice, Bob converts their token to privateToken
    for (const key of [alicePrivateKey, bobPrivateKey]) {
      await convertTokenToPrivate(key, UInt64.from(1000));
    }
  }, 1000 * 60);

  it(
    "should able to auction",
    async () => {
      // minter mints 1 nfts and sets up a auction
      const nftMetadata = Poseidon.hash(
        Encoding.stringToFields(
          JSON.stringify({
            name: "testNFT",
            uri: "...",
          })
        )
      );
      const minterPrivateKey = PrivateKey.random();
      const minter = minterPrivateKey.toPublicKey();
      appChain.setSigner(minterPrivateKey);
      let tx = await appChain.transaction(minter, () => {
        nfts.mint(minter, nftMetadata); // mints to himself
      });
      await tx.sign();
      await tx.send();
      let block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);
      const nft0Key = NFTKey.from(minter, UInt32.from(0));
      let auctionId: UInt64 = UInt64.from(1);
      // minter starts an Auction
      tx = await appChain.transaction(minter, () => {
        auctionId = blindAuctions.start(
          nft0Key,
          UInt64.from(2),
          UInt64.from(2)
        ); // bidding active for next 2 block
      });
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      let nft0 = await nftQuery.nftRecords.get(nft0Key);
      expect(nft0?.owner).toStrictEqual(minter); // minter should still be owner
      expect(nft0?.locked.toBoolean()).toStrictEqual(true); // nft should be locked now
      expect(auctionId.toBigInt()).toBe(0n);
      let auction = await auctionQuery.records.get(auctionId!);
      // console.log(auction);
      expect(auction?.ended.toBoolean()).toBeFalsy();
      let aliceEncBalance = await privateTokenQuery.ledger.get(alice);
      let bobEncBalance = await privateTokenQuery.ledger.get(bob);
      expect(aliceEncBalance?.decrypt(alicePrivateKey).toBigInt()).toBe(1000n);
      expect(bobEncBalance?.decrypt(bobPrivateKey).toBigInt()).toBe(1000n);

      // Bidding Phase
      const aliceSalt = Field.random();
      {
        // Alice places a sealed bid with 500
        appChain.setSigner(alicePrivateKey);
        const sealedBidProof = await createSealedBidProof(
          alicePrivateKey,
          auctionId,
          UInt64.from(500),
          aliceSalt
        );
        tx = await appChain.transaction(alice, async () => {
          blindAuctions.placeSealedBid(auctionId, sealedBidProof);
        });
        await tx.sign();
        await tx.send();
        block = await appChain.produceBlock();
        expect(
          block?.transactions[0].status.toBoolean(),
          block?.transactions[0].statusMessage
        ).toBe(true);
      }

      const bobSalt = Field.random();
      {
        // Bob places a sealed bid with 400
        appChain.setSigner(bobPrivateKey);
        const sealedBidProof = await createSealedBidProof(
          bobPrivateKey,
          auctionId,
          UInt64.from(400),
          bobSalt
        );
        tx = await appChain.transaction(bob, async () => {
          blindAuctions.placeSealedBid(auctionId, sealedBidProof);
        });
        await tx.sign();
        await tx.send();
        block = await appChain.produceBlock();
        expect(
          block?.transactions[0].status.toBoolean(),
          block?.transactions[0].statusMessage
        ).toBe(true);
      }

      aliceEncBalance = await privateTokenQuery.ledger.get(alice);
      expect(aliceEncBalance?.decrypt(alicePrivateKey).toBigInt()).toBe(500n); // Alice's Balance reduced by 500
      bobEncBalance = await privateTokenQuery.ledger.get(bob);
      expect(bobEncBalance?.decrypt(bobPrivateKey).toBigInt()).toBe(600n); // Bob's by 400

      // Reveal Phase
      {
        const revealProof = await createRevealBidProof(
          bob,
          auctionId,
          UInt64.from(400),
          bobSalt
        );
        appChain.setSigner(bobPrivateKey);
        tx = await appChain.transaction(bob, async () => {
          blindAuctions.revealBid(revealProof);
        });
        await tx.sign();
        await tx.send();
        block = await appChain.produceBlock();
        expect(
          block?.transactions[0].status.toBoolean(),
          block?.transactions[0].statusMessage
        ).toBe(true);
      }
      {
        const revealProof = await createRevealBidProof(
          alice,
          auctionId,
          UInt64.from(500),
          aliceSalt
        );
        appChain.setSigner(alicePrivateKey);
        tx = await appChain.transaction(alice, async () => {
          blindAuctions.revealBid(revealProof);
        });
        await tx.sign();
        await tx.send();
        block = await appChain.produceBlock();
        expect(
          block?.transactions[0].status.toBoolean(),
          block?.transactions[0].statusMessage
        ).toBe(true);
      }

      aliceEncBalance = await privateTokenQuery.ledger.get(alice);
      expect(aliceEncBalance?.decrypt(alicePrivateKey).toBigInt()).toBe(500n); // Alice's Balance should remain same as she won
      let bobTokenBalance = await balanceQuery.balances.get(bob);
      expect(bobTokenBalance?.toBigInt()).toBe(400n); // Bob should get 400 back but in normal token form

      // auction settlement, anyone can call
      appChain.setSigner(alicePrivateKey);
      tx = await appChain.transaction(alice, () => {
        blindAuctions.settle(auctionId);
      });
      await tx.sign();
      await tx.send();
      block = await appChain.produceBlock();
      expect(
        block?.transactions[0].status.toBoolean(),
        block?.transactions[0].statusMessage
      ).toBe(true);

      let minterBalance = await balanceQuery.balances.get(minter);
      expect(minterBalance?.toBigInt()).toBe(500n); // minter gets 500
      nft0 = await nftQuery.nftRecords.get(nft0Key);
      expect(nft0?.owner).toStrictEqual(alice); // alice is the new owner
      expect(nft0?.locked.toBoolean()).toStrictEqual(false); // nft should be unlocked
    },
    1000 * 60
  );

  // Helpers
  async function createSealedBidProof(
    bidderPvtKey: PrivateKey,
    auctionId: UInt64,
    amount: UInt64,
    salt: Field
  ): Promise<SealedBidProof> {
    // set signer
    appChain.setSigner(bidderPvtKey);

    // get bidder's balance
    const currentBalance = (await privateTokenQuery.ledger.get(
      bidderPvtKey.toPublicKey()
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      throw Error("have no balance");
    }
    // create dummy proof
    const decryptedBalance = currentBalance.decrypt(bidderPvtKey);
    const resultingBalance = EncryptedBalance.from(
      decryptedBalance.sub(amount),
      bidderPvtKey.toPublicKey()
    );
    return new SealedBidProof({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        owner: bidderPvtKey.toPublicKey(),
        to: blindAuctions.ADDRESS,
        currentBalance: currentBalance,
        resultingBalance: resultingBalance,
        bidHash: calcBidHash(
          auctionId,
          amount,
          bidderPvtKey.toPublicKey(),
          salt
        ),
      },
      maxProofsVerified: 2,
    });
  }

  async function createRevealBidProof(
    bidder: PublicKey,
    auctionId: UInt64,
    amount: UInt64,
    salt: Field
  ) {
    // create dummy proof
    return new RevealBidProof({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        auctionId,
        amount,
        bidder,
        bidHash: calcBidHash(auctionId, amount, bidder, salt),
      },
      maxProofsVerified: 2,
    });
  }

  async function convertTokenToPrivate(pvtKey: PrivateKey, amount: UInt64) {
    const r = Field.random();
    const publicKey = pvtKey.toPublicKey();

    // step 1: deposit Tokens and save depositHash
    const depositHashProof = new DepositHashProof({
      proof: dummy,
      publicInput: amount,
      publicOutput: generateDepositHash(amount, r),
      maxProofsVerified: 2,
    });
    appChain.setSigner(pvtKey);
    let tx = await appChain.transaction(publicKey, () => {
      privateToken.deposit(depositHashProof);
    });
    await tx.sign();
    await tx.send();
    let block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(true);
    const claimNonce =
      0 | Number((await privateTokenQuery.nonces.get(publicKey))?.toBigInt());

    // step 2: call addDeposit
    const dummyMerkelMap = new MerkleMap(); // TODO remove later when using appChain state
    const dummyWitness = dummyMerkelMap.getWitness(Field(0));
    const [root, key] = dummyWitness.computeRootAndKey(
      generateDepositHash(amount, r)
    );
    let currentBalance = (await privateTokenQuery.ledger.get(
      publicKey
    )) as EncryptedBalance;
    if (currentBalance == undefined) {
      currentBalance = EncryptedBalance.from(UInt64.from(0), publicKey);
    }

    const resultingBalance = EncryptedBalance.from(
      currentBalance.decrypt(pvtKey).add(amount),
      publicKey
    );

    const depositProof = new DepositProof({
      proof: dummy,
      publicInput: undefined,
      publicOutput: {
        rootHash: root,
        nullifierHash: Poseidon.hash([r]),
        to: publicKey,
        currentBalance: currentBalance,
        resultingBalance: resultingBalance,
        amount: EncryptedBalance.from(amount, publicKey),
      },
      maxProofsVerified: 2,
    });
    tx = await appChain.transaction(publicKey, () => {
      privateToken.addDeposit(depositProof);
    });
    await tx.sign();
    await tx.send();
    block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(true);
  }
});
