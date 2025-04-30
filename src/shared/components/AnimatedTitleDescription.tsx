import { motion } from "framer-motion";
import useScrollAnimation from "../hook/useScrollAnimation";
import { useRef } from "react";

type AnimatedIntroDescriptionProps = {
  isMobile: boolean;
  description: string;
  className?: string;
};

/**
 * 센션 타이틀 소개 설명 애니메이션 컴포넌트
 * @param isMobile 모바일 여부
 * @param description 설명 텍스트
 * @param className 추가 클래스 이름
 * @returns 애니메이션 컴포넌트
 */
export default function AnimatedTitleDescription({
  isMobile,
  description,
  className,
}: AnimatedIntroDescriptionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { itemVariants, style } = useScrollAnimation(containerRef);

  const INTRO_DESCRIPTION_TEXT_CLASSES = `
      ${
        isMobile
          ? "text-base text-left mx-3"
          : "text-lg text-center sm:text-xl md:text-2xl mx-auto"
      }
      leading-relaxed font-medium whitespace-pre-line mb-20 sm:mb-28 break-words hyphens-auto max-w-2xl px-2 ${className}
    `.trim();

  return (
    <motion.div ref={containerRef}>
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          wordBreak: "keep-all",
          overflowWrap: "break-word",
          ...style,
        }}
        className={INTRO_DESCRIPTION_TEXT_CLASSES}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </motion.div>
  );
}
