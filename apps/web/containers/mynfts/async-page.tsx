"use client";


const arr: number[] = [1, 2, 3, 4,5,6]
export default function MyNfts() {

  return (
    <>
      <div className="relative flex h-16 bg-[#060606]">
        <div className="flex-grow w-10 h-full translate-y-2 rounded-br-lg bg-[#060606]"></div>
        <form className="relative flex items-center w-full max-w-lg px-2 py-2 translate-y-1/2 rounded-lg h-fit bg-blackBg">


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
      <div className="bg-[#0D0D0D] pt-24">
        <div className="mx-auto max-w-custom ">
          <p className="mx-auto mt-10 text-5xl font-medium text-center mb-14 text-heading">Your amazing collections !</p>
          <div className="grid gap-10 mx-auto max-w-custom md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {arr.map((item: number) => (
              <div className="relative pt-12 w-80">
                <div
                  className="absolute z-10 -translate-y-1/2 w-full  flex items-center justify-center bg-[#5c5c5c1a] rounded-[20px] backdrop-blur-lg px-7 py-[18px]">
                  <div className="text-center">
                    <p className="mx-auto text-2xl text-[#DDD] font-semibold ">NFT Name</p>
                    <p className="mx-auto text-[#929292] text-base font-normal">by Artist Name</p>
                  </div>
                </div>
                <div className="w-[310px] h-[310px] mx-auto px-3 relative">
                  <img className="object-cover w-full h-full mx-auto rounded-3xl" src="/img/cyberCat.png" alt="" />
                </div>
                <div className="space-y-2 p-1.5 rounded-[22px] bg-[#1e1e1e47] backdrop-blur-lg -mt-5">
                  <div className="flex items-center justify-between bg-[#5c5c5c1a] rounded-2xl backdrop-blur-lg px-7 py-2.5">
                    <div className="text-center">
                      <p className="text-[#929292] text-base font-normal">Bought for </p>
                      <p className="text-[#DDD] text-2xl font-semibold">0.0016ETH</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#DDD] text-2xl font-semibold">#9</p>
                      <p className="text-[#929292]  text-base font-normal">Mint number</p>
                    </div>
                  </div>
                  <button type="button"
                    className="w-full   hover:text-black text-white border border-[#00B2FF] bg-[#00B2FF] hover:bg-white  font-semibold rounded-2xl text-2xl px-5 py-6 text-center ">Start
                    Auction</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
