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
  getNFT: (collectionAddress: string, index: number) => Promise<Nft | null>;
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

  getCollection: (address: string) => Promise<Collection | null>;
  getCollections: (
    skip?: number,
    count?: number
  ) => Promise<Omit<Collection, "nfts">[]>;

  getAuctions: (
    creator: string | undefined,
    live: boolean | undefined,
    skip: number,
    count: number
  ) => Promise<
    (
      | null
      | (Omit<Auction, "type"> & {
          type: Omit<EnglishAuction, "bids"> | DutchAuction;
        })
    )[]
  >;
  getAuction: (id: string) => Promise<
    | null
    | (Omit<Auction, "type"> & {
        type: Omit<EnglishAuction, "bids"> | DutchAuction;
      })
  >;

  getBidsByAuctionId: (
    id: string,
    skip?: number,
    count?: number
  ) => Promise<Omit<Bid, "auction">[]>;
  getBidsByBidder: (
    address: string,
    skip?: number,
    count?: number
  ) => Promise<Omit<Bid, "auction">[]>;
  getTopBids: (
    skip?: number,
    count?: number
  ) => Promise<Omit<Bid, "auction">[]>;
}
