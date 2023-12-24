/**
 * This file is used to test the chain end to end
 * start the chain, run this script to sends transactions
 * to the chain. Run the indexerJob to test out the indexer
 * and ingest data into mongoDB or local storage
 */
import { localHostClient as client } from "chain";
import { PrivateKey, UInt64, UInt32, Poseidon, Encoding } from "O1js";
import { LocalDataSource, MongoDB } from "./dataSource";
import { NFTKey } from "chain/dist/NFT";

// const dataSource = new LocalDataSource();
const dataSource = new MongoDB();

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

// let h = await bs.getCurrentBlockHeight(0);
// console.log("h", h);
// let block = await bs.getBlockAt(0);
// console.log("block", block);

const balances = client.runtime.resolve("Balances");
const nfts = client.runtime.resolve("NFT");
const engAuction = client.runtime.resolve("EnglishAuctionModule");

// mint some tokens
inMemorySigner.config.signer = user1PvtKey;
let tx = await client.transaction(user1, () => {
  balances.addBalance(user1, UInt64.from(1000));
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
// console.log("minting NFT with hash: ", nftDataHash.toString());
inMemorySigner.config.signer = user0PvtKey;
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
    UInt64.from(1000)
  );
});
await tx.sign();
await tx.send();

// wait for next block
await new Promise((r) => setTimeout(r, 9999));

// User1 places a EngBid
console.log("placing bid for NFT0");
inMemorySigner.config.signer = user1PvtKey;
tx = await client.transaction(user1, () => {
  engAuction.placeBid(auctionIdNFT0, UInt64.from(100));
});
await tx.sign();
await tx.send();

await new Promise((r) => setTimeout(r, 9999));
// let balance = await client.query.runtime.Balances.balances.get(user0);
// console.log("Bal: ", balance?.toBigInt());

// user1 mints a nft collection
const nftJsons = [
  {
    description: "Just Chill",
    image:
      "https://i.seadn.io/gae/bsILA43I-z1ZdcHFAdLE-IOOUfk8ma8e_F4GTyxgT_HpXNYOV3OP7pqhberrvjuXYv1BXWU-7A-U-wKT2tpukngnMQEggxcSZRn2-w?auto=format&dpr=1&w=327",
    name: "Blacky",
    collectionName: "Chill Bears",
  },
  {
    description: "Just Chill",
    image:
      "https://i.seadn.io/gae/Q9yJQuu-fvU5o2APNOvT-jgjdbE2s2uz3ekWM--Rq4AAJI3a9Mj9XgvGJs_aVkiQM9_7g_O1fFBDuue_F_axthobeE5M2Qpt7v6v?auto=format&dpr=1&w=327",
    name: "Mad Astro",
    collectionName: "Chill Bears",
  },
  {
    description: "Just Chill",
    image:
      "https://i.seadn.io/gae/oH7EIXQEf6pd5X02Hsdmr9bGL4JJeb6FuBrFDq30j1JVXNv6v6Ykdp9VMQfadoo5WZb3XUQ12-doLlBdlNlWBI_9wUvID-AEQVeQ?auto=format&dpr=1&w=327",
    name: "Milky",
    collectionName: "Chill Bears",
  },
  {
    description: "Just Chill",
    image:
      "https://i.seadn.io/gae/X612Bf0yzcWM-LeGali3ucSk42-FW-ItsAaAe4XWFPcyVHyPlHQLlrZuxqLADDLGb2z-SA-h1UZs3kBDXK8bEaHfukMVaW0772Yi-w?auto=format&dpr=1&w=327",
    name: "Brownie",
    collectionName: "Chill Bears",
  },
];
for (const nftjson of nftJsons) {
  const nftDataHash = Poseidon.hash(
    Encoding.stringToFields(JSON.stringify(nftjson))
  );
  // add it to ipfs / server
  dataSource.setValue(nftDataHash.toString(), nftjson);
  inMemorySigner.config.signer = user1PvtKey;
  tx = await client.transaction(user1, () => {
    nfts.mint(user1, nftDataHash);
  });
  await tx.sign();
  await tx.send();

  await new Promise((r) => setTimeout(r, 9999));
}

process.exit();
