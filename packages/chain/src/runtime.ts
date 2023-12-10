import { DutchAuctionModule } from "./Auctions/DutchAuction";
import { EnglishAuctionModule } from "./Auctions/EnglishAuction";
import { Balances } from "./Balances";
import { GlobalCounter } from "./GlobalCounter";
import { NFT } from "./NFT";

export default {
  modules: {
    Balances,
    NFT,
    GlobalCounter,
    EnglishAuctionModule,
    // DutchAuctionModule,
  },
  config: {
    Balances: {},
    NFT: {},
    GlobalCounter: {},
    EnglishAuctionModule: {},
    // DutchAuctionModule: {},
  },
};
