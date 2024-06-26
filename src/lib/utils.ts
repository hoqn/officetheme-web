import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 한글 조사 판단
export function concatJosa(word: string, i: string, ga: "가" | string) {
  const lastChar = word.charCodeAt(word.length - 1);
  const consonant = (lastChar - 44032) % 28;

  if (consonant) {
    // 끝소리 있음
    return `${word}${i}`;
  } else {
    // 끝소리 없음
    return `${word}${ga}`;
  }
}
