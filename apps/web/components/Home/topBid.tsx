
export function TopBid() {
    return (
        <div className="">
        <div className="bg-[#0b0f10] mt-6 p-[18px] rounded-[27px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="/img/monkeyHoly.png " alt="" className="object-cover w-16 h-16 rounded-xl me-3" />
                    <div>
                        <p className="text-[#B5B5B5] text-[10px] font-medium mb-1">Auction Type : Sealed</p>
                        <p className="text-xl font-semibold text-white">NFT Name</p>
                    </div>
                </div>
                <span className="text-[#00B2FF] text-2xl font-semibold">1.26 ETH</span>
            </div>
            <div
                className="mt-5 text-[#828282] text-xs font-normal px-4 py-2.5 rounded-[37px] border border-[#808080] w-fit">
                Ended 2 mins ago</div>
        </div>
    </div>
    );
}
