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
  SECTION_FADE_IN: {
    duration: 1,
    delay: 0,
    ease: "easeIn",
  },
  TITLE_FADE_IN: {
    duration: 1.2,
    delay: 0.2,
    ease: "easeOut",
  },
  IMAGE_SCALE: {
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
              transition={ANIMATION_CONSTANTS.TITLE_FADE_IN}
              className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)] bg-clip-text"
              suppressHydrationWarning
            >
              5K운동이란?
            </motion.h1>
          </AnimatePresence>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-2xl text-white/90 leading-loose max-w-2xl mx-auto drop-shadow-md"
            suppressHydrationWarning
          >
            내가 속한 가정과 직장, 반경 5Km 안의 절대 필요가 있는 이웃들에게
            예수님의{" "}
            <span className="text-blue-300 font-semibold">
              구제·교육·보건의료·복음전파
            </span>{" "}
            4대 사역을 펼치는 것으로, 한국 교회의 부흥과 통일 한국을 이루어
            열방을 섬기는 코리아가 되게 하는 하나님의 약속이 있는 사역입니다.
          </motion.p>
        </motion.div>

        {/* 어두운 오버레이 */}
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
