import { LiveAuctionCard } from "./liveAuctionCard";

export function LiveAuction() {
    const arr: number[] = [1, 2, 3, 4]
    return (
        <div className="pt-24 bg-blackBg">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className=" lg:col-span-7">
                    <div className="flex justify-between w-full max-w-md mx-auto md:mx-0 ">
                        <p className="text-5xl text-heading w-fit">Live Auction</p>
                        <p className="text-[#ABABAB] text-base p-4 border border-[#ABABAB] w-fit rounded-2xl">643 Live</p>
                    </div>
                    <div className="flex justify-between w-full max-w-md gap-8 mx-auto mt-3 md:mx-0">
                        <button id="sortButton" data-dropdown-toggle="dropdown"
                            className=" bg-[#1C1C1C] hover:bg-black  font-normal text-[#C2C2C2] rounded-xl text-xl flex-grow text-center inline-flex items-center py-5 justify-between px-10 "
                            type="button">Sort
                            <svg className="w-6 h-6  text-[#C2C2C2]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
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
                    {/* <!--  Cards grid --> */}
                    <div className="grid gap-6 mt-10 md:grid-cols-2 justify-items-center">
                        {arr.map((item: number) => (
                            <LiveAuctionCard />
                        ))}
                    </div>
                </div>
                <div className="h-20 lg:mt-0 lg:col-span-4">
                </div>
            </div>
        </div>
    );
}
