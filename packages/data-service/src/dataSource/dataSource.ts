import { Nft } from "../resolvers/resolvers-types";

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
}
