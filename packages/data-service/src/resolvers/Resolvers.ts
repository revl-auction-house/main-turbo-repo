import { DataSource } from "../dataSource";
import {
  QueryResolvers,
  Nft,
  Collection,
  EnglishAuction,
  AuctionType,
  AuctionTypeResolvers,
  EnglishAuctionResolvers,
} from "./resolvers-types";

const Query: QueryResolvers<{ dataSource: DataSource }> = {
  nfts: async (
    _,
    { owner, collection, skip, count },
    { dataSource }
  ): Promise<Nft[]> => {
    console.log("resolver | nftss");
    if (owner) {
      return dataSource.getNFTsByOwner(skip!, count!, owner);
    } else if (collection) {
      return dataSource.getNFTsByCollection(skip!, count!, collection);
    } else {
      return dataSource.getNFTs(skip!, count!);
    }
  },
  nft: async (parent, { collection, idx }, { dataSource }): Promise<Nft> => {
    console.log("resolver | nft: ", parent);
    return dataSource.getNFT(collection, idx);
  },
  collections: async (
    _,
    { skip = 0, count = 5 },
    { dataSource }
  ): Promise<Collection[]> => {
    console.log("collections: ", skip, count);
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
    console.log("query resolver | auctions: ", creator, live, skip, count);
    return dataSource.getAuctions(creator!, live!, skip!, count!);
  },
};

const EnglishAuction: EnglishAuctionResolvers<{ dataSource: DataSource }> = {
  // bids: async (parent, _, { dataSource }) => {
  //   return dataSource.getBidsByAuctionId(parent.id) as Promise<Bid[]>;
  // },
};

const AuctionType: AuctionTypeResolvers = {
  __resolveType: (data, obj, info) => {
    console.log("resolve AuctionType: ", data, obj, info);
    return obj.__typename;
  },
};

export { Query, EnglishAuction, AuctionType };
