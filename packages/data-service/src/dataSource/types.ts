import {
  Nft,
  Collection,
  Auction,
  Bid,
  EnglishAuction,
  BlindFirstPriceAuction,
  BlindSecondPriceAuction,
  DutchAuction,
} from "../resolvers/resolvers-types";

export type CollectionPart = Omit<Collection, "nfts">;

export type NftPart = Omit<Nft & { collectionAddress: string }, "collection">;

export type BidPart = Omit<Bid & { auctionId: string }, "auction">;

export type auctionType =
  | "english"
  | "dutch"
  | "blindFirstPrice"
  | "blindSecondPrice";

export type EnglishAuctionPart = Omit<EnglishAuction, "bids">;

export type BlindFirstPriceAuctionPart = Omit<BlindFirstPriceAuction, "bids">;

export type BlindSecondPriceAuctionPart = Omit<BlindSecondPriceAuction, "bids">;

export type AuctionPart = Omit<
  Omit<Omit<Auction, "winningBid">, "auctionData"> & {
    collectionAddress: string;
    nftIdx: number;
    winningBid: BidPart;
    auctionType: auctionType;
    auctionData:
      | EnglishAuctionPart
      | DutchAuction
      | BlindFirstPriceAuctionPart
      | BlindSecondPriceAuctionPart;
  },
  "nft"
>;
