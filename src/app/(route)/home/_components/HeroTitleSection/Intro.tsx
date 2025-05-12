"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function IntroPage() {
  const router = useRouter();
  const [welcomeStep, setWelcomeStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트에서만 실행되도록 마운트 상태 추가
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // 환영 메시지 단계별 표시
    const step1Timer = setTimeout(() => {
      setWelcomeStep(2);
    }, 1000);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3300);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      // Intro가 완료되면 isLoaded 쿠키를 true로 설정
      setCookie("isLoaded", "true", { maxAge: 60 * 10 }); // 10분 동안 유효
    }, 4000);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isMounted, router]);

  // 클라이언트 측에서만 렌더링하기 위한 조건부 반환
  if (!isMounted || isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
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
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <svg
            width="600"
            height="600"
            viewBox="0 0 200 200"
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
  );
}
