import fitty from "fitty";
import { useEffect } from "react";

/**
 * 타이틀 크기 자동 조정 훅
 * @param titleRef 타이틀 요소의 ref
 */
export default function useFitty(
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  useEffect(() => {
    if (titleRef.current) {
      const fittyInstance = fitty(titleRef.current, {
        minSize: 30,
        maxSize: 80,
        multiLine: true,
      });

      return () => {
        fittyInstance.unsubscribe();
      };
    }
  }, [titleRef]);
}
