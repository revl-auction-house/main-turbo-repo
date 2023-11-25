"use client";


const arr: number[] = [1, 2, 3, 4, 5, 6,7]
export default function MyAuction() {

  return (
    <>
      <div className="relative flex h-16 bg-[#060606]">
        <div className="flex-grow w-10 h-full translate-y-2 rounded-br-lg bg-[#060606]"></div>
        <form className="relative flex items-center w-full max-w-lg px-2 py-2 translate-y-1/2 rounded-lg h-fit bg-[#13181D]">
          <input type="text" id="search"
            className="bg-[#ffffff1a] shadow-lg shadow-gray-950/50 flex-grow m-0.5 border-none  text-white text-xl rounded-lg focus:ring-white focus:border-white block w-full p-5 placeholder-gray-400 "
            placeholder="Search anything....." required />
          <div className="m-0.5 ml-2 "><button type="button"
            className="inline-flex items-center p-5 text-sm font-medium text-center text-white hover:text-black rounded-lg shadow-lg shadow-gray-950/50 bg-[#ffffff1a] hover:bg-white focus:outline-none focus:ring-blue-300 ">
            <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button></div>
        </form>
        <div className="flex-grow w-10 h-full translate-y-2 rounded-bl-lg bg-[#060606]"></div>
      </div>

      <section className="p-2 bg-blackBg">
        <div className="w-full  mx-auto max-w-custom  bg-gradient-to-t rounded-b-[52px] from-[#00B2FF] from-0% p-0.5">
          <div className="w-full    md:px-[90px] h-full bg-[#13181D] pt-20 rounded-b-[52px] ">
            <p className="mt-16 mb-5 text-5xl font-medium text-center mx-14 text-heading">Let the Bidding Begin: Unleash the</p>
            <p className="mb-20 text-5xl font-medium text-center mx-14 text-heading">NFT Excitement</p>
            <p className="mx-auto mb-8 text-2xl text-center text-heading">Please select the type</p>
            <div>
              <div className="grid md:gap-x-5 mb-16 md:grid-cols-3 bg-[#1e1e1e47] px-6 py-4 rounded-[32px] "
                style={{ boxShadow: '0px -7px 25px 0px rgba(0, 0, 0, 0.40)' }}>
                <div
                  className="bg-[#5c5c5c1a] transition ease-in-out  text-white hover:text-black  hover:bg-white backdrop-blur-lg p-6 rounded-[19px] min-h-[227px] flex flex-col items-center justify-center">
                  <p className=" text-[32px] text-center font-medium mb-8 ">English</p>
                  <p className="text-[#8D8D8D] text-center text-base font-normal">Unlock hidden treasures with sealed bids.</p>
                </div>
                <div
                  className="bg-[#5c5c5c1a]  transition ease-in-out  text-white hover:text-black  hover:bg-white backdrop-blur-lg p-6 rounded-[19px] min-h-[227px] flex flex-col items-center justify-center">
                  <p className=" text-[32px] text-center font-medium mb-8 ">Sealed</p>
                  <p className="text-[#8D8D8D] text-center text-base font-normal">Bid openly, win boldly in English auctions.
                  </p>
                </div>
                <div
                  className="bg-[#5c5c5c1a]  transition ease-in-out  text-white hover:text-black  hover:bg-white backdrop-blur-lg p-6 rounded-[19px] min-h-[227px] flex flex-col items-center justify-center">
                  <p className=" text-[32px] text-center font-medium mb-8 ">Dutch</p>
                  <p className="text-[#8D8D8D] text-center text-base font-normal">Dive into Dutch auctions, where prices drop,
                    and winners rise.</p>
                </div>
              </div>
            </div>
            <button
              className="shadow-[#606060]/40  shadow-lg block md:px-16 px-8 py-4 mx-auto text-[32px]  font-medium text-white translate-y-1/2 w-fit bg-[#606060] rounded-[20px]">Start
              Auction</button>
          </div>
        </div>
      </section>

      <section className="bg-[#13181D] pt-[117px] pb-[61px]">
        <div className="mx-auto max-w-custom">
          <p className="text-5xl font-medium text-heading mb-14">Your recent auction</p>
          <div className="grid md:grid-cols-12 md:gap-x-5">
            <div className="md:col-span-7">
              <div className="flex space-x-6 bg-[#0B0F10] px-4 py-5 rounded-[60px]">
                <img src="/img/stone.png" className="w-[316px] h-[316px] rounded-[50px]" alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-[#636363] font-normal text-2xl ">Highest Bid</p>
                    <p className="text-[#00FF38] text-[70px] font-semibold ">0.015 <span className="text-[40px]">ETH </span> </p>
                  </div>
                  <div>
                    <p className="text-[#D9D9D9] font-medium text-xl ">NFT name</p>
                    <p className="text-[#9A9A9A] font-normal text-xl">Sold to</p>
                  </div>
                  <div className="flex items-center border border-[#00b2ff4d] w-fit px-6 py-2.5 rounded-[28px]">
                    <p className="text-[#7D7A7A] text-xs font-normal">Ends in </p>
                    <p className="ml-2 text-base font-medium text-buttonColor">6:49 mins</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0B0F10] mt-10 rounded-[45px] px-[52px] py-9">
                <p className="text-[#636363] text-xl font-medium mb-4">Stats</p>
                <div className="grid grid-cols-2">
                  <div className="space-y-[15px]">
                    <div>
                      <p className="text-[#969696] text-base font-medium mb-8">Auction Type</p>
                      <p className="text-xl font-semibold text-buttonColor">Sealed Bid</p>
                    </div>
                    <div className="h-[2px] "
                      style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)' }}>
                    </div>
                    <div>
                      <p className="mb-8 text-5xl font-semibold text-buttonColor">0.0016 <span className="text-base">ETH</span></p>
                      <p className="text-[#969696] text-base font-medium">You bought for</p>
                    </div>
                    <div className="h-[2px] "
                      style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)' }}>
                    </div>
                    <div>
                      <p className="mb-3.5 text-[#969696] text-base font-medium">Auction Duration</p>
                      <p className="text-2xl font-semibold text-buttonColor ">22:03 hrs</p>
                    </div>
                  </div>
                  <div
                    className="rounded-[23px] bg-[#e3e3ff0a] backdrop-blur-xl px-[34px] py-[27px] space-y-[18px] text-center">
                    <div>
                      <p className="text-[#969696] text-base font-semibold mb-3.5">Average Bid</p>
                      <p className="text-2xl font-semibold text-buttonColor">0.068 ETH</p>
                    </div>
                    <div className="h-[2px] "
                      style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)' }}>
                    </div>
                    <div>
                      <p className="text-[#969696] text-base font-semibold mb-3.5">
                        Participators
                      </p>
                      <p className="text-2xl font-semibold text-buttonColor">97 Bidders</p>
                    </div>
                    <div className="h-[2px] "
                      style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 178, 255, 0.20) 51.11%, rgba(255, 255, 255, 0.00) 100%)' }}>
                    </div>
                    <div>

                      <p className="text-[#969696] text-base font-semibold mb-3.5">Starting price</p>
                      <p className="text-2xl font-semibold text-buttonColor">0.00016ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" md:col-span-5">
              <div className=" bg-[#0B0F10] p-4 rounded-[32px] h-full">
                <div className="flex items-center justify-between mx-3 mb-5">
                  <p className="text-[#636363] text-xl font-medium">Auction History</p>
                  <img src="/img/Filter icopn.svg" className="w-auto h-5 " alt="" />
                </div>
                <div className="space-y-5">
                  {arr.map((item => (
                    <div className="bg-[#20383B] border border-buttonColor p-2.5 rounded-[22px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src="/img/stone.png" className="h-[67px] w-[67px] rounded-[10px] " alt="" />
                          <div className="ml-1.5 space-y-1">
                            <p className="text-base font-semibold text-white">NFT Name</p>
                            <div className="flex items-center">
                              <div className=" mr-2.5  w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                              <p className="text-[#AEAEAE] text-xs font-medium">Live for auction</p>
                            </div>
                            <p className="text-[#727272] text-[10px] font-normal">Auction type: Sealed</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[#7D7A7A] text-xs font-normal">Ends in</p>
                          <p className="text-base font-medium text-buttonColor">6:49 mins</p>
                        </div>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
