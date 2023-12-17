import { localHostClient as client } from "chain";
import { PrivateKey, UInt64, UInt32, Poseidon, Encoding } from "O1js";
import { LocalDataSource } from "./dataSource";
import { NFTKey } from "chain/dist/NFT";

const dataSource = new LocalDataSource();
await client.start();
// const bs: any = client.resolve("BlockStorage");
// const bs: any = client.sequencer.dependencyContainer.resolve("BlockStorage");
const user0PvtKey = PrivateKey.fromBase58(
  "EKE7fwHHvtb6iDwcf5GtUiSqvGdzNuHjk84gpbtDdvNkZHChn2xf"
);
const user0 = user0PvtKey.toPublicKey();
// let user0Nonce = 0;
const user1PvtKey = PrivateKey.fromBase58(
  "EKDuCpShU5cH87r2YJZj854JH8aPHZ98X9ztRd1oyzb1PVhAyw1E"
);
const user1 = user1PvtKey.toPublicKey();
// (client as any).setSigner(user0PvtKey);
const inMemorySigner = client.resolve("Signer") as any;
inMemorySigner.config.signer = user0PvtKey;

// let h = await bs.getCurrentBlockHeight(0);
// console.log("h", h);
// let block = await bs.getBlockAt(0);
// console.log("block", block);

const balances = client.runtime.resolve("Balances");
const nfts = client.runtime.resolve("NFT");
const engAuction = client.runtime.resolve("EnglishAuctionModule");

// mint some tokens
let tx = await client.transaction(user0, () => {
  balances.addBalance(user0, UInt64.from(1000));
});
await tx.sign();
await tx.send();

// wait for next block
await new Promise((r) => setTimeout(r, 9999));

// user0 mints and nft
const nftjson = {
  attributes: [
    {
      trait_type: "Background",
      value: "Beige",
    },
    {
      trait_type: "Skin",
      value: "Light Gray",
    },
    {
      trait_type: "Body",
      value: "Tribal Necklace",
    },
    {
      trait_type: "Face",
      value: "Beard",
    },
    {
      trait_type: "Head",
      value: "Bowl Cut",
    },
  ],
  description:
    "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
  image: "ipfs://QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/1.png",
  name: "Pudgy Penguin #1",
};
const nftDataHash = Poseidon.hash(
  Encoding.stringToFields(JSON.stringify(nftjson))
);
// add it to ipfs / server
dataSource.setValue(nftDataHash.toString(), nftjson);
console.log("minting NFT with hash: ", nftDataHash.toString());
tx = await client.transaction(user0, () => {
  nfts.mint(user0, nftDataHash);
});
await tx.sign();
await tx.send();

// wait for next block
await new Promise((r) => setTimeout(r, 9999));

// user0 starts a engAuction
let auctionIdNFT0: UInt64;
console.log("starting auction for NFT0");
tx = await client.transaction(user0, () => {
  auctionIdNFT0 = engAuction.start(
    NFTKey.from(user0, UInt32.from(0)),
    UInt64.from(100)
  );
});
await tx.sign();
await tx.send();

// wait for next block
await new Promise((r) => setTimeout(r, 9999));

// User1 places a EngBid
console.log("placing bid for NFT0");
tx = await client.transaction(user0, () => {
  engAuction.placeBid(auctionIdNFT0, UInt64.from(100));
});
await tx.sign();
await tx.send();

// let balance = await client.query.runtime.Balances.balances.get(user0);
// console.log("Bal: ", balance?.toBigInt());

process.exit();
