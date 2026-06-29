// 카드 데이터 타입 정의
export interface CardData {
  id: number;
  title: string;
  images: string[];
  videos?: string[];
  tag: string;
  descriptions: string[];
  link: string;
  bgColor1: string;
  bgColor2: string;
}
