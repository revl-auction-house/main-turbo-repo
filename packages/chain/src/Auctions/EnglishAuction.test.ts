import "reflect-metadata";
import { TestingAppChain } from "@proto-kit/sdk";
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
import {
  Poseidon,
  PrivateKey,
  UInt32,
  Encoding,
  UInt64,
  PublicKey,
} from "o1js";
import { NFTKey, NFT } from "../NFT";
import { EnglishAuction, EnglishAuctionModule } from "./EnglishAuction";
import { log } from "@proto-kit/common";
import { Balances } from "../Balances";
import { GlobalCounter } from "../GlobalCounter";

log.setLevel("ERROR");

describe("EnglishAuction", () => {
  let appChain: TestingAppChain<
    {
      EnglishAuctionModule: typeof EnglishAuctionModule;
      NFT: typeof NFT;
      GlobalCounter: typeof GlobalCounter;
      Balances: typeof Balances;
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
  let auction: EnglishAuctionModule;
  let auctionQuery: ModuleQuery<EnglishAuction>;

  beforeAll(async () => {
    //@ts-ignore
    appChain = TestingAppChain.fromRuntime({
      modules: {
        EnglishAuctionModule,
        NFT,
        GlobalCounter,
        Balances,
      },
    });
    appChain.configurePartial({
      Runtime: {
        EnglishAuctionModule: {},
        NFT: {},
        GlobalCounter: {},
        Balances: {},
      },
    });
    await appChain.start();
    // TODO remove later

    alicePrivateKey = PrivateKey.random();
    alice = alicePrivateKey.toPublicKey();
    bobPrivateKey = PrivateKey.random();
    bob = bobPrivateKey.toPublicKey();

    balances = appChain.runtime.resolve("Balances");
    balanceQuery = appChain.query.runtime.Balances;
    nfts = appChain.runtime.resolve("NFT");
    nftQuery = appChain.query.runtime.NFT;
    auction = appChain.runtime.resolve("EnglishAuctionModule");
    auctionQuery = appChain.query.runtime.EnglishAuctionModule;

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

  it("should able to auction", async () => {
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
    let nft0 = await appChain.query.runtime.NFT.nftRecords.get(nft0Key);
    expect(nft0?.owner).toStrictEqual(minter); // minter is still owner
    expect(nft0?.locked.toBoolean()).toStrictEqual(false); // nft should not be locked

    // minter lists for auction
    let auctionId: UInt64;
    tx = await appChain.transaction(minter, () => {
      auctionId = auction.start(nft0Key, UInt64.from(1)); // bidding active for next 1 block
    });
    await tx.sign();
    await tx.send();
    block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(true);

    nft0 = await appChain.query.runtime.NFT.nftRecords.get(nft0Key);
    expect(nft0?.owner).toStrictEqual(minter); // minter should still be owner
    expect(nft0?.locked.toBoolean()).toStrictEqual(true); // nft should be locked now

    // alice bids after 1 blocks
    appChain.setSigner(alicePrivateKey);

    tx = await appChain.transaction(alice, () => {
      auction.placeBid(auctionId, UInt64.from(500));
    });
    await tx.sign();
    await tx.send();
    block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(true);

    let aliceBalance = await balanceQuery.balances.get(alice);
    expect(aliceBalance?.toBigInt()).toBe(500n);
    let minterBalance = await balanceQuery.balances.get(minter);
    expect(minterBalance?.toBigInt()).toBe(0n);

    // minter accepts bid
    appChain.setSigner(minterPrivateKey);

    tx = await appChain.transaction(minter, () => {
      auction.end(auctionId);
    });
    await tx.sign();
    await tx.send();
    block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(true);

    minterBalance = await balanceQuery.balances.get(minter);
    expect(minterBalance?.toBigInt()).toBe(500n);

    nft0 = await appChain.query.runtime.NFT.nftRecords.get(nft0Key);
    expect(nft0?.owner).toStrictEqual(alice); // alice is the new owner
    expect(nft0?.locked.toBoolean()).toStrictEqual(false); // nft should be unlocked
  });

  it("should fail if not owner", async () => {
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
    let nft0 = await appChain.query.runtime.NFT.nftRecords.get(nft0Key);

    // alice tries to list it for auction
    appChain.setSigner(alicePrivateKey);

    tx = await appChain.transaction(alice, () => {
      auction.start(nft0Key, UInt64.from(4));
    });
    await tx.sign();
    await tx.send();
    block = await appChain.produceBlock();
    expect(
      block?.transactions[0].status.toBoolean(),
      block?.transactions[0].statusMessage
    ).toBe(false);
    expect(block?.transactions[0].statusMessage).toBe("Not owner of NFT");
  });
});
