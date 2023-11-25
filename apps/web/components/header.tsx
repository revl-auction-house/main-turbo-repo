import { Button } from "@/components/ui/button";
import protokit from "@/public/protokit-zinc.svg";
import Image from "next/image";
import Link from 'next/link';
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
  return (
    <>
      <nav className="border-gray-200 bg-[#060606]">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">Logo</span>
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button type="button"
              className="px-6 py-4 text-2xl font-medium text-center text-white shadow-lg rounded-[20px] bg-buttonColor shadow-cyan-500/50 hover:bg-blue-800 ">Connect
              Wallet</button>
            <button data-collapse-toggle="navbar-cta" type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul
              className="flex flex-col items-center p-4 mt-4 text-xl font-medium bg-transparent rounded-lg md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:items-start md:mt-0 md:border-0">
              <li className="w-fit">
                <Link href="/"
                  className="block px-3 py-2 text-center rounded text-activeNav md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Live Auction</Link>
                <svg className="-mt-2" xmlns="http://www.w3.org/2000/svg" width="162" height="22" viewBox="0 0 162 22" fill="none">
                  <path d="M161 0.181641V10.1816C161 15.1522 156.971 19.1816 152 19.1816H10C5.02943 19.1816 1 15.1522 1 10.1816V2.02035" stroke="url(#paint0_linear_429_125)" stroke-width="0.7" />
                  <rect x="64" y="17.1816" width="35" height="4" rx="2" fill="#FF6B00" />
                  <defs>
                    <linearGradient id="paint0_linear_429_125" x1="81" y1="0.181641" x2="81" y2="19.1816" gradientUnits="userSpaceOnUse">
                      <stop />
                      <stop offset="1" stop-color="#FF6B00" stop-opacity="0.31" />
                    </linearGradient>
                  </defs>
                </svg>

              </li>
              <li>
                <Link href="/myauction"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 ">
                  My Auction
                </Link>
              </li>
              <li className="w-fit">
                <Link href="/mybids"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                  My Bids
                </Link>
              </li>
              <li className="w-fit">
                <Link href="mynfts"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
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
