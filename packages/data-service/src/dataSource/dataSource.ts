export interface DataSource {
  //NFTs
  getNFT: (collectionAddress: String, index: number) => Promise<any>;
  getNFTs: (skip: number, count: number) => Promise<any>;
  getNFTsByOwner: (
    skip: number,
    count: number,
    address: String
  ) => Promise<any>;
  getNFTsByCollection: (
    skip: number,
    count: number,
    address: String
  ) => Promise<any>;
}
