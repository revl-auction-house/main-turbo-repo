import React from "react";
import Slider from "react-slick";

const settings = {
    centerPadding: "60px",
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1
};

const arr: number[] = [1,2,3,4]

export function EngagedLiveAuction() {
    return (
        <div className="py-5 pb-20 bg-blackBg">
            <div className="mx-auto max-w-custom">
                <p className="text-heading text-[32px] font-medium mb-12">Most engaged Live Auctions </p>
                <div className="h-32 swiper mySwiper">
                    <div className="swiper-wrapper">
                        <Slider {...settings}>
                        {arr.map((item: number) => (
                        <div className="swiper-slide" style={{ height: 'fit-content', width: '20rem' }}>
                            <div>
                                <div className="bg-[#1e1e1e] mr-8 h-fit p-4 w-80 rounded-[27px]">
                                    <div className="relative ">
                                        <div
                                            className="absolute p-2.5 rounded-[63px] bottom-2.5 left-2.5 bg-black/10 border border-white backdrop-blur-sm">
                                            <span className="text-xs font-normal text-white ">Auction ends in : </span>
                                            <span className="text-sm font-semibold text-white ">4:14 min</span>
                                        </div>
                                        <img className="mb-8 object-cover mx-auto h-full w-full max-w-[300px] max-h-[300px] rounded-3xl"
                                            src="/img/monkey.png" alt="" />
                                    </div>
                                    <div className="px-3 space-y-3">
                                        <div className="flex items-center justify-between ">
                                            <div>
                                                <p className="text-[#B6B6B6] text-xs font-normal">Started by</p>
                                                <p className="text-[#DCDCDC] text-2xl font-semibold">Name</p>
                                            </div>
                                        </div>
                                        <button type="button"
                                            className="w-full   hover:text-black text-white border border-[#00B2FF] bg-[#00B2FF] hover:bg-white  font-medium rounded-2xl text-2xl px-5 py-2.5 text-center ">Place
                                            Bid</button>
                                    </div>

                                </div>
                                <div className="bg-[#1E1E1E] w-80 rounded-3xl mt-2 px-6 py-[18px]">
                                    <p className="bidders">600+ Bidders</p>
                                </div>
                            </div>
                        </div>
                        ))}
                        </Slider>

                    </div>
                    {/* <div className="swiper-button-next"></div> */}
                    {/* <div className="swiper-button-prev"></div> */}
                </div>
            </div>
        </div>
    );
}
