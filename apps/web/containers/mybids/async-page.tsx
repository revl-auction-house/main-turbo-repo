"use client";

const arr: number[] = [1, 2, 3, 4];

export default function MyBids() {
  return (
    <>
      <div className="relative flex h-16 bg-[#060606]">
        <div className="h-full w-10 flex-grow translate-y-2 rounded-br-lg bg-[#060606]"></div>
        <form className="relative flex h-fit w-full max-w-lg translate-y-1/2 items-center rounded-lg bg-blackBg px-2 py-2">
          <input
            type="text"
            id="search"
            className="m-0.5 block w-full flex-grow rounded-lg border-none  bg-[#ffffff1a] p-5 text-xl text-white placeholder-gray-400 shadow-lg shadow-gray-950/50 focus:border-white focus:ring-white "
            placeholder="Search anything....."
            required
          />

          <div className="m-0.5 ml-2 ">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-[#ffffff1a] p-5 text-center text-sm font-medium text-white shadow-lg shadow-gray-950/50 hover:bg-white hover:text-black focus:outline-none focus:ring-blue-300 "
            >
              <svg
                className="h-6 w-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div>
        </form>
        <div className="h-full w-10 flex-grow translate-y-2 rounded-bl-lg bg-[#060606]"></div>
      </div>
      <div className="bg-[#0D0D0D] pt-24">
        <div className="mx-auto max-w-custom ">
          <div className="flex w-full justify-between px-5">
            <div className="mx-auto mt-3 flex w-full max-w-md justify-between gap-8 md:mx-0">
              <button
                className="flex-grow rounded-xl bg-buttonColor px-6 py-3 text-center text-2xl font-medium text-white hover:bg-white hover:text-black"
                type="button"
              >
                Sealed Bid
              </button>
              <button
                className=" flex-grow rounded-xl  bg-[#1C1C1C] px-5 py-3 text-center text-2xl font-normal text-[#C2C2C2]  hover:bg-black  "
                type="button"
              >
                English Bid
              </button>
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
          </div>
          <div className=" relative flex h-full flex-col rounded-[22px] py-3 pb-0">
            <div className="">
              <div className="">
                {arr.map((item: number) => (
                  <div className="mt-6 space-y-8 rounded-[27px] bg-[#121212] p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src="/img/stone.png"
                          alt=""
                          className="me-[51px] h-[217px] w-[217px] rounded-xl object-cover"
                        />
                        <div className="space-y-3">
                          <p className="rounded-[44px] border border-[#5d5d5d] px-6 py-2  text-base font-medium text-[#B5B5B5]">
                            Auction Type : English
                          </p>
                          <p className="text-[32px] font-semibold text-white">
                            NFT Name
                          </p>
                          <p className="text-xl font-medium text-[#969696]">
                            3:47 pm IST
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xl font-medium text-[#C5C5C5]">
                          HIghest Bid till now
                        </p>
                        <span className="text-[32px] font-medium text-[#00B2FF]">
                          0.0015 ETH
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-12">
                        <div className="relative w-fit overflow-hidden rounded-2xl border-2 border-[#605D96]">
                          <div
                            className="absolute  h-full bg-[#00b2ff40] "
                            style={{ width: "80%" }}
                          ></div>
                          <p className="relative z-10 mx-[18px] my-5 text-xl font-medium text-heading">
                            Time left - 10:06 min
                          </p>
                        </div>
                        <button
                          className="rounded-xl bg-buttonColor px-12 py-0 text-center text-[32px]  font-semibold text-white hover:bg-white hover:text-black"
                          type="button"
                        >
                          Reveal
                        </button>
                      </div>
                      <img
                        src="/img/checked.png"
                        alt=""
                        className="h-8 w-8 object-cover "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
