import { DataSource } from "../dataSource";
import {
  BlindSecondPriceAuctionPart,
  CollectionPart,
  NftPart,
  AuctionPart,
  auctionType,
} from "../dataSource/types";
import {
  QueryResolvers,
  AuctionTypeResolvers,
  EnglishAuctionResolvers,
  BidResolvers,
  BlindFirstPriceAuctionResolvers,
  BlindSecondPriceAuctionResolvers,
  NftResolvers,
  CollectionResolvers,
  AuctionResolvers,
} from "./resolvers-types";

export const Query: QueryResolvers<{ dataSource: DataSource }> = {
  nfts: async (
    _,
    { owner, collection, skip, count },
    { dataSource }
  ): Promise<any[]> => {
    // console.log("resolver | nftss");
    if (owner) {
      return dataSource.getNFTsByOwner(skip!, count!, owner);
    } else if (collection) {
      return dataSource.getNFTsByCollection(skip!, count!, collection);
    } else {
      return dataSource.getNFTs(skip!, count!);
    }
  },
  nft: async (_, { collection, idx }, { dataSource }): Promise<any | null> => {
    // console.log("resolver | nft: ", parent);
    return dataSource.getNFT(collection, idx);
  },
  collections: async (
    _,
    { skip = 0, count = 5 },
    { dataSource }
  ): Promise<any> => {
    // console.log("collections: ", skip, count);
    return dataSource.getCollections(skip!, count!);
  },
  collection: async (_, { address }, { dataSource }): Promise<any> => {
    return dataSource.getCollection(address);
  },
  auctions: async (
    _,
    { creator, onlyLive = true, skip = 0, count = 10 },
    { dataSource }
  ): Promise<any[]> => {
    const x = dataSource.getAuctions(creator!, onlyLive!, skip!, count!);
    console.log(
      "query resolver | auctions: ",
      (await x).length,
      creator,
      onlyLive
    );
    return x;
  },
  userBids: async (
    _,
    { address, skip = 0, count = 10 },
    { dataSource }
  ): Promise<any[]> => {
    // console.log("userBids | resolver");
    return dataSource.getBidsByBidder(address, skip!, count!);
  },
  topBids: async (
    _,
    { skip = 0, count = 10 },
    { dataSource }
  ): Promise<any[]> => {
    return dataSource.getTopBids(skip!, count!);
  },
};

export const NFT: NftResolvers<{ dataSource: DataSource }> = {
  collection: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Nft | resolver", parent);
    if ("collectionAddress" in parent) {
      return await dataSource.getCollection(parent.collectionAddress);
    }
  },
};
export const Collection: CollectionResolvers<{ dataSource: DataSource }> = {
  nfts: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Collection | resolver", parent);
    if ("address" in parent) {
      return await dataSource.getNFTsByCollection(0, 24, parent.address);
    }
  },
};
export const Auction: AuctionResolvers<{ dataSource: DataSource }> = {
  nft: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Auction | resolver", parent);
    if ("collectionAddress" in parent && "nftIdx" in parent) {
      return await dataSource.getNFT(parent.collectionAddress, parent.nftIdx);
    }
  },
  auctionData: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Auction | resolver", parent);
    return { ...parent.auctionData, type: parent.auctionType };
  },
};
export const EnglishAuction: EnglishAuctionResolvers<{
  dataSource: DataSource;
}> = {
  bids: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("EnglishAuction | resolver", parent);
    if ("id" in parent) {
      return await dataSource.getBidsByAuctionId(parent.id);
    }
  },
};
export const BlindFirstPriceAuction: BlindFirstPriceAuctionResolvers<{
  dataSource: DataSource;
}> = {
  bids: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("EnglishAuction | resolver", parent);
    if ("id" in parent) {
      return await dataSource.getBidsByAuctionId(parent.id);
    }
  },
};
export const BlindSecondPriceAuction: BlindSecondPriceAuctionResolvers<{
  dataSource: DataSource;
}> = {
  bids: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("EnglishAuction | resolver", parent);
    if ("id" in parent) {
      return await dataSource.getBidsByAuctionId(parent.id);
    }
  },
};
export const AuctionType: AuctionTypeResolvers = {
  // using auctionType
  __resolveType: (parent: any) => {
    // console.log("AuctionType | resolver", parent);
    if ("type" in parent) {
      switch (parent.type as auctionType) {
        case "english":
          return "EnglishAuction";
        case "dutch":
          return "DutchAuction";
        case "blindFirstPrice":
          return "BlindFirstPriceAuction";
        case "blindSecondPrice":
          return "BlindSecondPriceAuction";
      }
    }
    return null;
  },
};
export const Bid: BidResolvers<{ dataSource: DataSource }> = {
  auction: async (parent: any, _, { dataSource }): Promise<any> => {
    // console.log("Bid | resolver", parent);
    if ("auctionId" in parent) {
      return await dataSource.getAuction(parent.auctionId);
    }
  },
};
