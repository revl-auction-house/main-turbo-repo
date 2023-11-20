import { Button } from "@/components/ui/button";
import protokit from "@/public/protokit-zinc.svg";
import Image from "next/image";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/ui/skeleton";
import { Chain } from "./chain";
import { Separator } from "./ui/separator";
import { Search } from "./ui/Home/searchBox";

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
      <nav className="border-gray-200 bg-slate-950">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">

            <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">Logo</span>
          </a>
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
              className="flex flex-col p-4 mt-4 text-xl font-medium bg-transparent rounded-lg md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a href="#" className="block px-3 py-2 mb-1 rounded md:p-0 text-activeNav md:bg-transparent "
                  aria-current="page">Live Auctions</a>
                <div className="h-0.5 w-7 bg-activeNav mx-3 md:m-auto"></div>
              </li>
              <li>
                <a href="#"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 ">My
                  Auction</a>
              </li>
              <li>
                <a href="#"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 ">My
                  Bids</a>
              </li>
              <li>
                <a href="#"
                  className="block px-3 py-2 text-white rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 ">My
                  NFTs</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
}
