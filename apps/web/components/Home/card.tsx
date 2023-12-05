import Image, { ImageProps } from "next/image";

interface CardProps {
  status: Boolean;
}

export function Card({ status }: CardProps) {
  let style = status ? 'carousel-img-bigger' : 'carousel-img-smaller my-[5px]';
  return (
    <img src="/img/slider-2.jpg" alt="" className={`${style}`} />
  );
}
