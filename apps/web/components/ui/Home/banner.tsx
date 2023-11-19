import Image from "next/image";
import { Card } from "./card";

export function Banner() {
    return (
        <div className="pt-24 bgGradient">
            <div>
                <div className="ml-5">
                    <div type="button"
                        className="text-white bg-gray-100/40  border-gray-200 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2">
                        <div className="w-2 h-2 bg-white rounded-full me-4"></div>
                        Trending
                        <svg className="w-6 h-6 text-red-500 ms-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 17 20">
                            <path
                                d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                        </svg>
                    </div>
                </div>
                <div className="swiper-container ">
                    <div className="swiper-wrapper">
                        <Card />
                    </div>
                </div>
            </div>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-6">
                    <div className="relative mb-5 w-fit rounded-2xl border-2 border-[#605D96] overflow-hidden">
                        <div className="absolute  h-full bg-[#605D96] " style={{ width: '80%' }}></div>
                        <p className="relative z-10 m-4 text-base font-medium text-heading">Time left - 10:06 min</p>
                    </div>
                    <h1 className="max-w-2xl mb-4 text-4xl font-normal leading-normal tracking-tight text-heading md:text-5xl ">
                        The Bored Ape</h1>
                    <p className="max-w-2xl font-normal text-sub md:text-2xl ">by Artist name</p>

                </div>
                <div className="flex items-end lg:mt-0 lg:col-span-6">
                    <div className="flex flex-col gap-4 mx-auto h-fit md:flex-row md:ml-auto md:mr-0 w-fit">
                        <div className="border border-gray-500 px-8 py-2.5 flex flex-col items-start gap-0.5 rounded-3xl text-white">
                            <p className="text-base">Highest Bid</p>
                            <p className="text-3xl font-normal text-heading">0.0015 ETH</p>
                        </div>
                        <button
                            className="px-16 py-6 text-3xl font-medium text-center text-white shadow-2xl rounded-3xl shadow-gray-950/50 bg-buttonColor h-fit hover:bg-blue-800">
                            Place Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
