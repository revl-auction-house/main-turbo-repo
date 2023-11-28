import axios from "axios";
import { PrivateKey, Poseidon, Encoding } from "O1js";
import { LocalDataSource } from "./dataSource";

const dataSource = new LocalDataSource();
const ipfsGateway = "https://ipfs.io/ipfs/";
const User0 = PrivateKey.fromBase58(
  "EKE7fwHHvtb6iDwcf5GtUiSqvGdzNuHjk84gpbtDdvNkZHChn2xf"
).toPublicKey();
const User1 = PrivateKey.fromBase58(
  "EKDuLY8k5BA8EXcwoeX5xzTEb3nN1b75qrjewFzwjYT6te82V8Cp"
).toPublicKey();

const collection0PvtKey =
  "EKDv2vk2YGkQ9fkrubkatktuFGJdK38zpio4fAE5TZ6i1gZFmDuh";
const collection0Adress = PrivateKey.fromBase58(collection0PvtKey)
  .toPublicKey()
  .toBase58();
const collection1PvtKey =
  "EKDuCpShU5cH87r2YJZj854JH8aPHZ98X9ztRd1oyzb1PVhAyw1E";

const collectionSRCs = [
  {
    name: "Pudgy Penguins",
    index: [1, 10],
    baseUrl: `https://ipfs.io/ipfs/bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna/{id}`,
    pvtKey: collection0PvtKey,
  },
  {
    name: "Waves",
    index: [1, 10],
    baseUrl: `https://ipfs.io/ipfs/QmRMHxaALk5UpYMuSTUjhH4zNKYZe2yCeH8LRpq9CBXgFW/{id}.json`,
    pvtKey: collection1PvtKey,
  },
];
for (const collection of collectionSRCs) {
  let id = collection.index[0];
  let desc = "bla bla";
  const collectionAddress = PrivateKey.fromBase58(collection.pvtKey)
    .toPublicKey()
    .toBase58();

  try {
    // try to get description
    let response = await getJson(
      collection.baseUrl.replace("{id}", id.toString())
    );
    desc = response.description ? response.description : desc;
  } catch (error) {}
  // 1. add collection
  await dataSource.addCollection(collection.name, collectionAddress, desc);

  // 2. add nfts
  while (id <= collection.index[1]) {
    let response = await getJson(
      collection.baseUrl.replace("{id}", id.toString())
    );
    const hash = Poseidon.hash(
      Encoding.stringToFields(JSON.stringify(response))
    ).toString();
    let imageUrl: string = response.image;
    imageUrl = imageUrl.startsWith("ipfs")
      ? imageUrl.replace("ipfs://", ipfsGateway)
      : imageUrl;
    try {
      await dataSource.addNFT(
        response.name,
        User0.toBase58(),
        response.attributes ? JSON.stringify(response.attributes) : "",
        hash,
        imageUrl,
        collectionAddress
      );
    } catch (error) {
      console.log(error);
    }
    id++;
  }
}

// add some auctions
await dataSource.addEnglishAuc(
  "0",
  User0.toBase58(),
  collection0Adress,
  0,
  10 * 24 * 60 * 60
);
await new Promise((r) => setTimeout(r, 100));
await dataSource.addEnglishAuc(
  "1",
  User0.toBase58(),
  collection0Adress,
  1,
  5 * 24 * 60 * 60
);
await dataSource.addDutchAuc(
  "2",
  User0.toBase58(),
  collection0Adress,
  2,
  1000,
  10,
  1
);

// Add some bids
await dataSource.addBid("0", 100, User1.toBase58());
await dataSource.addBid("0", 200, User0.toBase58());
await dataSource.addBid("0", 400, User1.toBase58());
// await dataSource.addBid("1", 200, User1.toBase58());
console.log("Dummy Data Created");

async function getJson(url: string) {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch data. For ${url}, Status: ${response.status}`
    );
  }
  return response.data;
}
