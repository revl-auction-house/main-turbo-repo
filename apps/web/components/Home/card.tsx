import Image, { ImageProps } from "next/image";

interface CardProps {
  status: Boolean;
}

export function Card({ status }: CardProps) {
  let width = status ? 250 : 170;
  return (
    <div className="swiper-slide" style={{ width: width }}>
      <div className="card">
        <Image
          className="object-cover w-full h-full"
          src="/img/stone.png"
          width={width}
          height={200}
          alt=""
          srcSet=""
        />
      </div>
    </div>
  );
}
