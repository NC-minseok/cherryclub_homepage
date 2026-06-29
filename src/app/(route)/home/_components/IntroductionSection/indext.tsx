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
    ? `5K운동은 내가 속한(가정, 직장) 반경 <span class="text-red-600 font-bold">5Km</span> 안의 절대 필요가 있는 이웃들에게  <span class="text-red-600 font-bold">예수님의 4대 사역</span>(구제 사역, 교육사역, 보건의료 사역, 복음전파 사역)을 펼치는 것으로, 한국 교회의 부흥과 통일 한국을 이루어 열방을 섬기는 코리아가 되게 하는 하나님의 약속이 있는 사역입니다.`
    : `5K운동은 내가 속한(가정, 직장) 반경 <span class="text-red-600 font-bold">5Km</span> 안의 절대 필요가 있는 이웃들에게  <span class="text-red-600 font-bold">예수님의 4대 사역</span>(구제 사역, 교육사역, 보건의료 사역, 복음전파 사역)을 펼치는 것으로, 한국 교회의 부흥과 통일 한국을 이루어 열방을 섬기는 코리아가 되게 하는 하나님의 약속이 있는 사역입니다.`;

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center">
          <SectionTag text="활동 사진" />
          <AnimatedTitle text="5K운동을 주도하는 캠퍼스" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-16 sm:mb-20 place-items-center px-6 sm:px-0 max-w-2xl mx-auto">
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
