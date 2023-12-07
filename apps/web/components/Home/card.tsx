import Image, { ImageProps } from "next/image";

interface CardProps {
  status: Boolean;
  item: Object;
}

export function Card({ status, item }: CardProps) {
  let style = status
    ? "carousel-img-bigger"
    : "carousel-img-smaller md:my-[5px] xl:my-[6px]";
  return <img src="/img/slider-2.jpg" alt="" className={`${style}`} />;
}
