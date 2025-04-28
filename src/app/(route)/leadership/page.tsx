"use client";
import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LeadershipPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animations = gsap.context(() => {
      gsap.utils.toArray(".gsap-fade-in").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => animations.revert();
  }, []);

  return (
    <div className="pt-24 md:pt-28">
      {/* 히어로 섹션 */}
      <section className="bg-blue-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">리더십 훈련</h1>
            <p className="text-xl mb-8">
              NCMN 동아리는 체계적인 리더십 훈련 프로그램을 통해 미래 리더로서의
              역량을 개발하도록 돕습니다
            </p>
          </div>
        </div>
      </section>

      {/* 프로그램 소개 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              리더십 훈련 프로그램
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              우리의 리더십 훈련 프로그램은 이론적 학습과 실전 경험을 통해
              균형잡힌 리더로 성장할 수 있는 환경을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                  alt="리더십 워크샵"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">리더십 워크샵</h3>
              <p className="text-gray-600">
                월 2회 진행되는 리더십 워크샵에서는 리더십 이론, 의사소통 기술,
                팀 빌딩, 갈등 해결 등 리더에게 필요한 다양한 역량을 배울 수
                있습니다. 전문 강사진의 지도 아래 실질적인 리더십 기술을 습득할
                수 있습니다.
              </p>
            </div>

            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1475483768296-6163e08872a1"
                  alt="멘토링 프로그램"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">멘토링 프로그램</h3>
              <p className="text-gray-600">
                각 참가자에게는 경험이 풍부한 선배 멘토가 배정되어 1:1 멘토링을
                제공합니다. 개인적인 목표 설정부터 리더십 역량 개발까지 맞춤형
                지도와 피드백을 받을 수 있습니다. 멘토와의 정기적인 미팅을 통해
                지속적인 성장을 도모합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 리더십 실습 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              리더십 실습 기회
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              이론적 지식뿐만 아니라 실제 상황에서 리더십을 발휘할 수 있는
              다양한 기회를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">프로젝트 리더십</h3>
              <p className="text-gray-600">
                동아리 내 다양한 프로젝트를 기획하고 이끌어나갈 수 있는 기회를
                제공합니다. 실제 프로젝트 리더로서 팀을 구성하고 목표를 설정하며
                성과를 달성하는 과정을 경험할 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">워크숍 진행</h3>
              <p className="text-gray-600">
                일정 기간의 트레이닝 후에는 자신만의 워크숍을 기획하고 진행할 수
                있습니다. 다른 회원들을 대상으로 자신의 전문 분야나 관심 주제에
                대한 워크숍을 주도함으로써 퍼실리테이션 역량을 키웁니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">행사 기획</h3>
              <p className="text-gray-600">
                대규모 동아리 행사나 캠퍼스 이벤트를 기획하고 진행하는 팀에
                참여할 수 있습니다. 이벤트 기획부터 실행, 평가까지 전 과정을
                경험하며 조직 관리와 리소스 활용 능력을 기를 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 일정 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center gsap-fade-in">
              리더십 훈련 일정
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-blue-600">
                    3월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">리더십 기초 과정</h3>
                  <p className="text-gray-600 mb-2">
                    리더십의 기본 원칙과 이론을 배우는 입문 워크샵
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 매주 토요일
                    오후 2시-4시
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-blue-600">
                    5월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">팀 리더십 워크샵</h3>
                  <p className="text-gray-600 mb-2">
                    효과적인 팀 관리와 협업 스킬을 배우는 심화 과정
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 5월 둘째, 넷째
                    주 토요일
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-blue-600">
                    7월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">리더십 캠프</h3>
                  <p className="text-gray-600 mb-2">
                    2박 3일간 진행되는 집중 리더십 훈련 캠프
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
