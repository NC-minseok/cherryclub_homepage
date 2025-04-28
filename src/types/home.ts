// 카드 데이터 타입 정의
export interface CardData {
  id: number;
  title: string;
  image: string;
  tag: string;
  descriptions: string[];
  link: string;
  bgColor1: string;
  bgColor2: string;
}

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
