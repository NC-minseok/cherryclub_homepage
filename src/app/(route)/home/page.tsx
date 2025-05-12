"use client";

import { useState, useEffect } from "react";
import HeroTitleSection from "./_components/HeroTitleSection";
import IntroductionSection from "./_components/IntroductionSection/indext";
import StatusSection from "./_components/StatusSection";
import CTASection from "./_components/CTASection";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 측에서만 실행되도록 마운트 상태 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 마운트되지 않은 경우 블랙 스크린 표시
  if (!isMounted) {
    return <div className="fixed inset-0 bg-black z-50"></div>;
  }

  return (
    <div
      className="min-h-screen text-gray-800 overflow-hidden"
      suppressHydrationWarning
    >
      <HeroTitleSection />
      <IntroductionSection />
      <StatusSection />
      <CTASection />
    </div>
  );
}
