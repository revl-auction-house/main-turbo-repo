import {
  Nft,
  Collection,
  Auction,
  Bid,
  EnglishAuction,
  DutchAuction,
} from "../resolvers/resolvers-types";

export interface DataSource {
  //NFTs
  getNFT: (collectionAddress: string, index: number) => Promise<Nft>;
  getNFTs: (skip: number, count: number) => Promise<Nft[]>;
  getNFTsByOwner: (
    skip: number,
    count: number,
    address: string
  ) => Promise<Nft[]>;
  getNFTsByCollection: (
    skip: number,
    count: number,
    address: string
  ) => Promise<Nft[]>;

  getCollection: (address: string) => Promise<Collection>;
  getCollections: (skip?: number, count?: number) => Promise<Collection[]>;

  getAuctions: (
    creator: string | undefined,
    live: boolean | undefined,
    skip: number,
    count: number
  ) => Promise<
    (
      | undefined
      | (Omit<Auction, "type"> & {
          type: Omit<EnglishAuction, "bids"> | DutchAuction;
        })
    )[]
  >;
  getAuction: (id: string) => Promise<
    | undefined
    | (Omit<Auction, "type"> & {
        type: Omit<EnglishAuction, "bids"> | DutchAuction;
      })
  >;

  getBidsByAuctionId: (id: string) => Promise<Omit<Bid, "auction">[]>;
  getBidsByBidder: (address: string) => Promise<Omit<Bid, "auction">[]>;
}
