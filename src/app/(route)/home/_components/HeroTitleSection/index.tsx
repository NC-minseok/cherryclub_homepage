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
import { setCookie, getCookie } from "cookies-next";
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

// 인트로 애니메이션 타이밍 상수
const INTRO_TIMING = {
  STEP_1_DURATION: 1000, // 첫 번째 단계 지속 시간 (ms)
  FADE_START: 3300, // 페이드 아웃 시작 시간 (ms)
  COMPLETE_TIME: 4000, // 인트로 완료 시간 (ms)
  FADE_OUT_DURATION: 700, // 페이드 아웃 애니메이션 지속 시간 (ms)
  COOKIE_MAX_AGE: 600, // 쿠키 유지 시간 (10분, 초 단위)
};

// SVG 애니메이션 상수
const SVG_ANIMATION = {
  WIDTH: 600,
  HEIGHT: 600,
  VIEW_BOX: "0 0 200 200",
  DURATION: 10,
  SCALE: [1, 1.2, 1],
  ROTATE: [0, 5, 0, -5, 0],
};

export default function HeroTitleSection() {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [welcomeStep, setWelcomeStep] = useState(1);
  const [isFadingIntro, setIsFadingIntro] = useState(false);

  const { heroImages, isLoading } = useHeroImages();

  // 클라이언트 측에서만 실행되도록 마운트 상태 설정
  useEffect(() => {
    setIsMounted(true);

    // 쿠키 확인해서 인트로를 보여줄지 결정
    const loadedCookie = getCookie("isLoaded");
    if (loadedCookie === "true") {
      setIsLoaded(true);
      setShowIntro(false);
    }
  }, []);

  // 인트로 애니메이션 효과 처리
  useEffect(() => {
    if (!isMounted || isLoaded) return;

    // 환영 메시지 단계별 표시
    const step1Timer = setTimeout(() => {
      setWelcomeStep(2);
    }, INTRO_TIMING.STEP_1_DURATION);

    const fadeTimer = setTimeout(() => {
      setIsFadingIntro(true);
    }, INTRO_TIMING.FADE_START);

    const completeTimer = setTimeout(() => {
      // 인트로 애니메이션 완료 후 메인 콘텐츠 표시
      setIsLoaded(true);
      setCookie("isLoaded", "true", { maxAge: INTRO_TIMING.COOKIE_MAX_AGE }); // 10분 동안 유효

      // 인트로가 완전히 페이드 아웃된 후 인트로를 안 보이게 처리
      setTimeout(() => {
        setShowIntro(false);
      }, INTRO_TIMING.FADE_OUT_DURATION); // 페이드 아웃 애니메이션 시간에 맞춤
    }, INTRO_TIMING.COMPLETE_TIME);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isMounted, isLoaded]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 마운트되지 않은 경우 블랙 스크린 표시
  if (!isMounted) return <div className="fixed inset-0 bg-black z-50"></div>;

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
      {/* 인트로 애니메이션 */}
      {showIntro && (
        <motion.div
          className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingIntro ? 0 : 1 }}
          transition={{
            duration: INTRO_TIMING.FADE_OUT_DURATION / 1000,
            ease: "easeInOut",
          }}
          suppressHydrationWarning
        >
          {/* 로고 애니메이션 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
              animate={{
                scale: SVG_ANIMATION.SCALE,
                rotate: SVG_ANIMATION.ROTATE,
              }}
              transition={{
                duration: SVG_ANIMATION.DURATION,
                repeat: Infinity,
              }}
            >
              <svg
                width={SVG_ANIMATION.WIDTH}
                height={SVG_ANIMATION.HEIGHT}
                viewBox={SVG_ANIMATION.VIEW_BOX}
                className="text-red-600/20"
                suppressHydrationWarning
              >
                <path
                  fill="currentColor"
                  d="M100 0 A100 100 0 0 1 100 200 A100 100 0 0 1 100 0z"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* 웰컴 메시지 */}
          <AnimatePresence mode="wait">
            {welcomeStep === 1 && (
              <motion.div
                key="welcome-1"
                className="text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                suppressHydrationWarning
              >
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)]">
                  오늘은 캠퍼스로!
                </h2>
              </motion.div>
            )}

            {welcomeStep === 2 && (
              <motion.div
                key="welcome-2"
                className="text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                suppressHydrationWarning
              >
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)]">
                  내일은 열방으로!
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 메인 컨텐츠 */}
      <AnimatePresence>
        <motion.section
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
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
