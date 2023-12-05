// import { useAuctionStore } from "@/lib/stores/auction";
import { useAuctionStore } from "@/lib/stores/auction";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ModalComponent from "../ui/Modal";
import AuctionTimer from "./auctionTimer";
import { Card } from "./card";

const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
        if (index == (currentSlide + 1) || index == (currentSlide + 2) || index == (currentSlide + 3)) {
            return true;
        } else {
            return false;
        }
    }

    const { loading, auctions, fetchAuctions } = useAuctionStore();

    useEffect(() => {
        fetchAuctions();
    }, [fetchAuctions]);

    console.log(auctions, "auctions")



    const sampleHTMLContent = () => {
        return (
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                <div
                    className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                    <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                        Place You Bid
                    </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Enter Amount
                        </label>
                    </div>

                </div>
                <div className="p-6 pt-0">
                    <button
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Submit
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="pt-24 bgGradient">
            <div>
                <div className="ml-5">
                    <div className="text-white bg-[#4C4678]  border-gray-200 focus:ring-4 font-medium rounded-[18px] text-sm px-5 py-2 text-center inline-flex items-center  me-2 mb-2">
                        <div className="w-2.5 h-2.5 bg-white rounded-full me-4"></div>
                        Trending
                        <img src="/img/Trending.png" className="w-10 ms-1.5 h-9" alt="" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="mx-5 w-full">
                        <Slider {...settings}>
                            {arr.map((item: any, index: number) => (
                                <Card key={index} status={isMiddleCard(index)} />
                            ))}

                        </Slider>
                    </div>
                </div>
            </div>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-6">
                    <AuctionTimer start={1701630717000} end={1700717807000} />
                    <h1 className="max-w-2xl mb-4 text-4xl font-normal leading-normal tracking-tight text-heading md:text-5xl ">
                        {auctions && auctions.length ? auctions[0]?.nft?.name : ""}
                    </h1>
                    <p className="max-w-2xl font-normal text-sub md:text-2xl ">
                        by Artist name
                    </p>
                </div>
                <div className="flex items-end lg:mt-0 lg:col-span-6">
                    <div className="flex flex-col gap-4 mx-auto h-fit md:flex-row md:ml-auto md:mr-0 w-fit">
                        <div className="border border-gray-500 px-8 py-2.5 flex flex-col items-start gap-0.5 rounded-3xl text-white">
                            <p className="text-base">Highest Bid</p>
                            <p className="text-3xl font-normal text-heading">0.0015 ETH</p>
                        </div>
                        <button
                            className="px-16 py-6 text-3xl font-medium text-center text-white shadow-2xl rounded-3xl shadow-gray-950/50 bg-buttonColor h-fit hover:bg-blue-800"
                            onClick={handleOpen}
                        >
                            Place Bid
                        </button>
                    </div>
                </div>
            </div>

            <ModalComponent renderHTMLContent={sampleHTMLContent} open={open} handleClose={handleClose} />
        </div>
    );
}
