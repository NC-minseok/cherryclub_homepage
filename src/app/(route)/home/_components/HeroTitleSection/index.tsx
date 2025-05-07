"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

// Swiper 스타일 불러오기
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Intro from "./Intro";
import { getCookie } from "cookies-next";
import useHeroImages from "../../_hook/useHeroImages";

// 애니메이션 상수
const ANIMATION_CONSTANTS = {
  SECTION_FADE_IN: {
    duration: 1.5,
    delay: 3.5,
    ease: "easeIn",
  },
  SECTION_FADE_IN_DIRECT: {
    duration: 1,
    delay: 0,
    ease: "easeIn",
  },
  TITLE_FADE_IN: {
    duration: 1.2,
    delay: 4,
    ease: "easeOut",
  },
  TITLE_FADE_IN_DIRECT: {
    duration: 1.2,
    delay: 0.2,
    ease: "easeOut",
  },
  IMAGE_SCALE: {
    duration: 3,
    delay: 3.5,
    ease: "easeOut",
  },
  IMAGE_SCALE_DIRECT: {
    duration: 2,
    delay: 0,
    ease: "easeOut",
  },
  SWIPER: {
    delay: 5000,
    speed: 1500,
  },
};

export default function HeroTitleSection() {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { heroImages, isLoading } = useHeroImages();

  // 클라이언트 측에서만 실행되도록 마운트 상태 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!isMounted) return null;

  const isLoaded = getCookie("isLoaded");

  // isLoaded 상태에 따라 애니메이션 설정 선택
  const sectionAnimation = isLoaded
    ? ANIMATION_CONSTANTS.SECTION_FADE_IN_DIRECT
    : ANIMATION_CONSTANTS.SECTION_FADE_IN;
  const titleAnimation = isLoaded
    ? ANIMATION_CONSTANTS.TITLE_FADE_IN_DIRECT
    : ANIMATION_CONSTANTS.TITLE_FADE_IN;
  const imageAnimation = isLoaded
    ? ANIMATION_CONSTANTS.IMAGE_SCALE_DIRECT
    : ANIMATION_CONSTANTS.IMAGE_SCALE;

  return (
    <>
      {!isLoaded && <Intro />}
      <AnimatePresence>
        <motion.section
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={sectionAnimation}
          className="relative h-screen overflow-hidden flex items-center justify-center"
          suppressHydrationWarning
        >
          {/* 콘텐츠 영역 */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            suppressHydrationWarning
          >
            <AnimatePresence>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={titleAnimation}
                className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)] bg-clip-text"
                suppressHydrationWarning
              >
                CHERRY CLUB
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          {/* 어두운 오버레이 - 항상 표시 */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

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
                      transition={imageAnimation}
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
    </>
  );
}
