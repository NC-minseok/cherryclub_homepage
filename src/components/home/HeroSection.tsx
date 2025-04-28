"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [videoDarken, setVideoDarken] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/videos/title.mp4");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // 배경 어둡게 처리 타이머
    const darkenTimer = setTimeout(() => {
      setVideoDarken(true);
    }, 11000);

    // 타이틀 표시 타이머
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 11000);

    // 화면 크기 감지 함수
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc("/videos/title_mobile.mp4");
      } else {
        setVideoSrc("/videos/title.mp4");
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(darkenTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <AnimatePresence>
          {showTitle && (
            <>
              <motion.h1
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.2, 0.65, 0.3, 1],
                  scale: { type: "spring", stiffness: 80 },
                }}
                className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)] bg-clip-text"
              >
                CHERRY CLUB
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 sm:mt-6 md:mt-8"
              >
                <button
                  onClick={() => setVideoModal(true)}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-white/30 transition-all hover:scale-105 border border-white/30 mb-8 sm:mb-12"
                >
                  전체 동영상 보기
                </button>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-white text-lg mb-2">
                  스크롤을 내려 더 알아보기
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 배경 비디오 */}
      <AnimatePresence>
        {videoDarken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-0"
          />
        )}
      </AnimatePresence>
      <video
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover object-center z-[-1]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* 비디오 모달 */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(false)}
                className="absolute -top-12 right-0 text-white p-2 rounded-full hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <video
                src="/videos/title_full.mp4"
                className="w-full h-full rounded-lg shadow-2xl"
                autoPlay
                controls
                playsInline
                preload="auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
