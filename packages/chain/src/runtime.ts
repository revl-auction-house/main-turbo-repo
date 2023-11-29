import {
  NFT,
  Balances,
  EnglishAuction,
  DutchAuction,
} from "@reevl/protokit-runtimes";

export default {
  modules: {
    Balances,
    NFT,
    EnglishAuction,
    DutchAuction,
  },
  config: {
    Balances: {},
    NFT: {},
  },
};
