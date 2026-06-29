"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

type Props = {
  images: string[];
  videos?: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  videos = [],
  initialIndex,
  title,
  onClose,
}: Props) {
  const media: MediaItem[] = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...videos.map((src) => ({ type: "video" as const, src })),
  ];

  const [current, setCurrent] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentItem = media[current];

  const prev = useCallback(() => {
    setPaused(true);
    setCurrent((c) => (c - 1 + media.length) % media.length);
  }, [media.length]);
  const next = useCallback(() => {
    setPaused(true);
    setCurrent((c) => (c + 1) % media.length);
  }, [media.length]);
  const goTo = (i: number) => {
    setPaused(true);
    setCurrent(i);
  };

  // 영상으로 이동하면 자동재생 멈춤, 이미지면 자동슬라이드 허용
  useEffect(() => {
    if (currentItem?.type === "video") {
      setPaused(true);
      videoRef.current?.play().catch(() => {});
    }
  }, [current, currentItem?.type]);

  // 자동 슬라이드 (이미지 전용)
  useEffect(() => {
    if (media.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % media.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [media.length, paused]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, onClose, prev]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onClick={onClose}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-white font-semibold text-base">{title}</p>
          <p className="text-white/50 text-xs mt-0.5">
            {current + 1} / {media.length}
            {currentItem?.type === "video" && (
              <span className="ml-2 text-white/40">영상</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* 재생/일시정지 토글 (이미지 자동슬라이드용) */}
          {media.length > 1 && currentItem?.type === "image" && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={paused ? "자동 재생" : "일시정지"}
            >
              {paused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          )}

          {/* 닫기 */}
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 미디어 영역 */}
      <div
        className="relative flex-1 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {currentItem?.type === "video" ? (
              <video
                ref={videoRef}
                src={currentItem.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: "calc(100vh - 160px)" }}
              />
            ) : (
              <Image
                src={currentItem.src}
                alt={`${title} ${current + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* 화살표 */}
        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
              aria-label="이전"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
              aria-label="다음"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 자동재생 진행 바 (이미지일 때만) */}
        {media.length > 1 && !paused && currentItem?.type === "image" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <motion.div
              key={current}
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* 썸네일 + 도트 */}
      {media.length > 1 && (
        <div
          className="shrink-0 pb-6 pt-4 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center gap-2 mb-3 overflow-x-auto">
            {media.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? "border-white scale-110"
                    : "border-transparent opacity-50"
                }`}
                aria-label={`${i + 1}번째 ${item.type === "video" ? "영상" : "사진"}`}
              >
                {item.type === "image" ? (
                  <Image src={item.src} alt="" fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
