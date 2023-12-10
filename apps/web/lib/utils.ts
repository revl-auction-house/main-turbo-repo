import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(timestamp: number): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - timestamp;

  const days = Math.floor(timeDifference / (60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (60 * 60 * 24)) / (60 * 60),
  );
  const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
  if (days > 0) {
    return `${days} D : ${hours} H : ${minutes} M`;
  } else if (hours > 0) {
    return `${hours} H : ${minutes} M`
  } else if (minutes > 0) {
    return `${minutes} M`
  } else {
    return 'Just Now';
  }
}

