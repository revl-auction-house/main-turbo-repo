import { DataSource } from "../dataSource";
import { QueryResolvers, Nft } from "./resolvers-types";

const Query: QueryResolvers = {
  nfts: async (
    parent,
    { owner, collection, skip = 0, count = 10 },
    { dataSource }: { dataSource: DataSource }
  ): Promise<Nft[]> => {
    if (owner) {
      return dataSource.getNFTsByOwner(skip!, count!, owner);
    } else if (collection) {
      return dataSource.getNFTsByCollection(skip!, count!, collection);
    } else {
      return dataSource.getNFTs(skip!, count!);
    }
  },
  nft: async (
    parent,
    { collection, idx },
    { dataSource }: { dataSource: DataSource }
  ): Promise<Nft> => {
    return dataSource.getNFT(collection, idx);
  },
};

export default Query;
