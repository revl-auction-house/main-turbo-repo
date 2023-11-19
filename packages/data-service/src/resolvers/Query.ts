import { DataSource } from "../dataSource";

const Query = {
  nfts: async (
    _parent: any,
    { owner, collection }: { owner?: string; collection?: string },
    { dataSource }: { dataSource: DataSource }
  ) => {
    if (owner) {
      return dataSource.getNFTsByOwner(0, 10, owner);
    } else if (collection) {
      return dataSource.getNFTsByCollection(0, 10, collection);
    } else {
      return dataSource.getNFTs(0, 10);
    }
  },
  nft: async (
    _parent: any,
    { collection, idx }: { collection: string; idx: number },
    { dataSource }: { dataSource: DataSource }
  ) => {
    return dataSource.getNFT(collection, idx);
  },
};

export default Query;
