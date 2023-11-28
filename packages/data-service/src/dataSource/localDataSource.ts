import * as fs from "fs";
import * as util from "util";
import { DataSource } from "./dataSource";
import {
  Nft,
  Collection,
  Auction,
  EnglishAuction,
  DutchAuction,
} from "../resolvers/resolvers-types";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class LocalDataSource implements DataSource {
  private readonly filename: string;
  private dirty = false;
  private writeCounter: number = 0;
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
    auctions: {
      [key: string]: {
        creator: string;
        collectionAddress: string;
        nftIdx: number;
        winner: string;
        startTime: number;
        endTime: number | undefined;
        ended: boolean;
        type: "english" | "dutch" | "blind";
        // english
        bidCount?: number;
        maxBid?: number;
        maxBidder?: string;
        // dutch
        decayRate?: number;
        minPrice?: number;
        startPrice?: number;
      };
    };
    bids: {
      amount: number;
      auctionId: string;
      bidder: string;
      timestamp: number;
    }[];
  } = {
    collections: {},
    auctions: {},
    bids: [],
  };

  constructor(filename = ".local_DB") {
    this.filename = filename;
  }
  public async getCollection(address: string): Promise<Collection> {
    await this.readFile();
    const collection: Collection = { ...this.data.collections[address] };
    return collection;
  }
  public async getCollections(skip = 0, count = 10): Promise<Collection[]> {
    await this.readFile();
    return Object.values(this.data.collections).slice(skip, skip + count);
  }

  public async getBidsByAuctionId(id: string) {
    await this.readFile();
    return this.data.bids
      .filter((bid) => bid.auctionId === id)
      .map((bid) => {
        return { ...bid, timestamp: bid.timestamp.toString() };
      });
  }
  public async getBidsByBidder(address: string) {
    await this.readFile();
    return this.data.bids
      .filter((bid) => bid.bidder === address)
      .map((bid) => {
        return { ...bid, timestamp: bid.timestamp.toString() };
      });
  }

  public async getAuction(id: string): Promise<
    | undefined
    | (Omit<Auction, "type"> & {
        type: Omit<EnglishAuction, "bids"> | DutchAuction;
      })
  > {
    await this.readFile();
    // console.log("local DB | getAuction: ", id);
    const aucData = this.data.auctions[id];
    const nft =
      this.data.collections[aucData.collectionAddress]?.nfts[aucData.nftIdx];
    if (aucData.type == "english") {
      return {
        ...aucData,
        id: id,
        nft: nft,
        type: {
          id,
          maxBid: aucData.maxBid!,
          maxBidder: aucData.maxBidder!,
          bidCount: aucData.bidCount!,
        },
      };
    } else if (aucData.type == "dutch") {
      return {
        ...aucData,
        id: id,
        nft: nft,
        type: {
          id,
          startPrice: aucData.startPrice!,
          minPrice: aucData.minPrice!,
          decayRate: aucData.decayRate!,
        },
      };
    }
    return undefined;
  }

  public async getAuctions(
    creator: string | undefined,
    live: boolean | undefined,
    skip = 0,
    count = 10
  ) {
    await this.readFile();
    let auctions = await Promise.all(
      Object.keys(this.data.auctions).map((id) => this.getAuction(id))
    );
    if (creator) {
      auctions = auctions.filter((auction) => auction?.creator === creator);
    }
    if (live) {
      auctions = auctions.filter((auction) => auction?.ended === false);
    }
    // console.log("local DB | getAuctions: ", auctions.length);
    return auctions.slice(skip, skip + count);
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
  public async getNFTs(skip = 0, count = 10): Promise<Nft[]> {
    await this.readFile();
    const nfts: Nft[] = [];
    for (const collectionAddr in this.data.collections) {
      const collection = this.data.collections[collectionAddr];
      nfts.push(...collection.nfts);
    }
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }
  public async getNFTsByOwner(skip = 0, count = 10, address: string) {
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
    skip = 0,
    count = 10,
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
  async addEnglishAuc(
    id: string,
    creator: string,
    collectionAddress: string,
    nftIdx: number,
    duration: number // secs
  ) {
    // check if owner
    if (
      this.data.collections[collectionAddress]?.nfts[nftIdx]?.owner !== creator
    ) {
      return;
    }
    this.dirty = true;
    this.data.auctions[id] = {
      creator,
      collectionAddress,
      nftIdx,
      winner: "",
      startTime: Math.ceil(Date.now() / 1000),
      endTime: Math.ceil(Date.now() / 1000) + duration,
      ended: false,
      type: "english",
      bidCount: 0,
      maxBid: 0,
      maxBidder: "",
    };
    // lock nft
    this.data.collections[collectionAddress].nfts[nftIdx].locked = true;
    console.log("created Eng Auction ID:", id);
    this.writeData();
  }
  async addDutchAuc(
    id: string,
    creator: string,
    collectionAddress: string,
    nftIdx: number,
    startPrice: number,
    minPrice: number,
    decayRate: number
  ) {
    // check if owner
    if (
      this.data.collections[collectionAddress]?.nfts[nftIdx]?.owner != creator
    ) {
      return;
    }
    this.dirty = true;
    this.data.auctions[id] = {
      creator,
      collectionAddress,
      nftIdx,
      winner: "",
      startTime: Math.ceil(Date.now() / 1000),
      endTime: undefined,
      ended: false,
      type: "dutch",
      decayRate,
      minPrice,
      startPrice,
    };
    // lock nft
    this.data.collections[collectionAddress].nfts[nftIdx].locked = true;
    console.log("created Dutch Auction ID:", id);
    this.writeData();
  }
  async addBid(id: string, amount: number, bidder: string) {
    const auc = this.data.auctions[id];
    if (auc && amount > Number(auc.maxBid)) {
      this.dirty = true;
      this.data.auctions[id] = {
        ...auc,
        bidCount: auc.bidCount ? auc.bidCount + 1 : 1,
        maxBid: amount,
        maxBidder: bidder,
      };
      this.data.bids.push({
        amount,
        auctionId: id,
        bidder,
        timestamp: Date.now(),
      });
      console.log("placed bid for AuctionId: ", id, " amount:", amount);
      this.writeData();
    }
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
  private async writeData() {
    if (this.dirty) {
      const counter = ++this.writeCounter;
      setTimeout(async () => {
        await this.performWrite(counter);
      }, 0);
    }
  }
  private async performWrite(counter: number) {
    const content = JSON.stringify(this.data);
    if (counter === this.writeCounter) {
      // only latest
      await writeFile(this.filename, content, { flag: "w" });
      // console.log("Writing data to file");
    }
    this.dirty = false;
  }
}
