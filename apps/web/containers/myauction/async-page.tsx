"use client";

const arr: number[] = [1, 2, 3, 4, 5, 6, 7];
export default function MyAuction() {
  return (
    <>
      <div className="relative flex h-16 bg-[#060606]">
        <div className="h-full w-10 flex-grow translate-y-2 rounded-br-lg bg-[#060606]"></div>
        <form className="relative flex h-fit w-full max-w-lg translate-y-1/2 items-center rounded-lg bg-[#13181D] px-2 py-2">
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

      <section className="bg-blackBg p-2">
        <div className="mx-auto  w-full max-w-custom  rounded-b-[52px] bg-gradient-to-t from-[#00B2FF] from-0% p-0.5">
          <div className="h-full    w-full rounded-b-[52px] bg-[#13181D] pt-20 md:px-[90px] ">
            <p className="mx-14 mb-5 mt-16 text-center text-5xl font-medium text-heading">
              Let the Bidding Begin: Unleash the
            </p>
            <p className="mx-14 mb-20 text-center text-5xl font-medium text-heading">
              NFT Excitement
            </p>
            <p className="mx-auto mb-8 text-center text-2xl text-heading">
              Please select the type
            </p>
            <div>
              <div
                className="mb-16 grid rounded-[32px] bg-[#1e1e1e47] px-6 py-4 md:grid-cols-3 md:gap-x-5 "
                style={{ boxShadow: "0px -7px 25px 0px rgba(0, 0, 0, 0.40)" }}
              >
                <div className="flex min-h-[227px] flex-col  items-center justify-center  rounded-[19px] bg-[#5c5c5c1a] p-6 text-white backdrop-blur-lg transition ease-in-out hover:bg-white hover:text-black">
                  <p className=" mb-8 text-center text-[32px] font-medium ">
                    English
                  </p>
                  <p className="text-center text-base font-normal text-[#8D8D8D]">
                    Unlock hidden treasures with sealed bids.
                  </p>
                </div>
                <div className="flex  min-h-[227px] flex-col  items-center justify-center  rounded-[19px] bg-[#5c5c5c1a] p-6 text-white backdrop-blur-lg transition ease-in-out hover:bg-white hover:text-black">
                  <p className=" mb-8 text-center text-[32px] font-medium ">
                    Sealed
                  </p>
                  <p className="text-center text-base font-normal text-[#8D8D8D]">
                    Bid openly, win boldly in English auctions.
                  </p>
                </div>
                <div className="flex  min-h-[227px] flex-col  items-center justify-center  rounded-[19px] bg-[#5c5c5c1a] p-6 text-white backdrop-blur-lg transition ease-in-out hover:bg-white hover:text-black">
                  <p className=" mb-8 text-center text-[32px] font-medium ">
                    Dutch
                  </p>
                  <p className="text-center text-base font-normal text-[#8D8D8D]">
                    Dive into Dutch auctions, where prices drop, and winners
                    rise.
                  </p>
                </div>
              </div>
            </div>
            <button className="mx-auto  block w-fit translate-y-1/2 rounded-[20px] bg-[#606060] px-8 py-4  text-[32px] font-medium text-white shadow-lg shadow-[#606060]/40 md:px-16">
              Start Auction
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#13181D] pb-[61px] pt-[117px]">
        <div className="mx-auto max-w-custom">
          <p className="mb-14 text-5xl font-medium text-heading">
            Your recent auction
          </p>
          <div className="grid md:grid-cols-12 md:gap-x-5">
            <div className="md:col-span-7">
              <div className="flex space-x-6 rounded-[60px] bg-[#0B0F10] px-4 py-5">
                <img
                  src="/img/stone.png"
                  className="h-[316px] w-[316px] rounded-[50px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-2xl font-normal text-[#636363] ">
                      Highest Bid
                    </p>
                    <p className="text-[70px] font-semibold text-[#00FF38] ">
                      0.015 <span className="text-[40px]">ETH </span>{" "}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium text-[#D9D9D9] ">
                      NFT name
                    </p>
                    <p className="text-xl font-normal text-[#9A9A9A]">
                      Sold to
                    </p>
                  </div>
                  <div className="flex w-fit items-center rounded-[28px] border border-[#00b2ff4d] px-6 py-2.5">
                    <p className="text-xs font-normal text-[#7D7A7A]">
                      Ends in{" "}
                    </p>
                    <p className="ml-2 text-base font-medium text-buttonColor">
                      6:49 mins
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 rounded-[45px] bg-[#0B0F10] px-[52px] py-9">
                <p className="mb-4 text-xl font-medium text-[#636363]">Stats</p>
                <div className="grid grid-cols-2">
                  <div className="space-y-[15px]">
                    <div>
                      <p className="mb-8 text-base font-medium text-[#969696]">
                        Auction Type
                      </p>
                      <p className="text-xl font-semibold text-buttonColor">
                        Sealed Bid
                      </p>
                    </div>
                    <div
                      className="h-[2px] "
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)",
                      }}
                    ></div>
                    <div>
                      <p className="mb-8 text-5xl font-semibold text-buttonColor">
                        0.0016 <span className="text-base">ETH</span>
                      </p>
                      <p className="text-base font-medium text-[#969696]">
                        You bought for
                      </p>
                    </div>
                    <div
                      className="h-[2px] "
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)",
                      }}
                    ></div>
                    <div>
                      <p className="mb-3.5 text-base font-medium text-[#969696]">
                        Auction Duration
                      </p>
                      <p className="text-2xl font-semibold text-buttonColor ">
                        22:03 hrs
                      </p>
                    </div>
                  </div>
                  <div className="space-y-[18px] rounded-[23px] bg-[#e3e3ff0a] px-[34px] py-[27px] text-center backdrop-blur-xl">
                    <div>
                      <p className="mb-3.5 text-base font-semibold text-[#969696]">
                        Average Bid
                      </p>
                      <p className="text-2xl font-semibold text-buttonColor">
                        0.068 ETH
                      </p>
                    </div>
                    <div
                      className="h-[2px] "
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)",
                      }}
                    ></div>
                    <div>
                      <p className="mb-3.5 text-base font-semibold text-[#969696]">
                        Participators
                      </p>
                      <p className="text-2xl font-semibold text-buttonColor">
                        97 Bidders
                      </p>
                    </div>
                    <div
                      className="h-[2px] "
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)",
                      }}
                    ></div>
                    <div>
                      <p className="mb-3.5 text-base font-semibold text-[#969696]">
                        Starting price
                      </p>
                      <p className="text-2xl font-semibold text-buttonColor">
                        0.00016ETH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" md:col-span-5">
              <div className=" h-full rounded-[32px] bg-[#0B0F10] p-4">
                <div className="mx-3 mb-5 flex items-center justify-between">
                  <p className="text-xl font-medium text-[#636363]">
                    Auction History
                  </p>
                  <img
                    src="/img/Filter icopn.svg"
                    className="h-5 w-auto "
                    alt=""
                  />
                </div>
                <div className="space-y-5">
                  {arr.map((item) => (
                    <div className="rounded-[22px] border border-buttonColor bg-[#20383B] p-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src="/img/stone.png"
                            className="h-[67px] w-[67px] rounded-[10px] "
                            alt=""
                          />
                          <div className="ml-1.5 space-y-1">
                            <p className="text-base font-semibold text-white">
                              NFT Name
                            </p>
                            <div className="flex items-center">
                              <div className=" mr-2.5  h-1.5 w-1.5 rounded-full bg-red-600"></div>
                              <p className="text-xs font-medium text-[#AEAEAE]">
                                Live for auction
                              </p>
                            </div>
                            <p className="text-[10px] font-normal text-[#727272]">
                              Auction type: Sealed
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-normal text-[#7D7A7A]">
                            Ends in
                          </p>
                          <p className="text-base font-medium text-buttonColor">
                            6:49 mins
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
