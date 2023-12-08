// import { useAuctionStore } from "@/lib/stores/auction";
import { useAuctionStore } from "@/lib/stores/auction";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ModalComponent from "../ui/Modal";
import AuctionTimer from "./auctionTimer";
import { Card } from "./card";
import truncateMiddle from "truncate-middle";

const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export function Banner() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: false,
    slidesToShow: 5,
    afterChange: (current: any) => {
      setCurrentSlide(current);
    },
  };

  const isMiddleCard = (index: number) => {
    if (
      index == currentSlide + 1 ||
      index == currentSlide + 2 ||
      index == currentSlide + 3
    ) {
      return true;
    } else {
      return false;
    }
  };

  const { loading, auctions, fetchAuctions } = useAuctionStore();

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);


  const sampleHTMLContent = () => {
    return (
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-[#4846A3] bg-clip-border text-white shadow-lg">
              <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                Place You Bid
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-md border border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
                  Enter Amount
                </label>
              </div>
            </div>
            <div className="flex gap-1 p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-buttonColor px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Submit
              </button>
              <button
                className="block w-full select-none rounded-lg bg-buttonColor px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bgGradient pt-24">
      <div>
        <div className="ml-5">
          <div className="mb-2 me-2  inline-flex items-center rounded-[18px] border-gray-200 bg-[#4C4678] px-5 py-2 text-center text-sm font-medium  text-white focus:ring-4">
            <div className="me-4 h-2.5 w-2.5 rounded-full bg-white"></div>
            Trending
            <img src="/img/Trending.png" className="ms-1.5 h-9 w-10" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full overflow-x-hidden">
            <div className="mx-2 w-full">
              <Slider {...settings}>
                {auctions && auctions.length
                  ? auctions.map((item: any, index: number) => (
                    <div key={index} className="px-[10px]">
                      <Card
                        key={index}
                        status={isMiddleCard(index)}
                        item={item}
                      />
                    </div>
                  ))
                  : ""}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-6">
          <AuctionTimer start={1701630717000} end={1702236780000} />
          <h1 className="mb-4 max-w-2xl text-4xl font-normal leading-normal tracking-tight text-heading md:text-5xl ">
            {auctions && auctions.length ? auctions[0]?.nft?.name : ""}
          </h1>
          <p className="max-w-2xl font-normal text-sub md:text-2xl ">
            {auctions && auctions.length
              ? truncateMiddle(auctions[0]?.nft?.collectionAddress, 7, 7, "...")
              : ""}
          </p>
        </div>
        <div className="flex items-end lg:col-span-6 lg:mt-0">
          <div className="mx-auto flex h-fit w-fit flex-col gap-4 md:ml-auto md:mr-0 md:flex-row">
            <div className="flex flex-col items-start gap-0.5 rounded-3xl border border-gray-500 px-8 py-2.5 text-white">
              <p className="text-base">Highest Bid</p>
              <p className="text-3xl font-normal text-heading">0.0015 ETH</p>
            </div>
            <button
              data-ripple-light="true" data-dialog-target="dialog"
              className="h-fit rounded-3xl bg-buttonColor px-16 py-6 text-center text-3xl font-medium text-white shadow-2xl shadow-gray-950/50 hover:bg-blue-800"
              onClick={handleOpen}
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>


      <ModalComponent
        renderHTMLContent={sampleHTMLContent}
        open={open}
      />
    </div>
  );
}
