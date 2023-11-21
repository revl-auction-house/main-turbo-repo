import * as fs from "fs";
import * as util from "util";
import { DataSource } from "./dataSource";
import { Nft, Collection } from "../resolvers/resolvers-types";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class LocalDataSource implements DataSource {
  private readonly filename: string;
  private dirty = false;
  private loaded = false;
  private data: {
    collections: {
      [key: string]: {
        nfts: Nft[];
        address: string;
        name: string;
        description: string;
      };
    };
  } = {
    collections: {},
  };

  constructor(filename = ".local_DB") {
    this.filename = filename;
  }

  private async readFile() {
    if (this.loaded) return;
    try {
      const dataString = await readFile(this.filename, "utf-8");
      this.data = JSON.parse(dataString);
      this.loaded = true;
    } catch (error: any) {
      throw error;
    }
  }

  public async getNFT(collectionAddress: string, index: number): Promise<Nft> {
    await this.readFile();
    return new Promise((resolve, reject) => {
      const nft = this.data.collections[collectionAddress]?.nfts[index];
      if (nft) {
        resolve(nft);
      }
      reject("NFT not found");
    });
  }
  public async getNFTs(skip = 0, count = 100): Promise<Nft[]> {
    await this.readFile();
    const nfts: Nft[] = [];
    for (const collectionAddr in this.data.collections) {
      const collection = this.data.collections[collectionAddr];
      nfts.push(...collection.nfts);
    }
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }
  public async getNFTsByOwner(skip = 0, count = 100, address: string) {
    await this.readFile();
    const nfts: Nft[] = [];
    for (const collectionAddr in this.data.collections) {
      const collection = this.data.collections[collectionAddr];
      const ownerNFTs = collection.nfts.filter((nft) => nft.owner === address);
      nfts.push(...ownerNFTs);
    }
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }
  public async getNFTsByCollection(
    skip: number = 0,
    count: number = 100,
    address: string
  ): Promise<Nft[]> {
    await this.readFile();
    const nfts: Nft[] = this.data.collections[address]?.nfts || [];
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }

  async addNFT(
    name: string,
    owner: string,
    data = "",
    dataHash = "",
    imgUrl = "",
    collectionAddress: string
  ): Promise<void> {
    this.dirty = true;
    if (!this.data.collections[collectionAddress]) {
      throw new Error("Collection not found");
    }
    const idx = this.data.collections[collectionAddress]?.nfts.length;
    const nft: Nft = {
      collectionAddress,
      data,
      dataHash,
      idx: idx ? idx : 0,
      imgUrl,
      locked: false,
      name,
      owner,
    };
    this.data.collections[collectionAddress]?.nfts.push(nft);
    this.writeData();
  }

  async addCollection(
    name: string,
    address: string,
    description = ""
  ): Promise<void> {
    this.dirty = true;
    this.data.collections[address] = {
      address,
      name,
      description,
      nfts: [],
    };
    this.writeData();
  }

  private async writeData() {
    setTimeout(async () => {
      if (this.dirty) {
        const content = JSON.stringify(this.data);
        // console.log("Writing data to file");
        await writeFile(this.filename, content, { flag: "w" });
        this.dirty = false;
      }
    }, 0);
  }
}
