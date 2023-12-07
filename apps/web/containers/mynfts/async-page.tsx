"use client";

const arr: number[] = [1, 2, 3, 4, 5, 6];
export default function MyNfts() {
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
          <p className="mx-auto mb-14 mt-10 text-center text-5xl font-medium text-heading">
            Your amazing collections !
          </p>
          <div className="mx-auto grid max-w-custom justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
            {arr.map((item: number) => (
              <div className="relative w-80 pt-12">
                <div className="absolute z-10 flex w-full  -translate-y-1/2 items-center justify-center rounded-[20px] bg-[#5c5c5c1a] px-7 py-[18px] backdrop-blur-lg">
                  <div className="text-center">
                    <p className="mx-auto text-2xl font-semibold text-[#DDD] ">
                      NFT Name
                    </p>
                    <p className="mx-auto text-base font-normal text-[#929292]">
                      by Artist Name
                    </p>
                  </div>
                </div>
                <div className="relative mx-auto h-[310px] w-[310px] px-3">
                  <img
                    className="mx-auto h-full w-full rounded-3xl object-cover"
                    src="/img/cyberCat.png"
                    alt=""
                  />
                </div>
                <div className="-mt-5 space-y-2 rounded-[22px] bg-[#1e1e1e47] p-1.5 backdrop-blur-lg">
                  <div className="flex items-center justify-between rounded-2xl bg-[#5c5c5c1a] px-7 py-2.5 backdrop-blur-lg">
                    <div className="text-center">
                      <p className="text-base font-normal text-[#929292]">
                        Bought for{" "}
                      </p>
                      <p className="text-2xl font-semibold text-[#DDD]">
                        0.0016ETH
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-[#DDD]">#9</p>
                      <p className="text-base  font-normal text-[#929292]">
                        Mint number
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full   rounded-2xl border border-[#00B2FF] bg-[#00B2FF] px-5 py-6  text-center text-2xl font-semibold text-white hover:bg-white hover:text-black "
                  >
                    Start Auction
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
