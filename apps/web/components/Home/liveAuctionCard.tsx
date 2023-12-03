import Image from "next/image";

export function LiveAuctionCard() {
    return (
        <div className="bg-[#1e1e1e] h-fit p-4 max-w-xs rounded-[27px]">
            <Image className="mb-8 object-cover mx-auto h-full w-full max-w-[300px] max-h-[300px] rounded-3xl" src="/img/monkey.png" width={100} height={100} alt="" srcset="" />
            <div className="px-3 space-y-3">
                <div className="flex items-center justify-between ">
                    <div>
                        <p className="text-[#B6B6B6] text-xs font-normal">Started by</p>
                        <p className="text-[#DCDCDC] text-2xl font-semibold">Name</p>
                    </div>
                    <p className="text-[#00adf8ab] text-xl font-light">#09</p>

                </div>
                <button type="button"
                    className="w-full   text-[#00B2FF] hover:text-black border border-[#00B2FF] hover:bg-white  font-normal rounded-2xl text-2xl px-5 py-2.5 text-center ">View
                    Collection</button>
                <button type="button"
                    className="w-full   hover:text-black text-white border border-[#00B2FF] bg-[#00B2FF] hover:bg-white  font-medium rounded-2xl text-2xl px-5 py-2.5 text-center ">Place
                    Bid</button>
            </div>

        </div>
    );
}
