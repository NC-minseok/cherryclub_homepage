import useSWR from "swr";
import { RegionData, StatData } from "../_types/regionData";
import {
  FALLBACK_REGIONS,
  processRegionsData,
  getStatsData,
} from "../_data/regionsUtils";

// API 호출 함수
const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("API 요청 실패: 지역 데이터를 불러오는데 실패했습니다");
  }

  return response.json();
};

// 클럽 상태 정보를 클라이언트에서 사용하기 위한 훅
export default function useClientClubStatus() {
  const { data, error, isLoading } = useSWR("/api/home/clubStatus", fetcher, {
    revalidateOnFocus: false, // 포커스 시 재검증 비활성화
    revalidateIfStale: true, // 오래된 데이터가 있는 경우 재검증
    revalidateOnReconnect: true, // 재연결 시 재검증
    dedupingInterval: 300000, // 5분 동안 중복 요청 방지
  });

  // 기본값 설정
  let regions: RegionData[] = [...FALLBACK_REGIONS];
  let stats: StatData[] = getStatsData(FALLBACK_REGIONS);

  // 데이터가 있고 오류가 없는 경우 데이터 가공
  if (data && !error) {
    const { universities, memberCounts } = data;
    if (universities && memberCounts) {
      regions = processRegionsData(universities, memberCounts);
      stats = getStatsData(regions, memberCounts);
    }
  }

  return {
    regions,
    stats,
    error,
    isLoading,
  };
}
