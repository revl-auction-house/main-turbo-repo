import { DutchAuctionModule } from "./Auctions/DutchAuction";
import { EnglishAuctionModule } from "./Auctions/EnglishAuction";
import { BlindFirstPriceAuctionModule } from "./Auctions/Blind/BlindFirstPriceAuction";
import { Balances } from "./Balances";
import { GlobalCounter } from "./GlobalCounter";
import { NFT } from "./NFT";
import { PrivateToken } from "./PrivateToken/PrivateToken";
import { LastStateRootBlockHook } from "@proto-kit/protocol";

export const runtimeConfig = {
  Balances: {},
  NFT: {},
  PrivateToken: {},
  GlobalCounter: {},
  EnglishAuctionModule: {},
  LastStateRoot: {},
  // DutchAuctionModule: {},
  // BlindFirstPriceAuctionModule: {},
};
export const runtime = {
  modules: {
    Balances,
    NFT,
    PrivateToken,
    GlobalCounter,
    EnglishAuctionModule,
    // DutchAuctionModule,
    // BlindFirstPriceAuctionModule,
  },
};
