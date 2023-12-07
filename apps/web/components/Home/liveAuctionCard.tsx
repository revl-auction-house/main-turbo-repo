import Image from "next/image";

export function LiveAuctionCard() {
  return (
    <div className="h-fit max-w-xs rounded-[27px] bg-[#1e1e1e] p-4">
      <Image
        className="mx-auto mb-8 h-full max-h-[300px] w-full max-w-[300px] rounded-3xl object-cover"
        src="/img/monkey.png"
        width={100}
        height={100}
        alt=""
        srcset=""
      />
      <div className="space-y-3 px-3">
        <div className="flex items-center justify-between ">
          <div>
            <p className="text-xs font-normal text-[#B6B6B6]">Started by</p>
            <p className="text-2xl font-semibold text-[#DCDCDC]">Name</p>
          </div>
          <p className="text-xl font-light text-[#00adf8ab]">#09</p>
        </div>
        <button
          type="button"
          className="w-full   rounded-2xl border border-[#00B2FF] px-5 py-2.5  text-center text-2xl font-normal text-[#00B2FF] hover:bg-white hover:text-black "
        >
          View Collection
        </button>
        <button
          type="button"
          className="w-full   rounded-2xl border border-[#00B2FF] bg-[#00B2FF] px-5 py-2.5  text-center text-2xl font-medium text-white hover:bg-white hover:text-black "
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}
