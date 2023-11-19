"use client";
import { Faucet } from "@/components/faucet";
import { Banner } from "@/components/ui/Home/banner";
import { LiveAuction } from "@/components/ui/Home/liveAuction";
import { useFaucet } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";
import Image from "next/image";


export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();

  return (
    <>
      <Banner />
      <LiveAuction />
    </>
  );
}
