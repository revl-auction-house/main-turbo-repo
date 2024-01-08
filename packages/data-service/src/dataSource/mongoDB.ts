import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { DataSource } from "./dataSource";
import { NftPart, CollectionPart, AuctionPart, BidPart } from "./types";

export class MongoDB implements DataSource {
  private client: mongoDB.MongoClient;
  private db: mongoDB.Db;

  constructor() {
    dotenv.config();
    this.client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    this.db = this.client.db(process.env.DB_NAME);
  }

  public async getNFT(collectionAddress: string, index: number) {
    const nftData: any = await this.db.collection("nfts").findOne({
      "_id.collectionAddress": collectionAddress,
      "_id.index": index,
    });
    if (nftData === null) return null;
    delete nftData._id;
    return { ...nftData, collectionAddress, idx: index } as NftPart;
  }
  public async getNFTs(skip = 0, count = 10) {
    const nftData = await this.db
      .collection("nfts")
      .find()
      .skip(skip)
      .limit(count)
      .toArray();
    return nftData.map((nftData) => {
      const { _id, ...nft } = nftData;
      return {
        ...nft,
        collectionAddress: (_id as any).collectionAddress,
        idx: (_id as any).index,
      } as NftPart;
    });
  }
  public async getNFTsByOwner(skip = 0, count = 10, address: string) {
    const nftData = await this.db
      .collection("nfts")
      .find({
        owner: address,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return nftData.map((nftData) => {
      const { _id, ...nft } = nftData;
      return {
        ...nft,
        collectionAddress: (_id as any).collectionAddress,
        idx: (_id as any).index,
      } as NftPart;
    });
  }
  public async getNFTsByCollection(skip = 0, count = 10, address: string) {
    const nftData = await this.db
      .collection("nfts")
      .find({
        "_id.collectionAddress": address,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return nftData.map((nftData) => {
      const { _id, ...nft } = nftData;
      return {
        ...nft,
        collectionAddress: (_id as any).collectionAddress,
        idx: (_id as any).index,
      } as NftPart;
    });
  }

  public async getCollection(address: string) {
    const collectionDetail = (await this.db
      .collection("collectionDetails")
      .findOne({ "_id.address": address }))!;
    if (collectionDetail === null) return null;

    const { _id, ...data } = collectionDetail!;
    return { ...data, address: (_id as any).address } as CollectionPart;
  }
  public async getCollections(skip = 0, count = 10) {
    const collectionData = await this.db
      .collection("collectionDetails")
      .find()
      .skip(skip)
      .limit(count)
      .toArray();
    return collectionData.map((collection) => {
      const { _id, ...data } = collection;
      return { ...data, address: (_id as any).address } as CollectionPart;
    });
  }

  public async getAuction(id: string) {
    const auctionData = await this.db
      .collection("auctions")
      .findOne({ "_id.auctionId": id });
    if (auctionData === null) return null;
    const { _id, ...auction } = auctionData;
    return { ...auction, id: (_id as any).auctionId } as AuctionPart;
  }
  public async getAuctions(
    creator: string | undefined,
    live: boolean | undefined,
    skip = 0,
    count = 10
  ) {
    let filter: any = {};
    if (creator) {
      filter.creator = creator;
    }
    if (live) {
      filter.ended = false;
    }
    const auctions = await this.db
      .collection("auctions")
      .find(filter)
      .skip(skip)
      .limit(count)
      .toArray();
    return auctions.map((auctionData) => {
      const { _id, ...auction } = auctionData;
      return { ...auction, id: (_id as any).auctionId } as AuctionPart;
    });
  }

  public async getBidsByAuctionId(id: string, skip = 0, count = 10) {
    let bids = await this.db
      .collection("bids")
      .find({
        auctionId: id,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return bids.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as BidPart;
    });
  }
  public async getBidsByBidder(address: string, skip = 0, count = 10) {
    let bids = await this.db
      .collection("bids")
      .find({
        bidder: address,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return bids.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as BidPart;
    });
  }
  public async getTopBids(skip = 0, count = 10) {
    let bids = await this.db
      .collection("bids")
      .find()
      .sort({ amount: -1 })
      .skip(skip)
      .limit(count)
      .toArray();
    return bids.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as BidPart;
    });
  }

  public async getNftCount(collectionAddress: string): Promise<number> {
    return this.db.collection("nfts").countDocuments({
      "_id.collectionAddress": collectionAddress,
    });
  }
  public async getAuctionCount(): Promise<number> {
    return this.db.collection("auctions").countDocuments();
  }

  public async setValue(key: string, value: any): Promise<void> {
    await this.db.collection<{ _id: string; value: any }>("kv").insertOne({
      _id: key,
      value,
    });
  }
  public async getValue(key: string): Promise<any> {
    const result = await this.db
      .collection<{ _id: string; value: any }>("kv")
      .findOne({ _id: key });
    if (result === null) return null;
    return { ...result.value };
  }

  public async createNFT(
    collectionAddress: string,
    idx: number,
    data: NftPart
  ): Promise<void> {
    await this.db
      .collection<{
        _id: { collectionAddress: string; index: number };
      }>("nfts")
      .insertOne({
        _id: {
          collectionAddress,
          index: idx,
        },
        ...data,
      });
  }

  public async updateNFT(
    collectionAddress: string,
    idx: number,
    data: Partial<NftPart>
  ): Promise<void> {
    await this.db
      .collection<{
        _id: { collectionAddress: string; index: number };
      }>("nfts")
      .updateOne(
        {
          _id: {
            collectionAddress,
            index: idx,
          },
        },
        {
          $set: data,
        }
      );
  }

  public async createCollection(
    address: string,
    data: CollectionPart
  ): Promise<void> {
    await this.db
      .collection<{ _id: { address: string } }>("collectionDetails")
      .insertOne({
        _id: { address },
        ...data,
      });
  }

  public async updateCollection(
    address: string,
    data: Partial<CollectionPart>
  ): Promise<void> {
    await this.db
      .collection("collectionDetails")
      .updateOne({ "_id.address": address }, { $set: data });
  }

  public async createAuction(id: string, data: AuctionPart): Promise<void> {
    await this.db
      .collection<{ _id: { auctionId: string } }>("auctions")
      .insertOne({
        _id: { auctionId: id },
        ...data,
      });
  }

  public async updateAuction(
    id: string,
    data: Partial<AuctionPart>
  ): Promise<void> {
    await this.db
      .collection("auctions")
      .updateOne({ "_id.auctionId": id }, { $set: data });
  }

  public async createBid(
    auctionId: string,
    bidder: string,
    amount: string
  ): Promise<void> {
    await this.db.collection("bids").insertOne({
      auctionId,
      bidder,
      amount,
      timestamp: Date.now(),
    });
  }

  public async connect(dropPrevious = false) {
    await this.client.connect();
    console.log(`Successfully connected to database: ${this.db.databaseName}`);
    if (dropPrevious) {
      await this.db.dropDatabase();
      console.log("Dropped previous database");
    }
    return this;
  }
}
