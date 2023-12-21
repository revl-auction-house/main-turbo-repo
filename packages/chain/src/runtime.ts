import { DutchAuctionModule } from "./Auctions/DutchAuction";
import { EnglishAuctionModule } from "./Auctions/EnglishAuction";
import { Balances } from "./Balances";
import { GlobalCounter } from "./GlobalCounter";
import { NFT } from "./NFT";
import { PrivateToken } from "./PrivateToken/PrivateToken";

export const runtime = {
  modules: {
    Balances,
    NFT,
    PrivateToken,
    GlobalCounter,
    EnglishAuctionModule,
    // DutchAuctionModule,
  },
  config: {
    Balances: {},
    NFT: {},
    PrivateToken: {},
    GlobalCounter: {},
    EnglishAuctionModule: {},
    // DutchAuctionModule: {},
  },
};
