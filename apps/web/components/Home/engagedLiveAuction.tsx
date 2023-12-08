import React from "react";
import Slider from "react-slick";

const settings = {
  centerPadding: "60px",
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const arr: number[] = [1, 2, 3, 4];

export function EngagedLiveAuction() {
  return (
    <div className="bg-blackBg py-5 pb-20">
      <div className="mx-auto max-w-custom">
        <p className="mb-12 text-[32px] font-medium text-heading">
          Most engaged Live Auctions{" "}
        </p>
        <div className="swiper mySwiper h-32">
          <div className="swiper-wrapper">
            <Slider {...settings}>
              {arr.map((item: number, index: number) => (
                <div
                  className="swiper-slide"
                  style={{ height: "fit-content", width: "20rem" }}
                  key={index}
                >
                  <div>
                    <div className="mr-8 h-fit w-80 rounded-[27px] bg-[#1e1e1e] p-4">
                      <div className="relative ">
                        <div className="absolute bottom-2.5 left-2.5 rounded-[63px] border border-white bg-black/10 p-2.5 backdrop-blur-sm">
                          <span className="text-xs font-normal text-white ">
                            Auction ends in :{" "}
                          </span>
                          <span className="text-sm font-semibold text-white ">
                            4:14 min
                          </span>
                        </div>
                        <img
                          className="mx-auto mb-8 h-full max-h-[300px] w-full max-w-[300px] rounded-3xl object-cover"
                          src="/img/monkey.png"
                          alt=""
                        />
                      </div>
                      <div className="space-y-3 px-3">
                        <div className="flex items-center justify-between ">
                          <div>
                            <p className="text-xs font-normal text-[#B6B6B6]">
                              Started by
                            </p>
                            <p className="text-2xl font-semibold text-[#DCDCDC]">
                              Name
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
                    <div className="mt-2 w-80 rounded-3xl bg-[#1E1E1E] px-6 py-[18px]">
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
