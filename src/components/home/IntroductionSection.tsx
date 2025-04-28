"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cards } from "@/src/data/home";
import { CardData } from "@/src/types/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroductionSection() {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 슬라이더 설정
  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand" as const,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animations = gsap.context(() => {
      // 스크롤 애니메이션
      gsap.utils.toArray(".gsap-fade-in").forEach((element: any, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // 화면 크기 감지 함수
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    return () => {
      animations.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 카드 렌더링 함수
  const renderCard = (card: CardData, index: number) => {
    return (
      <motion.div
        key={card.id}
        className={`gsap-fade-in group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 flex flex-col mx-2 ${
          isMobile ? "min-w-full h-[500px]" : ""
        }`}
        whileHover={
          isMobile
            ? undefined
            : {
                y: -8,
                transition: { duration: 0.3 },
              }
        }
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={`absolute -right-20 -top-20 w-40 h-40 ${card.bgColor1} rounded-full opacity-30`}
        ></div>

        <div className="relative h-52 sm:h-64 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-lg">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full">
            <span className="text-blue-700 font-semibold text-xs sm:text-sm">
              {card.tag}
            </span>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm mr-2 sm:mr-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {card.title}
        </h3>
        <div className="overflow-hidden mb-4 h-[160px]">
          {card.descriptions.map((desc: string, i: number) => (
            <p
              key={i}
              className="text-sm sm:text-base text-gray-600 mb-2"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {desc}
            </p>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6">
          <Link
            href={card.link}
            className="touch-manipulation inline-flex items-center text-blue-600 font-medium text-base hover:text-blue-500 transition-colors group-hover:underline active:text-blue-700"
          >
            자세히 알아보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 ml-2 transition-transform group-hover:translate-x-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-24">
          <div className="inline-block mb-3 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600/10 rounded-full">
            <span className="text-blue-700 font-semibold text-sm sm:text-base">
              체리 동아리 소개
            </span>
          </div>
          <motion.h1
            className="text-black text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-4 gsap-fade-in bg-clip-text  tracking-tight leading-tight "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            체리 동아리를 소개합니다
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className={`${
              isMobile ? "text-base" : "text-lg sm:text-xl md:text-2xl"
            } mx-auto gsap-fade-in leading-relaxed font-medium text-left whitespace-pre-line break-words hyphens-auto max-w-2xl px-2`}
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            {isMobile ? (
              <>
                체리는{" "}
                <span className="text-blue-600 font-bold">체인저 리더십</span>의
                줄임말입니다.{"\n"}
                체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고, 내가
                속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!
              </>
            ) : (
              <>
                체리는{" "}
                <span className="text-blue-600 font-bold">체인저 리더십</span>의
                줄임말입니다.{"\n"}
                체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고,{"\n"}
                내가 속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!
              </>
            )}
          </motion.h2>
        </div>

        {/* 모바일에서는 슬라이더, 그 외에서는 그리드 레이아웃 사용 */}
        {isMobile ? (
          <div className="mb-16 sm:mb-20 px-2">
            <Slider ref={sliderRef} {...sliderSettings}>
              {cards.map(renderCard)}
            </Slider>
            {/* 캐러셀 인디케이터 */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {cards.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentSlide === index ? "bg-blue-600 w-6" : "bg-blue-200"
                    }`}
                    animate={{
                      width: currentSlide === index ? 24 : 10,
                      backgroundColor:
                        currentSlide === index
                          ? "rgb(37, 99, 235)"
                          : "rgb(219, 234, 254)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-x-6 md:gap-y-8 mb-16 sm:mb-20">
            {cards.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
}
