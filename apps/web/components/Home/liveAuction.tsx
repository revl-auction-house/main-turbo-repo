import { LiveAuctionCard } from "./liveAuctionCard";
import { TopBid } from "./topBid";

export function LiveAuction() {
  const arr: number[] = [1, 2, 3, 4];

  return (
    <div className="bg-blackBg pb-20 pt-24">
      <div className="mx-auto grid max-w-custom px-4 py-8 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className=" lg:col-span-7">
          <div className="mx-auto flex w-full max-w-md justify-between md:mx-0 ">
            <p className="w-fit text-5xl text-heading">Live Auction</p>
            <p className="w-fit rounded-2xl border border-[#ABABAB] p-4 text-base text-[#ABABAB]">
              643 Live
            </p>
          </div>
          <div className="mx-auto mt-3 flex w-full max-w-md justify-between gap-8 md:mx-0">
            <button
              id="sortButton"
              data-dropdown-toggle="dropdown"
              className=" inline-flex flex-grow  items-center justify-between rounded-xl bg-[#1C1C1C] px-10 py-5 text-center text-xl font-normal text-[#C2C2C2] hover:bg-black "
              type="button"
            >
              Sort{" "}
              <svg
                className="h-6 w-6  text-[#C2C2C2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.8"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              id="filterButton"
              data-dropdown-toggle="filterdropdown"
              className=" inline-flex flex-grow  items-center justify-between rounded-xl bg-[#1C1C1C] px-10 py-5 text-center text-xl font-normal text-[#C2C2C2] hover:bg-black"
              type="button"
            >
              Filter{" "}
              <svg
                className="h-6 w-6 text-[#C2C2C2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
              </svg>
            </button>
            <div
              id="filterdropdown"
              className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 grid justify-items-center gap-6 md:grid-cols-2">
            {arr.map((item: number) => (
              <LiveAuctionCard />
            ))}
          </div>
        </div>
        <div className=" lg:col-span-5 lg:mt-0">
          <div className="relative  flex h-full flex-col rounded-[22px] bg-[#13181D] py-3 pb-0">
            <div className="flex-grow px-5 ">
              <p className="ms-4 text-[32px]  font-semibold text-[#DCDCDC]">
                Top Bids
              </p>
              {arr.map((item: number) => (
                <TopBid />
              ))}
            </div>
            <div className="z-10 flex ">
              <div className="h-28 flex-grow   rounded-[20px]  bg-[#13181D]"></div>
              <div className="w-fit translate-y-1/2 rounded-[44px] bg-blackBg px-5 py-7">
                <p className="mx-auto w-fit rounded-full border border-[#AEAEAE] px-8 py-3 text-xl font-semibold text-[#AEAEAE]">
                  See more
                </p>
              </div>
              <div className="h-28 flex-grow   rounded-[20px] bg-[#13181D]"></div>
            </div>
            <div className="absolute bottom-0 h-4 w-full bg-blackBg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
