import { DataSource } from "../dataSource";
import {
  QueryResolvers,
  Nft,
  Collection,
  EnglishAuction,
  AuctionType,
  AuctionTypeResolvers,
  EnglishAuctionResolvers,
  Bid,
  BidResolvers,
} from "./resolvers-types";

const Query: QueryResolvers<{ dataSource: DataSource }> = {
  nfts: async (
    _,
    { owner, collection, skip, count },
    { dataSource }
  ): Promise<Nft[]> => {
    // console.log("resolver | nftss");
    if (owner) {
      return dataSource.getNFTsByOwner(skip!, count!, owner);
    } else if (collection) {
      return dataSource.getNFTsByCollection(skip!, count!, collection);
    } else {
      return dataSource.getNFTs(skip!, count!);
    }
  },
  nft: async (parent, { collection, idx }, { dataSource }): Promise<Nft> => {
    // console.log("resolver | nft: ", parent);
    return dataSource.getNFT(collection, idx);
  },
  collections: async (
    _,
    { skip = 0, count = 5 },
    { dataSource }
  ): Promise<Collection[]> => {
    // console.log("collections: ", skip, count);
    return dataSource.getCollections(skip!, count!);
  },
  collection: async (_, { address }, { dataSource }): Promise<Collection> => {
    return dataSource.getCollection(address);
  },
  auctions: async (
    _,
    { creator, live = true, skip = 0, count = 10 },
    { dataSource }
  ): Promise<any[]> => {
    // console.log("query resolver | auctions: ", creator, live, skip, count);
    return dataSource.getAuctions(creator!, live!, skip!, count!);
  },
  userBids: async (_, { address }, { dataSource }): Promise<any[]> => {
    // console.log("userBids | resolver");
    return dataSource.getBidsByBidder(address);
  },
};

const Bid: BidResolvers<{ dataSource: DataSource }> = {
  auction: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Bid | resolver", parent);
    if ("auctionId" in parent) {
      return await dataSource.getAuction(parent.auctionId);
    }
  },
};

const EnglishAuction: EnglishAuctionResolvers<{ dataSource: DataSource }> = {
  bids: async (parent, _, { dataSource }) => {
    return dataSource.getBidsByAuctionId(parent.id) as Promise<Bid[]>;
  },
};

const AuctionType: AuctionTypeResolvers = {
  __resolveType: (data, obj, info) => {
    // console.log("resolve AuctionType: ", data, data.__typename);
    if ("maxBidder" in data) {
      return "EnglishAuction";
    } else if ("decayRate" in data) {
      return "DutchAuction";
    }
    return null;
  },
};

export { Query, Bid, EnglishAuction, AuctionType };
