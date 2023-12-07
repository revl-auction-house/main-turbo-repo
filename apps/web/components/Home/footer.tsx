export function Footer() {
  return (
    <footer className=" bg-blackBg py-44">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 gap-8 px-4 py-6 md:grid-cols-3 lg:py-8">
          <div>
            <h2 className="mb-8 text-5xl font-medium text-white">Logo</h2>
            <ul className="text-2xl font-normal text-[#8E8E8E]">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Address{" "}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[32px] font-semibold text-[#F6F6F6] ">
              Quick links
            </h2>
            <ul className="grid grid-cols-2 gap-y-[26px] text-2xl font-normal text-[#8E8E8E] ">
              <li className="">
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  Privacy policy
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  Cookie policy
                </a>
              </li>
              <li className="md:col-span-2">
                <a href="#" className="hover:underline">
                  Token
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-12 text-lg font-semibold text-[#F6F6F6]">
              Join our community
            </h2>
            <ul className="grid grid-cols-4 gap-y-14">
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Linkedin.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Discord.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Twitter.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Instagram.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Youtube.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Twitch.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Tik tok.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:underline">
                  <img
                    src="/img/Facebook.png"
                    alt=""
                    className="h-[60px] w-[60px] object-cover"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
