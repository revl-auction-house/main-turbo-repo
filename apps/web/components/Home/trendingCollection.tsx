import Image from "next/image";

const arr: number[] = [1, 2, 3, 4,5,6]
export function TrendingCollection() {
    return (
        <div className="py-5 pb-20 bg-blackBg">
            <p className="mx-auto mb-12 text-5xl font-medium text-heading max-w-custom">
                Trending collection
            </p>
            <div className="border border-[#fff5f51c] pt-28 max-w-[1249px] mx-auto rounded-[85px]">
                <div className="grid gap-10 mx-auto max-w-custom md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {arr.map((item: number) => (
                        <div className="w-80">
                            <div className="w-[310px] h-[310px] relative">
                                <div
                                    className="absolute right-3 top-3 flex items-center px-5 py-2 border border-white w-fit rounded-[63px] bg-white/30 backdrop-blur-sm">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2.5"></div>
                                    <p className="text-xs font-medium text-white">Live for auction</p>
                                </div>
                                <img className="object-cover w-full h-full rounded-3xl" src="/img/cyberCat.png  " alt="" srcset="" />
                            </div>
                            <div className="space-y-2 p-1.5 rounded-[22px] bg-[#1e1e1e47] backdrop-blur-lg -mt-5">
                                <div
                                    className="flex items-center justify-between bg-[#5c5c5c1a] rounded-[20px] backdrop-blur-lg px-7 py-[18px]">
                                    <div>

                                        <p className="text-2xl text-[#DDD] font-semibold">Collection name</p>
                                        <p className="text-[#929292] text-base font-normal">by Artist Name</p>
                                    </div>
                                    <img src="/img/heart.svg" alt="" className="w-auto h-6" />
                                </div>
                                <div className="flex items-center justify-between bg-[#5c5c5c1a] rounded-2xl backdrop-blur-lg px-7 py-2.5">
                                    <div>
                                        <p className="text-[#929292] text-base font-normal">Floor</p>
                                        <p className="text-[#B8B8B8] text-xl font-normal">0.00067 ETH</p>
                                    </div>
                                    <div>
                                        <p className="text-[#929292] text-base font-normal">Total volume</p>
                                        <p className="text-[#B8B8B8] text-right text-xl font-normal">34 ETH</p>
                                    </div>
                                </div>
                                <button type="button"
                                    className="w-full   hover:text-black text-white border border-[#00B2FF] bg-[#00B2FF] hover:bg-white  font-medium rounded-2xl text-2xl px-5 py-2.5 text-center ">Place
                                    Bid</button>
                            </div>
                        </div>
                    ))}
                </div>
                <p
                    className="mt-32 bg-blackBg rounded-[52px] border border-[#9F9F9F] w-fit px-8 py-4 text-white text-2xl font-normal translate-y-1/2 mx-auto">
                    See more</p>
            </div>

        </div>
    );
}
