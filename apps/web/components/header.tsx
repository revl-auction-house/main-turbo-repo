import { Button } from "@/components/ui/button";
import protokit from "@/public/protokit-zinc.svg";
import Image from "next/image";
import Link from "next/link";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/ui/skeleton";
import { Chain } from "./chain";
import { Separator } from "./ui/separator";

export interface HeaderProps {
  loading: boolean;
  wallet?: string;
  onConnectWallet: () => void;
  balance?: string;
  balanceLoading: boolean;
  blockHeight?: string;
}

export default function Header({
  loading,
  wallet,
  onConnectWallet,
  balance,
  balanceLoading,
  blockHeight,
}: HeaderProps) {
  console.log(
    balance,
    "balance",
    wallet,
    "wallet",
    loading,
    "loading",
    balanceLoading,
    "balanceLoading",
    blockHeight,
    "blockHeight",
  );
  return (
    <>
      <nav className="border-gray-200 bg-[#060606]">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
              Logo
            </span>
          </Link>
          <div className="flex space-x-3 rtl:space-x-reverse md:order-2 md:space-x-0">
            <div>
              <button
                type="button"
                className="rounded-[20px] bg-buttonColor px-6 py-4 text-center text-2xl font-medium text-white shadow-lg shadow-cyan-500/50 hover:bg-blue-800 "
                onClick={onConnectWallet}
              >
                {wallet
                  ? truncateMiddle(wallet, 4, 4, "...")
                  : "Connect wallet"}
              </button>
              <span>20</span>
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-cta"
          >
            <ul className="mt-4 flex flex-col items-center rounded-lg bg-transparent p-4 text-xl font-medium rtl:space-x-reverse md:mt-0 md:flex-row md:items-start md:space-x-8 md:border-0 md:p-0">
              <li className="w-fit">
                <Link
                  href="/"
                  className="block rounded px-3 py-2 text-center text-activeNav hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Live Auction
                </Link>
                <svg
                  className="-mt-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="162"
                  height="22"
                  viewBox="0 0 162 22"
                  fill="none"
                >
                  <path
                    d="M161 0.181641V10.1816C161 15.1522 156.971 19.1816 152 19.1816H10C5.02943 19.1816 1 15.1522 1 10.1816V2.02035"
                    stroke="url(#paint0_linear_429_125)"
                    strokeWidth="0.7"
                  />
                  <rect
                    x="64"
                    y="17.1816"
                    width="35"
                    height="4"
                    rx="2"
                    fill="#FF6B00"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_429_125"
                      x1="81"
                      y1="0.181641"
                      x2="81"
                      y2="19.1816"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop
                        offset="1"
                        stopColor="#FF6B00"
                        stopOpacity="0.31"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </li>
              <li>
                <Link
                  href="/myauction"
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
                >
                  My Auction
                </Link>
              </li>
              <li className="w-fit">
                <Link
                  href="/mybids"
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  My Bids
                </Link>
              </li>
              <li className="w-fit">
                <Link
                  href="/mynfts"
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  My NFTS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
