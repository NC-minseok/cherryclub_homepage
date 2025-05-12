import { RegionData, StatData } from "../_types/regionData";
import { FALLBACK_REGIONS } from "./regionsUtils";

// 지역 및 대학교 데이터 가져오기
export async function fetchRegionsData(): Promise<{
  regions: RegionData[];
  stats: StatData[];
}> {
  try {
    // 통합된 API 엔드포인트 호출
    const response = await fetch("/api/home/clubStatus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error("API 요청 실패: 지역 데이터를 불러오는데 실패했습니다");
    }

    // 통합 데이터 파싱
    const data = await response.json();
    const { universities, memberCounts } = data;

    if (!universities || !memberCounts) {
      throw new Error("API 응답 데이터 형식이 올바르지 않습니다");
    }

    // 이 함수들은 이제 regionsUtils.ts로 이동했으므로 수동으로 가져와서 사용
    const { processRegionsData, getStatsData } = await import("./regionsUtils");

    // API 응답 데이터를 regions 형식으로 가공
    const transformedRegions = processRegionsData(universities, memberCounts);
    const statsData = getStatsData(transformedRegions, memberCounts);

    return {
      regions: transformedRegions,
      stats: statsData,
    };
  } catch (error) {
    console.error("지역 데이터 로딩 실패:", error);
    // 이 함수는 이제 regionsUtils.ts로 이동했으므로 수동으로 가져와서 사용
    const { getStatsData } = await import("./regionsUtils");

    // 오류 시 기본 데이터 반환
    return {
      regions: [...FALLBACK_REGIONS],
      stats: getStatsData(FALLBACK_REGIONS),
    };
  }
}
