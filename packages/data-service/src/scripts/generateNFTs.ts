import { localHostClient as client } from "chain";
import { PrivateKey, Poseidon, Encoding } from "O1js";
import { DataSource, LocalDataSource, MongoDB } from "../dataSource";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
console.log(`Using ${process.env.DATA_STORAGE} for data storage`);
const dataSource: DataSource =
  process.env.DATA_STORAGE === "mongo"
    ? await new MongoDB().connect(true)
    : new LocalDataSource();
await client.start();

const inMemorySigner = client.resolve("Signer") as any;
const nfts = client.runtime.resolve("NFT");

const ipfsGateway = "https://ipfs.io/ipfs/";
const minters = [
  "EKE7fwHHvtb6iDwcf5GtUiSqvGdzNuHjk84gpbtDdvNkZHChn2xf",
  "EKE9XSSgZwPpnw1UHT5i75xLBe42fdHHVHjJ6xQoDM3Tw9tDTTp4",
  "EKF6WK1DxeAmqEha6ien8P4Mw4eq86AhwuoTnr6HMnhNZ17F7cgY",
];

const collectionSRCs = [
  {
    name: "Pudgy Penguins",
    index: [1, 6],
    baseUrl: `https://ipfs.io/ipfs/bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna/{id}`,
    minterPvKey: minters[0],
  },
  {
    name: "OrBs",
    index: [1, 6],
    baseUrl: `https://ipfs.io/ipfs/QmPNnrntpxCvhjgANPU2RVqTHWbGCAzuy4AozmUXCop41X/{id}`,
    minterPvKey: minters[1],
  },
  {
    name: "Sofa",
    index: [1, 6],
    baseUrl: `https://meta.sofanft.io/api/v1/metadata/sofa/{id}`,
    minterPvKey: minters[2],
  },
];

for (const collection of collectionSRCs) {
  let id = collection.index[0];
  while (id <= collection.index[1]) {
    let nftJson = await getJson(
      collection.baseUrl.replace("{id}", id.toString())
    );
    // if there are ipfs urls change, it to a one using a gateway
    if (nftJson.image.includes("ipfs://")) {
      nftJson.image = nftJson.image.replace("ipfs://", ipfsGateway);
    }
    // add collection name
    nftJson.collectionName = collection.name;

    const nftDataHash = Poseidon.hash(
      Encoding.stringToFields(JSON.stringify(nftJson))
    );
    // step 1: upload metadata to ipfs/DB
    dataSource.setValue(nftDataHash.toString(), nftJson);
    // mint onchain
    const minterKey = PrivateKey.fromBase58(collection.minterPvKey);
    inMemorySigner.config.signer = minterKey;
    let minterNonce = 0;
    let tx = await client.transaction(
      minterKey.toPublicKey(),
      () => {
        nfts.mint(
          // randomly choose an receiver address
          PrivateKey.fromBase58(
            minters[Math.floor(Math.random() * minters.length)]
          ).toPublicKey(),
          nftDataHash
        );
      },
      { nonce: minterNonce++ }
    );
    // console.log("txn hash: ", tx.transaction?.hash().toString());
    await tx.sign();
    await tx.send();
    // wait for next block
    await new Promise((r) => setTimeout(r, 9000));
    console.log("minted NFT: ", collection.name, id);
    id++;
  }
}

process.exit();

async function getJson(url: string) {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data. For ${url}, Status: ${response.status}`
      );
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
