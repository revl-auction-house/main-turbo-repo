import Image from "next/image";

const arr: number[] = [1, 2, 3, 4, 5, 6];
export function TrendingCollection() {
  return (
    <div className="bg-blackBg py-5 pb-20">
      <p className="mx-auto mb-12 max-w-custom text-5xl font-medium text-heading">
        Trending collection
      </p>
      <div className="mx-auto max-w-[1249px] rounded-[85px] border border-[#fff5f51c] pt-28">
        <div className="mx-auto grid max-w-custom justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {arr.map((item: number) => (
            <div className="w-80">
              <div className="relative h-[310px] w-[310px]">
                <div className="absolute right-3 top-3 flex w-fit items-center rounded-[63px] border border-white bg-white/30 px-5 py-2 backdrop-blur-sm">
                  <div className="mr-2.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                  <p className="text-xs font-medium text-white">
                    Live for auction
                  </p>
                </div>
                <img
                  className="h-full w-full rounded-3xl object-cover"
                  src="/img/cyberCat.png  "
                  alt=""
                  srcset=""
                />
              </div>
              <div className="-mt-5 space-y-2 rounded-[22px] bg-[#1e1e1e47] p-1.5 backdrop-blur-lg">
                <div className="flex items-center justify-between rounded-[20px] bg-[#5c5c5c1a] px-7 py-[18px] backdrop-blur-lg">
                  <div>
                    <p className="text-2xl font-semibold text-[#DDD]">
                      Collection name
                    </p>
                    <p className="text-base font-normal text-[#929292]">
                      by Artist Name
                    </p>
                  </div>
                  <img src="/img/heart.svg" alt="" className="h-6 w-auto" />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#5c5c5c1a] px-7 py-2.5 backdrop-blur-lg">
                  <div>
                    <p className="text-base font-normal text-[#929292]">
                      Floor
                    </p>
                    <p className="text-xl font-normal text-[#B8B8B8]">
                      0.00067 ETH
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-normal text-[#929292]">
                      Total volume
                    </p>
                    <p className="text-right text-xl font-normal text-[#B8B8B8]">
                      34 ETH
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full   rounded-2xl border border-[#00B2FF] bg-[#00B2FF] px-5 py-2.5  text-center text-2xl font-medium text-white hover:bg-white hover:text-black "
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-32 w-fit translate-y-1/2 rounded-[52px] border border-[#9F9F9F] bg-blackBg px-8 py-4 text-2xl font-normal text-white">
          See more
        </p>
      </div>
    </div>
  );
}
