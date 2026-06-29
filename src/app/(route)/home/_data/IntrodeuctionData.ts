import { CardData } from "../_types/cardData";

// 카드 데이터
export const cards: CardData[] = [
  {
    id: 1,
    title: "캠퍼스 5K 무료 나눔",
    images: [
      "/images/campus5K/0.jpeg",
      "/images/campus5K/1.jpeg",
      "/images/campus5K/2.jpeg",
      "/images/campus5K/3.jpeg",
      "/images/campus5K/4.jpeg",
      "/images/campus5K/5.jpeg",
      "/images/campus5K/6.jpeg",
      "/images/campus5K/7.jpeg",
      "/images/campus5K/8.jpeg",
      "/images/campus5K/9.jpeg",
      "/images/campus5K/10.jpeg",
      "/images/campus5K/11.jpeg",
      "/images/campus5K/12.jpeg",
      "/images/campus5K/13.jpeg",
    ],
    tag: "캠퍼스 5K",
    descriptions: [
      "예수 그리스도의 리더십을 본받아, 나의 신분과 사명을 바로 알고",
    ],
    link: "/leadership",
    bgColor1: "bg-blue-100",
    bgColor2: "bg-purple-100",
  },
  {
    id: 2,
    title: "캠퍼스 사역",
    images: ["/images/home/campus-ministry.png"],
    tag: "5K 무료나눔",
    descriptions: [
      "체리동아리의 캠퍼스 사역은 대학캠퍼스에 부흥을 이끄는 사역입니다.",
      "대학캠퍼스 안에서 5K 무료나눔, 5K 청년밥차, 캠퍼스 워십, Red HeartDay를 주도합니다!",
    ],
    link: "/campus",
    bgColor1: "bg-green-100",
    bgColor2: "bg-blue-100",
  },
  {
    id: 3,
    title: "전체/지역모임",
    images: ["/images/home/regional-meeting.png"],
    tag: "전체모임",
    descriptions: [
      "매월 1회 전체모임과 지역별 모임을 통해 체리 동아리 회원들은 예배와 교제를 통해 비전을 공유하고 함께 성장합니다.",
    ],
    link: "/meetings",
    bgColor1: "bg-yellow-100",
    bgColor2: "bg-red-100",
  },
  {
    id: 4,
    title: "대외사역",
    images: ["/images/home/outreach.png"],
    tag: "DMZ 기도행진",
    descriptions: [
      "체리 동아리는 캠퍼스를 넘어 지역사회와 나라를 섬기는 다양한 대외사역을 주도합니다!",
      "레드하트 캠페인, My5K, 사랑나눔버스, DMZ 기도 행진 등을 통해 하나님의 사랑을 실천합니다!",
    ],
    link: "/outreach",
    bgColor1: "bg-purple-100",
    bgColor2: "bg-blue-100",
  },
];
