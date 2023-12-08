
import Image from "next/image";

interface NFT {
  imgUrl: string;
}

interface CardProps {
  status: Boolean;
  item: {
    nft?: NFT;
  };
}

export function Card({ status, item }: CardProps) {

  let styles = status
    ? "carousel-img-bigger"
    : "carousel-img-smaller md:my-[5px] xl:my-[6px]";
  return <Image src={item?.nft?.imgUrl} width={200} height={300} alt="" className={`${styles}`} />;
}
