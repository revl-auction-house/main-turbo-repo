import { NftPart, CollectionPart, AuctionPart, BidPart } from "./types";

export interface DataSource {
  //NFTs
  getNFT(collectionAddress: string, index: number): Promise<NftPart | null>;
  getNFTs(skip: number, count: number): Promise<NftPart[]>;
  getNFTsByOwner(
    skip: number,
    count: number,
    address: string
  ): Promise<NftPart[]>;
  getNFTsByCollection(
    skip: number,
    count: number,
    address: string
  ): Promise<NftPart[]>;

  getCollection(address: string): Promise<CollectionPart | null>;
  getCollections(skip?: number, count?: number): Promise<CollectionPart[]>;

  getAuctions(
    creator: string | undefined,
    live: boolean | undefined,
    skip: number,
    count: number
  ): Promise<AuctionPart[]>;
  getAuction(id: string): Promise<null | AuctionPart>;

  getBidsByAuctionId(
    id: string,
    skip?: number,
    count?: number
  ): Promise<BidPart[]>;
  getBidsByBidder(
    address: string,
    skip?: number,
    count?: number
  ): Promise<BidPart[]>;
  getTopBids(skip?: number, count?: number): Promise<BidPart[]>;

  setValue(key: string, value: any): Promise<void>;
  getValue(key: string): Promise<any | null>;

  getNftCount(collectionAddress: string): Promise<number>;
  getAuctionCount(): Promise<number>;

  createNFT(
    collectionAddress: string,
    idx: number,
    data: NftPart
  ): Promise<void>;
  updateNFT(
    collectionAddress: string,
    idx: number,
    data: Partial<NftPart>
  ): Promise<void>;

  createCollection(address: string, data: CollectionPart): Promise<void>;
  incrementCollectionMetrics(
    address: string,
    data: Partial<CollectionPart>
  ): Promise<void>;

  createAuction(id: string, data: AuctionPart): Promise<void>;
  updateAuction(id: string, data: Partial<AuctionPart>): Promise<void>;

  createBid(auctionId: string, bidder: string, amount: string): Promise<void>;

  search(query: string): Promise<CollectionPart[]>;
}
