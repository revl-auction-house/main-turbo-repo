import Image from "next/image";

  export function Card() {
    return (
        <div className="swiper-slide">
        <div className="card">
            <Image className="object-cover w-full h-full" src="/img/slider-1.jpg" width={100} height={100} alt="" srcset="" />
        </div>
    </div>
    );
  }
  