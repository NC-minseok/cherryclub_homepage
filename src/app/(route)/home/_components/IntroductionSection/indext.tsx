"use client";

import { useState, useEffect } from "react";
import { isMobileWeb } from "@toss/utils";
import {
  AnimatedTitle,
  AnimatedTitleDescription,
} from "@/src/shared/components";
import { cards } from "../../_data/IntrodeuctionData";
import IntroductionCard from "./IntroductionCard";
import SectionTag from "../SectionTag";

// 모바일 감지 훅
// TODO: 전체상태 관리로 추후 분리
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileWeb());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// 메인 컴포넌트
export default function IntroductionSection() {
  const isMobile = useMobileDetection();

  const TITLE_DESCRIPTION_TEXT = isMobile
    ? `체리 동아리를 소개합니다!\n체리는 <span class="text-blue-600 font-bold">체인저 리더십</span>의 줄임말입니다. \n체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고, 내가 속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!`
    : `체리 동아리를 소개합니다!\n 체리는 <span class="text-blue-600 font-bold">체인저 리더십</span>의 줄임말입니다.\n체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고,\n내가 속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!`;

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center justify-center">
            <SectionTag text="체리 동아리를 소개" />
            <AnimatedTitle text="체리 동아리를 소개합니다!" />
          </div>

          <AnimatedTitleDescription
            isMobile={isMobile}
            description={TITLE_DESCRIPTION_TEXT}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-x-6 md:gap-y-8 mb-16 sm:mb-20 place-items-center px-6 sm:px-0">
          {cards.map((card, index) => (
            <IntroductionCard
              key={card.id}
              card={card}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
