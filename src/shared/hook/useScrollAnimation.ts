import { useScroll, useTransform } from "framer-motion";

/**
 * 스크롤 기반 애니메이션 훅
 * @param containerRef 컨테이너 요소의 ref
 * @returns 애니메이션 관련 값들
 */
export default function useScrollAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  // 스크롤 관련 애니메이션을 위한 설정
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 스크롤 위치에 따른 애니메이션 값 변환 - 더 넓은 범위와 큰 변화값 적용
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  // 리듀스 모션 설정 확인 (접근성)
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      : false;

  // 애니메이션 variants - 더 극적인 효과와 지연시간 추가
  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.92 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // 부드러운 ease out cubic 곡선
      },
    },
  };

  const style = {
    willChange: "transform, opacity", // 성능 최적화
    opacity: prefersReducedMotion ? 1 : opacity,
    y: prefersReducedMotion ? 0 : y,
    scale: prefersReducedMotion ? 1 : scale,
  };

  return {
    itemVariants,
    style,
  };
}
