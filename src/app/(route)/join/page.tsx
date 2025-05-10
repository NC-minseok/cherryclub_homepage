"use client";

import { useState, useEffect } from "react";
import JoinFormSection from "./_components/JoinFormSection";
import JoinContactSection from "./_components/JoinContactSection";

/**
 * @page JoinPage
 * @description 동아리 가입신청 페이지의 최상위 컴포넌트입니다. 각 섹션을 별도 컴포넌트로 분리하여 가독성과 유지보수성을 높였습니다.
 * @test
 * - 각 섹션 컴포넌트가 정상적으로 렌더링되는지 확인
 * - 마운트 체크가 정상 동작하는지 확인
 */
export default function JoinPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 bg-black z-50"></div>;
  }

  return (
    <div
      className="pt-24 md:pt-28 min-h-screen text-gray-800 overflow-hidden"
      suppressHydrationWarning
    >
      <JoinFormSection />
      <JoinContactSection />
    </div>
  );
}
