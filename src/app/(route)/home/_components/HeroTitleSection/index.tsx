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

export default function HeroTitleSection() {
  const ref = useRef(null);
  // 타이틀과 어둡게 처리를 처음부터 표시
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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

  // API에서 이미지 목록 가져오기
  useEffect(() => {
    if (!isMounted) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-hero-images");

        if (!response.ok) {
          throw new Error("이미지를 가져오는데 실패했습니다");
        }

        const images = await response.json();
        setHeroImages(images);
      } catch (error) {
        console.error("이미지 로딩 중 오류:", error);
        // 오류 발생 시 기본 이미지 설정
        setHeroImages([
          "/images/home/HeroSession/DSC01527.jpg",
          "/images/home/HeroSession/DSC04061.JPG",
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <Intro />
      <AnimatePresence>
        <motion.section
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5, ease: "easeIn" }}
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
              {
                <>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 4, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)] bg-clip-text"
                    suppressHydrationWarning
                  >
                    CHERRY CLUB
                  </motion.h1>
                </>
              }
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
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                speed={1500}
                loop={true}
                className="w-full h-full"
              >
                {heroImages.map((image, index) => (
                  <SwiperSlide key={index} className="w-full h-full">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 3, delay: 3.5, ease: "easeOut" }}
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
