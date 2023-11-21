"use client";
import { Faucet } from "@/components/faucet";
import { Banner } from "@/components/ui/Home/banner";
import { EngagedLiveAuction } from "@/components/ui/Home/engagedLiveAuction";
import { LiveAuction } from "@/components/ui/Home/liveAuction";
import { TrendingCollection } from "@/components/ui/Home/trendingCollection";
import { useFaucet } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";


export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();

  return (
    <>
      <Banner />
      <LiveAuction />
      <EngagedLiveAuction />
      <TrendingCollection />
    </>
  );
}
