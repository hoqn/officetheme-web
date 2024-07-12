import { type ClassValue, clsx } from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

// LocalStorage state
export function usePersistentState<S>(defaultValue: S, key: string): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(() => {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) as S : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
