import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { DataSource } from "./dataSource";
import {
  Nft,
  Auction,
  DutchAuction,
  EnglishAuction,
  Bid,
  Collection,
} from "../resolvers/resolvers-types";
import { Cipher } from "crypto";

enum auctionTypes {
  English = "english",
  Dutch = "dutch",
  Blind = "blind",
}

export class MongoDB implements DataSource {
  private client: mongoDB.MongoClient;
  private db: mongoDB.Db;

  constructor() {
    dotenv.config();
    this.client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    this.db = this.client.db(process.env.DB_NAME);
    this.connectToDatabase();
  }

  public async getNFT(collectionAddress: string, index: number) {
    const nftData: any = await this.db.collection("nfts").findOne({
      "_id.collectionAddress": collectionAddress,
      "_id.index": index,
    });
    if (nftData) {
      delete nftData._id;
      return { ...nftData, collectionAddress, idx: index } as Nft;
    }
    return null;
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
      } as Nft;
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
      } as Nft;
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
      } as Nft;
    });
  }

  public async getCollection(address: string) {
    const collectionDetailData = (await this.db
      .collection("collectionDetails")
      .findOne({ "_id.address": address }))!;
    if (collectionDetailData === null) return null;

    const { _id, ...collectionDetail } = collectionDetailData!;
    const nfts = await this.db
      .collection("nfts")
      .find({
        "_id.collectionAddress": address,
      })
      .limit(24)
      .toArray();
    return {
      address,
      description: collectionDetail?.description,
      name: collectionDetail?.name,
      nfts: nfts.map((nftData) => {
        const { _id, ...nft } = nftData;
        return {
          ...nft,
          collectionAddress: address,
          idx: (_id as any).index,
        } as Nft;
      }),
    };
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
      return { ...data, address: (_id as any).address } as Omit<
        Collection,
        "nfts"
      >;
    });
  }

  private async getAuctionFromAuctionData(auctionData: any): Promise<
    | (Omit<Auction, "type"> & {
        type: Omit<EnglishAuction, "bids"> | DutchAuction;
      })
    | null
  > {
    if (auctionData === null) return null;

    const id = auctionData._id.auctionId;
    const nft = await this.getNFT(
      auctionData.collectionAddress,
      auctionData.nftIdx
    );
    if (auctionData.type === auctionTypes.English) {
      return {
        id,
        nft: nft!,
        creator: auctionData.creator,
        endTime: auctionData.endTime,
        ended: auctionData.ended,
        startTime: auctionData.startTime,
        winner: auctionData.winner,
        type: {
          id,
          maxBid: auctionData.maxBid,
          maxBidder: auctionData.maxBidder,
          bidCount: auctionData.bidCount,
        },
      };
    } else if (auctionData.type === auctionTypes.Dutch) {
      return {
        id,
        nft: nft!,
        creator: auctionData.creator,
        endTime: auctionData.endTime,
        ended: auctionData.ended,
        startTime: auctionData.startTime,
        winner: auctionData.winner,
        type: {
          id,
          decayRate: auctionData.decayRate,
          startPrice: auctionData.startPrice,
          minPrice: auctionData.minPrice,
        },
      };
    } else if (auctionData.type === auctionTypes.Blind) {
      return null;
    }
    return null;
  }
  public async getAuction(id: string): Promise<
    | null
    | (Omit<Auction, "type"> & {
        type: Omit<EnglishAuction, "bids"> | DutchAuction;
      })
  > {
    const auctionData = (await this.db
      .collection("auctions")
      .findOne({ "_id.auctionId": id }))!;
    return this.getAuctionFromAuctionData(auctionData);
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
    const auctionData = await this.db
      .collection("auctions")
      .find(filter)
      .skip(skip)
      .limit(count)
      .toArray();
    return Promise.all(
      auctionData.map((auctionData) => {
        return this.getAuctionFromAuctionData(auctionData);
      })
    );
  }

  public async getBidsByAuctionId(
    id: string,
    skip = 0,
    count = 10
  ): Promise<Omit<Bid, "auction">[]> {
    let bidData = await this.db
      .collection("bids")
      .find({
        auctionId: id,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return bidData.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as Omit<Bid, "auction">;
    });
  }
  public async getBidsByBidder(
    address: string,
    skip = 0,
    count = 10
  ): Promise<Omit<Bid, "auction">[]> {
    let bidData = await this.db
      .collection("bids")
      .find({
        bidder: address,
      })
      .skip(skip)
      .limit(count)
      .toArray();
    return bidData.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as Omit<Bid, "auction">;
    });
  }
  public async getTopBids(
    skip = 0,
    count = 10
  ): Promise<Omit<Bid, "auction">[]> {
    let bidData = await this.db
      .collection("bids")
      .find()
      .sort({ amount: -1 })
      .skip(skip)
      .limit(count)
      .toArray();
    return bidData.map((bidWithId) => {
      const { _id, ...bid } = bidWithId;
      return { ...bid } as Omit<Bid, "auction">;
    });
  }

  private async connectToDatabase() {
    await this.client.connect();
    console.log(`Successfully connected to database: ${this.db.databaseName}`);
  }
}
