import { motion } from "framer-motion";
import React, { useRef } from "react";
import useScrollAnimation from "../hook/useScrollAnimation";
import useFitty from "../hook/useFittyText";

type AnimatedTitleProps = {
  text: string;
  className?: string;
};

/**
 * 센션 타이틀 애니메이션 컴포넌트
 * @param text 애니메이션 텍스트
 * @param className 추가 클래스 이름
 * @returns 애니메이션 컴포넌트
 */
export default function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 커스텀 훅 사용
  useFitty(titleRef);
  const { itemVariants, style } = useScrollAnimation();

  return (
    <motion.div ref={containerRef}>
      <motion.h1
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        style={{ ...style, display: "inline-block", whiteSpace: "nowrap" }}
        viewport={{ once: true, margin: "-100px" }}
        ref={titleRef}
        className={`text-black text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 tracking-tight leading-tight bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-blue-600 to-purple-600 ${className}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </motion.div>
  );
}
