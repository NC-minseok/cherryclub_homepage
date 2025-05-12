// 지역 데이터 타입 정의
export interface RegionData {
  id: number;
  name: string;
  x: number;
  y: number;
  count: number;
  leader: string;
  universities: string[];
}

// 통계 데이터 타입 정의
export interface StatData {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}
