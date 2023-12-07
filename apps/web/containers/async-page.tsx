"use client";
import { Faucet } from "@/components/faucet";
import { Banner } from "@/components/Home/banner";
import { EngagedLiveAuction } from "@/components/Home/engagedLiveAuction";
import { LiveAuction } from "@/components/Home/liveAuction";
import { Search } from "@/components/Home/searchBox";
import { TrendingCollection } from "@/components/Home/trendingCollection";
import { useFaucet } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";

export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();

  return (
    <>
      <Search />
      <Banner />
      <LiveAuction />
      <EngagedLiveAuction />
      <TrendingCollection />
    </>
  );
}
