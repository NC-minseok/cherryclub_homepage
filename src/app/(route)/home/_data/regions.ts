import { RegionData, StatData } from "../_types/regionData";

// 정적 지역 데이터 (API 요청 실패시 폴백용)
const FALLBACK_REGIONS: RegionData[] = [
  {
    id: 1,
    name: "서울",
    x: 30,
    y: 22,
    count: 0,
    universities: [],
    leader: "한병국",
  },
  {
    id: 2,
    name: "인천/경기",
    x: 28,
    y: 14,
    count: 0,
    universities: [],
    leader: "이주희",
  },
  {
    id: 3,
    name: "강원",
    x: 44,
    y: 16,
    count: 0,
    universities: [],
    leader: "이상준",
  },
  {
    id: 4,
    name: "대전/충청",
    x: 30,
    y: 38,
    count: 0,
    universities: [],
    leader: "안결하",
  },
  {
    id: 5,
    name: "호남",
    x: 25,
    y: 60,
    count: 0,
    universities: [],
    leader: "이상준",
  },
  {
    id: 6,
    name: "대구/포항",
    x: 50,
    y: 38,
    count: 0,
    universities: [],
    leader: "정다연",
  },
  {
    id: 7,
    name: "창원/부산",
    x: 53,
    y: 57,
    count: 0,
    universities: [],
    leader: "강상아",
  },
  {
    id: 8,
    name: "제주",
    x: 18,
    y: 87,
    count: 0,
    universities: [],
    leader: "이상준",
  },

  {
    id: 9,
    name: "해외",
    x: 86,
    y: 82,
    count: 0,
    universities: [],
    leader: "",
  },
];

// 지역명 API 매핑
const REGION_MAPPING: Readonly<Record<string, string>> = {
  서울: "서울",
  "인천/경기": "경기인천",
  강원: "강원",
  "대전/충청": "대전충청",
  호남: "광주전라",
  "대구/포항": "대구경북",
  "창원/부산": "부산경남",
  제주: "제주",
};

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

    // API 응답 데이터를 regions 형식으로 가공
    const transformedRegions = processRegionsData(universities, memberCounts);
    const statsData = getStatsData(transformedRegions, memberCounts);

    return {
      regions: transformedRegions,
      stats: statsData,
    };
  } catch (error) {
    console.error("지역 데이터 로딩 실패:", error);
    // 오류 시 기본 데이터 반환
    return {
      regions: [...FALLBACK_REGIONS],
      stats: getStatsData(FALLBACK_REGIONS),
    };
  }
}

// API 응답 데이터를 기반으로 지역 데이터 가공
function processRegionsData(
  universitiesData: ReadonlyArray<{ region: string; university: string }>,
  membersData: ReadonlyArray<{ region: string; totalCount: number }>
): RegionData[] {
  if (!universitiesData?.length) {
    return [...FALLBACK_REGIONS];
  }

  // 지역별 대학교 목록 생성
  const regionMap = new Map<string, Set<string>>();

  // 중복 제거를 위해 Set 사용
  universitiesData.forEach((item) => {
    const region = item.region.trim();
    const university = item.university.trim();

    if (!region || !university) return;

    if (!regionMap.has(region)) {
      regionMap.set(region, new Set());
    }

    // Set에 추가하여 중복 자동 제거
    regionMap.get(region)?.add(university);
  });

  // 지역별 인원수 매핑
  const memberCountMap = new Map<string, number>();
  membersData.forEach((item) => {
    const region = item.region.trim();
    if (!region) return;

    memberCountMap.set(region, item.totalCount);
  });

  // 기존 regions 데이터와 새로운 데이터 병합
  return FALLBACK_REGIONS.map((region) => {
    const regionKey = getRegionKey(region.name);
    const universitySet = regionMap.get(regionKey);

    // Set을 배열로 변환
    const updatedUniversities = universitySet
      ? Array.from(universitySet)
      : [...region.universities];

    // 인원수 설정 (API에서 가져온 값 또는 대학 수 기반)
    const memberCount =
      memberCountMap.get(regionKey) || updatedUniversities.length;

    return {
      ...region,
      universities: updatedUniversities,
      count: memberCount,
    };
  });
}

// 지역명을 API 키에 맞게 변환
function getRegionKey(regionName: string): string {
  return REGION_MAPPING[regionName] || regionName;
}

// 통계 데이터 생성
function getStatsData(
  regions: ReadonlyArray<RegionData>,
  membersData?: ReadonlyArray<{ region: string; totalCount: number }>
): StatData[] {
  // API 응답에서 직접 총 인원수 계산 (가능한 경우)
  const totalMembers = membersData?.length
    ? membersData.reduce((sum, item) => sum + item.totalCount, 0)
    : regions.reduce((sum, region) => sum + region.count, 0);

  // 서로 다른 지역에 동일한 대학이 있을 수 있으므로 전체 고유 대학 수 계산
  const allUniversities = regions.flatMap((region) => region.universities);
  const uniqueUniversitiesCount = new Set(allUniversities).size;

  return [
    {
      label: "총 회원수",
      value: totalMembers,
      icon: "👥",
      color: "from-blue-500 to-purple-500",
    },
    {
      label: "활동 대학",
      value: uniqueUniversitiesCount,
      icon: "🏫",
      color: "from-green-500 to-teal-500",
    },
  ];
}
