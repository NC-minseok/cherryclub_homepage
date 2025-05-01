import { CardData } from "../_types/cardData";

// 카드 데이터
export const cards: CardData[] = [
  {
    id: 1,
    title: "리더십 훈련",
    image: "/images/home/leadership-training.png",
    tag: "왕의 지도력 훈련",
    descriptions: [
      "예수 그리스도의 리더십을 본받아, 나의 신분과 사명을 바로 알고, 사자의 리더십(사역)과 양의 리더십(관계)을 훈련합니다! 또한 올바른 지도력을 발휘하는 성경적 방법인 셀프 리더십을 훈련합니다!",
    ],
    link: "/leadership",
    bgColor1: "bg-blue-100",
    bgColor2: "bg-purple-100",
  },
  {
    id: 2,
    title: "캠퍼스 사역",
    image: "/images/home/campus-ministry.png",
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
    image: "/images/home/regional-meeting.png",
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
    image: "/images/home/outreach.png",
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
