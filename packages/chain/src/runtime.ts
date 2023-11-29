import {
  NFT,
  Balances,
  EnglishAuctionModule,
  DutchAuctionModule,
} from "@reevl/protokit-runtimes";

export default {
  modules: {
    Balances,
    NFT,
    EnglishAuctionModule,
    DutchAuctionModule,
  },
  config: {
    Balances: {},
    NFT: {},
    EnglishAuctionModule: {},
    DutchAuctionModule: {},
  },
};
