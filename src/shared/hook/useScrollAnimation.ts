/**
 * @returns 애니메이션 관련 값들
 */
export default function useScrollAnimation() {
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
    opacity: prefersReducedMotion ? 1 : 0,
    y: prefersReducedMotion ? 0 : 0,
    scale: prefersReducedMotion ? 1 : 0.92,
  };

  return {
    itemVariants,
    style,
  };
}
