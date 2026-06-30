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
  // 클릭 시 첫 영상부터 라이트박스를 열지 여부
  openVideoFirst?: boolean;
}
