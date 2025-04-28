"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GatheringsPage() {
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
      <section className="bg-purple-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              전체/지역모임
            </h1>
            <p className="text-xl mb-8">
              전국 단위 모임과 지역별 소모임을 통해 보다 넓은 네트워크를
              형성하고 다양한 만남을 통해 함께 성장합니다
            </p>
          </div>
        </div>
      </section>

      {/* 전체 모임 소개 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">전체 모임</h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              NCMN 동아리의 모든 회원이 함께 모여 교류하고 관계를 맺는 다양한
              전체 모임 행사를 진행합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6"
                  alt="연례 컨퍼런스"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">연례 컨퍼런스</h3>
              <p className="text-gray-600">
                매년 여름 방학 중에 개최되는 NCMN 연례 컨퍼런스에서는 전국의
                모든 회원들이 모여 영감을 나누고 네트워킹을 형성합니다. 다양한
                주제의 강연, 워크숍, 그룹 활동을 통해 리더십 역량을 강화하고
                비전을 공유하는 시간을 갖습니다.
              </p>
            </div>

            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1525026198548-4baa812f1183"
                  alt="신년 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">신년 모임</h3>
              <p className="text-gray-600">
                매년 새해 첫 달에 진행되는 신년 모임에서는 새로운 한 해의 비전과
                목표를 공유하고 함께 계획을 세웁니다. 지난 한 해의 성과를
                축하하고, 새로운 회원을 환영하며, 앞으로의 활동 방향에 대해
                논의합니다. 전국의 회원들이 교류하는 중요한 자리입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 지역별 모임 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              지역별 모임
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              지역별 소모임을 통해 더 긴밀한 관계를 형성하고 지역사회에 긍정적인
              영향력을 미칩니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1581262208435-41726673b936"
                  alt="서울 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">서울 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                서울 지역 대학의 회원들이 모여 다양한 문화 활동, 봉사활동,
                스터디 그룹을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 첫째
                토요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> 강남역 인근
                커뮤니티 센터
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
                  alt="부산 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">부산 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                부산 지역 대학의 회원들이 모여 해양 관련 프로젝트, 지역 문화
                탐방, 멘토링 프로그램을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 둘째
                일요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> 해운대 센텀시티
                모임공간
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1603078210637-2c25427427a0"
                  alt="대전 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">대전 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                대전 지역 대학의 회원들이 모여 과학기술 관련 스터디, 창업
                멘토링, 세미나 등을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 셋째
                토요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> KAIST 인근
                스터디카페
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1580528603425-c0d82fdacf8f"
                  alt="광주 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">광주 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                광주 지역 대학의 회원들이 모여 문화예술 프로젝트, 지역사회
                봉사활동, 리더십 세미나를 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 둘째
                토요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> 충장로 문화센터
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8"
                  alt="대구 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">대구 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                대구 지역 대학의 회원들이 모여 창업 관련 활동, 취업 컨설팅, 문화
                교류 프로그램을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 넷째
                토요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> 동성로 커뮤니티
                허브
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8"
                  alt="제주 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">제주 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                제주 지역 대학의 회원들이 모여 환경 보전 활동, 관광 산업 스터디,
                지역 문화 교류 활동을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 첫째
                일요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> 제주대학교 인근
                카페
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 모임 일정 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center gsap-fade-in">
              연간 주요 모임 일정
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-purple-600">
                    1월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">신년 모임</h3>
                  <p className="text-gray-600 mb-2">
                    새해 비전 공유 및 네트워킹
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 1월 둘째 주
                    토요일
                  </p>
                  <p>
                    <span className="font-semibold">장소:</span> 서울 코엑스
                    컨퍼런스홀
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-purple-600">
                    4월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">봄 연합 캠프</h3>
                  <p className="text-gray-600 mb-2">
                    전국 회원 봄맞이 연합 캠프
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 4월 셋째 주
                    주말
                  </p>
                  <p>
                    <span className="font-semibold">장소:</span> 경기도 양평
                    수련원
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-purple-600">
                    7월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">연례 컨퍼런스</h3>
                  <p className="text-gray-600 mb-2">
                    전국 NCMN 회원 연례 컨퍼런스
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 7월 둘째 주
                    수-금
                  </p>
                  <p>
                    <span className="font-semibold">장소:</span> 부산 해운대
                    그랜드호텔
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-purple-600">
                    10월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">가을 축제</h3>
                  <p className="text-gray-600 mb-2">
                    지역별 모임 연합 가을 축제
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 10월 첫째 주
                    토요일
                  </p>
                  <p>
                    <span className="font-semibold">장소:</span> 각 지역별 장소
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gsap-fade-in">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <span className="text-xl font-semibold text-purple-600">
                    12월
                  </span>
                </div>
                <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">송년 모임</h3>
                  <p className="text-gray-600 mb-2">
                    한 해를 마무리하는 전체 송년 모임
                  </p>
                  <p>
                    <span className="font-semibold">일정:</span> 12월 셋째 주
                    토요일
                  </p>
                  <p>
                    <span className="font-semibold">장소:</span> 서울 시청 인근
                    이벤트홀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
            함께 모여 더 큰 꿈을 꾸세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto gsap-fade-in">
            NCMN 동아리의 다양한 모임에 참여하여 넓은 관계 네트워크를 형성하고
            함께 성장하는 경험을 나누세요. 지금 가입하고 다음 모임에 참여하세요!
          </p>
          <div className="gsap-fade-in">
            <Link
              href="/join"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              동아리 가입하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
