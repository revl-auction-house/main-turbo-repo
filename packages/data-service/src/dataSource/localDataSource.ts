import * as fs from "fs";
import * as util from "util";
import { DataSource } from "./dataSource";
import { NftPart, CollectionPart, AuctionPart, BidPart } from "./types";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class LocalDataSource implements DataSource {
  private readonly filename: string;
  private dirty = false;
  private writeCounter: number = 0;
  private loaded = false;
  private data: {
    kv: {
      [key: string]: {};
    };
    nfts: {
      [key: string]: {
        [key: number]: NftPart;
      };
    };
    collections: {
      [key: string]: CollectionPart;
    };
    auctions: {
      [key: string]: AuctionPart;
    };
    bids: BidPart[];
  } = {
    kv: {},
    nfts: {},
    collections: {},
    auctions: {},
    bids: [],
  };

  constructor(filename = ".local_DB") {
    this.filename = filename;
  }
  public async getCollection(address: string) {
    await this.readFile();
    if (!(address in this.data.collections)) return null;

    return this.data.collections[address];
  }
  public async getCollections(skip = 0, count = 10) {
    await this.readFile();
    return Object.values(this.data.collections).slice(skip, skip + count);
  }

  public async getBidsByAuctionId(id: string, skip = 0, count = 10) {
    await this.readFile();
    return this.data.bids
      .filter((bid) => bid.auctionId === id)
      .slice(skip, skip + count);
  }
  public async getBidsByBidder(address: string, skip = 0, count = 10) {
    await this.readFile();
    return this.data.bids
      .filter((bid) => bid.bidder === address)
      .slice(skip, skip + count);
  }
  public async getTopBids(skip = 0, count = 10) {
    await this.readFile();
    const sortedBids = this.data.bids.sort(
      (a, b) => Number(b.amount) - Number(a.amount)
    );
    return sortedBids.slice(skip, skip + count).map((bid) => {
      return { ...bid, timestamp: bid.timestamp.toString() };
    });
  }

  public async getAuction(id: string) {
    await this.readFile();
    // console.log("local DB | getAuction: ", id);
    if (!(id in this.data.auctions)) return null;

    return this.data.auctions[id];
  }

  public async getAuctions(
    creator: string | undefined,
    live: boolean | undefined,
    skip = 0,
    count = 10
  ) {
    await this.readFile();
    let auctions = Object.values(this.data.auctions);
    if (creator) {
      auctions = auctions.filter((auction) => auction?.creator === creator);
    }
    if (live) {
      auctions = auctions.filter((auction) => auction?.ended === false);
    }
    // console.log("local DB | getAuctions: ", auctions.length);
    return auctions.slice(skip, skip + count);
  }

  public async getNFT(collectionAddress: string, index: number) {
    await this.readFile();
    if (!(collectionAddress in this.data.nfts)) return null;
    if (!(index in this.data.nfts[collectionAddress])) return null;
    return this.data.nfts[collectionAddress][index];
  }
  public async getNFTs(skip = 0, count = 10) {
    await this.readFile();
    let nfts: NftPart[] = [];
    for (const collectionAddr in this.data.collections) {
      const collectionNfts = Object.values(this.data.nfts[collectionAddr]);
      nfts = nfts.concat(collectionNfts);
    }
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }
  public async getNFTsByOwner(skip = 0, count = 10, address: string) {
    await this.readFile();
    let nfts: NftPart[] = [];
    for (const collectionAddr in this.data.collections) {
      const collectionNfts = Object.values(
        this.data.nfts[collectionAddr]
      ).filter((nft) => nft.owner === address);
      nfts = nfts.concat(collectionNfts);
    }
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }
  public async getNFTsByCollection(skip = 0, count = 10, address: string) {
    await this.readFile();
    const nfts = Object.values(this.data.nfts[address]) || [];
    return nfts.slice(skip, skip + count); // Corrected to return the correct count
  }

  public async getNftCount(collectionAddress: string): Promise<number> {
    await this.readFile();
    if (!(collectionAddress in this.data.collections)) return 0;
    return Object.keys(this.data.nfts[collectionAddress]).length;
  }

  public async getAuctionCount(): Promise<number> {
    await this.readFile();
    return Object.keys(this.data.auctions).length;
  }

  async createNFT(
    collectionAddress: string,
    idx: number,
    data: NftPart
  ): Promise<void> {
    await this.readFile();
    if (!this.data.collections[collectionAddress]) {
      Promise.reject("Collection not found");
    }
    if (!this.data.nfts[collectionAddress]) {
      this.data.nfts[collectionAddress] = {};
    }
    this.data.nfts[collectionAddress][idx] = data;
    this.dirty = true;
    await this.writeData();
  }

  async updateNFT(
    collectionAddress: string,
    idx: number,
    data: Partial<NftPart>
  ): Promise<void> {
    await this.readFile();
    if (!this.data.collections[collectionAddress]) {
      Promise.reject("Collection not found");
    }
    if (!this.data.nfts[collectionAddress]) {
      Promise.reject("NFT not found");
    }
    this.data.nfts[collectionAddress][idx] = {
      ...this.data.nfts[collectionAddress][idx],
      ...data,
    };
    this.dirty = true;
    await this.writeData();
  }

  async createCollection(address: string, data: CollectionPart): Promise<void> {
    await this.readFile();
    if (address in this.data.collections) return;
    this.data.collections[address] = data;
    this.dirty = true;
    await this.writeData();
  }

  async updateCollection(
    address: string,
    data: Partial<CollectionPart>
  ): Promise<void> {
    await this.readFile();
    if (!this.data.collections[address]) {
      Promise.reject("Collection not found");
    }
    this.data.collections[address] = {
      ...this.data.collections[address],
      ...data,
    };
    this.dirty = true;
    await this.writeData();
  }

  async createAuction(id: string, data: AuctionPart): Promise<void> {
    await this.readFile();
    this.data.auctions[id] = data;
    this.dirty = true;
    await this.writeData();
  }

  async updateAuction(id: string, data: Partial<AuctionPart>): Promise<void> {
    await this.readFile();
    if (!this.data.auctions[id]) {
      Promise.reject("Auction not found");
    }
    this.data.auctions[id] = {
      ...this.data.auctions[id],
      ...data,
    };
    this.dirty = true;
    await this.writeData();
  }

  async createBid(
    auctionId: string,
    bidder: string,
    amount: string
  ): Promise<void> {
    await this.readFile();
    this.data.bids.push({
      auctionId,
      bidder,
      amount,
      timestamp: Date.now().toString(),
    });
    this.dirty = true;
    await this.writeData();
  }

  async setValue(key: string, value: any) {
    this.dirty = true;
    this.data.kv[key] = value;
    this.writeData();
  }

  async getValue(key: string): Promise<any> {
    await this.readFile();
    return this.data.kv[key];
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
