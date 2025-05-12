import useSWR from "swr";

// API 호출 함수
const fetcher = async (url: string): Promise<string[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("이미지를 가져오는데 실패했습니다");
  }
  return response.json();
};

// 기본 이미지 경로
export const DEFAULT_HERO_IMAGES: string[] = [
  "/images/home/HeroSession/DSC01527.jpg",
  "/images/home/HeroSession/DSC04061.JPG",
];

export default function useHeroImages() {
  const { data, error, isLoading, mutate } = useSWR<string[]>(
    "/api/get-hero-images",
    fetcher,
    {
      revalidateOnFocus: false, // 포커스 시 재검증 비활성화
      revalidateIfStale: true, // 오래된 데이터가 있는 경우 재검증
      revalidateOnReconnect: true, // 재연결 시 재검증
      dedupingInterval: 3600000, // 1시간 동안 중복 요청 방지
      fallbackData: DEFAULT_HERO_IMAGES, // 데이터 로딩 실패 시 기본 값
    }
  );

  return {
    heroImages: data || DEFAULT_HERO_IMAGES,
    error,
    isLoading,
    mutate,
  };
}
