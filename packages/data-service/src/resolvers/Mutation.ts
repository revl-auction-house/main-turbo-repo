// mutation.ts

import { DataSource } from "../dataSource/";

const Mutation = {
  createNFT: async (
    _parent: any,
    {
      collection,
      owner,
      dataHash,
      name,
      imgUrl,
    }: {
      collection: string;
      owner: string;
      dataHash: string;
      name: string;
      imgUrl?: string;
    },
    { dataSource }: { dataSource: DataSource }
  ) => {
    return dataSource.addNFT({ collection, owner, dataHash, name, imgUrl });
  },
};

export default Mutation;
