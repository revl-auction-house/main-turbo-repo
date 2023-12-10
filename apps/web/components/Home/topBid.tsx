import { getTimeAgo } from "@/lib/utils";

export function TopBid({ item }: any) {
  const time = getTimeAgo(item?.auction?.endTime)

  return (
    <div className="mt-6 rounded-[27px] bg-[#0b0f10] p-[18px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/img/monkeyHoly.png "
            alt=""
            className="me-3 h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="mb-1 text-[10px] font-medium text-[#B5B5B5]">
              Auction Type : Sealed
            </p>
            <p className="text-xl font-semibold text-white">{item?.auction?.nft?.name}</p>
          </div>
        </div>
        <span className="text-2xl font-semibold text-[#00B2FF]">
          {item?.amount} ETH
        </span>
      </div>
      <div className="mt-5 w-fit rounded-[37px] border border-[#808080] px-4 py-2.5 text-xs font-normal text-[#828282]">
        Ended {time} ago
      </div>
    </div>
  );
}
