"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import useHeroImages from "../../_hook/useHeroImages";

const ANIMATION_CONSTANTS = {
  SECTION_FADE_IN: { duration: 1, delay: 0, ease: "easeIn" },
  TITLE_FADE_IN: { duration: 1.2, delay: 0.3, ease: "easeOut" },
  IMAGE_SCALE: { duration: 2, delay: 0, ease: "easeOut" },
  SWIPER: { delay: 3000, speed: 1500 },
};

const MINISTRIES = ["캠퍼스 5K 무료나눔", "5K 청년밥차", "캠퍼스 주변 5K"];

export default function HeroTitleSection() {
  const ref = useRef(null);
  const { heroImages, isLoading } = useHeroImages();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <AnimatePresence>
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={ANIMATION_CONSTANTS.SECTION_FADE_IN}
        className="relative h-screen overflow-hidden flex items-center"
        suppressHydrationWarning
      >
        {/* 콘텐츠 영역 — 좌측 정렬 */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 px-8 sm:px-16 md:px-24 max-w-5xl"
          suppressHydrationWarning
        >
          {/* 오버라인 레이블 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
            suppressHydrationWarning
          >
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
              5k Movement
            </span>
          </motion.div>

          {/* 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ANIMATION_CONSTANTS.TITLE_FADE_IN}
            className="text-6xl sm:text-7xl md:text-[9rem] font-extrabold text-white mb-6 tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(0,100,255,0.6)]"
            suppressHydrationWarning
          >
            5K운동
            <br />
            이란?
          </motion.h1>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-8"
            suppressHydrationWarning
          >
            내가 속한 가정과 직장, 반경 5Km 안의 절대 필요가 있는 이웃들에게
            예수님의 4대 사역을 펼치며 한국 교회의 부흥과 통일 한국을 이루어
            열방을 섬기는 코리아가 되게 하는 하나님의 약속이 있는 사역입니다.
          </motion.p>

          {/* 4대 사역 뱃지 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="flex flex-wrap gap-2"
            suppressHydrationWarning
          >
            {MINISTRIES.map((ministry, i) => (
              <motion.span
                key={ministry}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                className="px-4 py-1.5 rounded-full border border-blue-400/50 text-blue-200 text-sm font-medium backdrop-blur-sm bg-blue-950/30"
              >
                {ministry}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          suppressHydrationWarning
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>

        {/* 그라디언트 오버레이 — 좌측 강조 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 z-0" />

        {/* Swiper 이미지 슬라이더 */}
        <div className="absolute inset-0 z-[-1]">
          {!isLoading && heroImages.length > 0 && (
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{
                delay: ANIMATION_CONSTANTS.SWIPER.delay,
                disableOnInteraction: false,
              }}
              speed={ANIMATION_CONSTANTS.SWIPER.speed}
              loop={true}
              className="w-full h-full"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={ANIMATION_CONSTANTS.IMAGE_SCALE}
                    className="w-full h-full"
                    suppressHydrationWarning
                  >
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjY2NjYyIvPjwvc3ZnPg=="
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
