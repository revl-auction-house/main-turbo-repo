"use client";


const arr: number[] = [1, 2, 3, 4]

export default function MyBids() {

  return (
    <>
      <div className="relative flex h-16 bg-[#060606]">
        <div className="flex-grow w-10 h-full translate-y-2 rounded-br-lg bg-[#060606]"></div>
        <form className="relative flex items-center w-full max-w-lg px-2 py-2 translate-y-1/2 rounded-lg h-fit bg-blackBg">


          <input type="text" id="search"
            className="bg-[#ffffff1a] shadow-lg shadow-gray-950/50 flex-grow m-0.5 border-none  text-white text-xl rounded-lg focus:ring-white focus:border-white block w-full p-5 placeholder-gray-400 "
            placeholder="Search anything....." required />

          <div className="m-0.5 ml-2 "><button type="button"
            className="inline-flex items-center p-5 text-sm font-medium text-center text-white hover:text-black rounded-lg shadow-lg shadow-gray-950/50 bg-[#ffffff1a] hover:bg-white focus:outline-none focus:ring-blue-300 ">
            <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button></div>
        </form>
        <div className="flex-grow w-10 h-full translate-y-2 rounded-bl-lg bg-[#060606]"></div>
      </div>
      <div className="bg-[#0D0D0D] pt-24">
        <div className="mx-auto max-w-custom ">
          <div className="flex justify-between w-full px-5">
            <div className="flex justify-between w-full max-w-md gap-8 mx-auto mt-3 md:mx-0">
              <button
                className="flex-grow px-6 py-3 text-2xl font-medium text-center text-white bg-buttonColor hover:bg-white rounded-xl hover:text-black"
                type="button">Sealed Bid
              </button>
              <button
                className=" bg-[#1C1C1C] hover:bg-black  font-normal text-[#C2C2C2] rounded-xl text-2xl flex-grow text-center py-3  px-5  "
                type="button">English Bid
              </button>
            </div>
            <div className="flex justify-between w-full max-w-md gap-8 mx-auto mt-3 md:mx-0">
              <button id="sortButton" data-dropdown-toggle="dropdown"
                className=" bg-[#1C1C1C] hover:bg-black  font-normal text-[#C2C2C2] rounded-xl text-xl flex-grow text-center inline-flex items-center py-5 justify-between px-10 "
                type="button">Sort <svg className="w-6 h-6  text-[#C2C2C2]" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                      out</a>
                  </li>
                </ul>
              </div>
              <button id="filterButton" data-dropdown-toggle="filterdropdown"
                className=" bg-[#1C1C1C] hover:bg-black  font-normal text-[#C2C2C2] rounded-xl text-xl flex-grow text-center inline-flex items-center py-5 justify-between px-10"
                type="button">Filter <svg className="w-6 h-6 text-[#C2C2C2]" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
                </svg>
              </button>
              <div id="filterdropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                      out</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" relative h-full flex flex-col py-3 pb-0 rounded-[22px]">
            <div className="">
              <div className="">
                {arr.map((item: number) => (
                  <div className="bg-[#121212] mt-6 p-8 rounded-[27px] space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="/img/stone.png" alt="" className="object-cover w-[217px] h-[217px] rounded-xl me-[51px]" />
                        <div className="space-y-3">
                          <p className="text-[#B5B5B5] text-base border border-[#5d5d5d] font-medium  px-6 py-2 rounded-[44px]">
                            Auction Type : English</p>
                          <p className="text-[32px] font-semibold text-white">NFT Name</p>
                          <p className="text-[#969696] text-xl font-medium">3:47 pm IST</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[#C5C5C5] text-xl font-medium">HIghest Bid till now</p>
                        <span className="text-[#00B2FF] text-[32px] font-medium">0.0015 ETH</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">

                      <div className="flex space-x-12"
                      >
                        <div className="relative w-fit rounded-2xl border-2 border-[#605D96] overflow-hidden">
                          <div className="absolute  h-full bg-[#00b2ff40] " style={{ width: '80%' }}></div>
                          <p className="relative z-10 my-5 mx-[18px] text-xl font-medium text-heading">Time left - 10:06 min</p>

                        </div>
                        <button
                          className="px-12 py-0 text-[32px] font-semibold text-center text-white  bg-buttonColor hover:bg-white rounded-xl hover:text-black"
                          type="button">Reveal
                        </button>

                      </div>
                      <img src="/img/checked.png" alt="" className="object-cover w-8 h-8 " />
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
