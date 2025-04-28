"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  value: number | string;
  isInView: boolean;
}

export default function StatCounter({ value, isInView }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = Number(value);

    // 숫자가 아닌 경우 처리
    if (isNaN(end)) return;

    // 카운팅 속도 조절
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => {
      clearInterval(timer);
    };
  }, [value, isInView]);

  // 퍼센트 표시 추가
  return (
    <>{typeof value === "number" && value !== 127 ? count : count + "%"}</>
  );
}
