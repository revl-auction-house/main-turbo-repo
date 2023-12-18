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
