"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CampusPage() {
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
      <section className="bg-green-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">캠퍼스 사역</h1>
            <p className="text-xl mb-8">
              대학 캠퍼스에서 의미있는 활동을 통해 영향력을 키우고 실질적인
              변화를 만들어갑니다
            </p>
          </div>
        </div>
      </section>

      {/* 캠퍼스 사역 소개 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              캠퍼스 사역 프로그램
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              NCMN 동아리는 각 대학 캠퍼스에서 다양한 활동을 통해 대학생활에
              의미를 더하고, 실질적인 영향력을 발휘할 수 있는 환경을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1533664488202-6212878dea10"
                  alt="캠퍼스 공동체"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">캠퍼스 공동체</h3>
              <p className="text-gray-600">
                각 대학 캠퍼스별 소그룹 공동체를 구성하여 정기적인 모임을
                갖습니다. 같은 학교 학생들과 함께 대학 생활의 고민을 나누고 서로
                격려하며 성장할 수 있는 의미있는 관계를 형성합니다. 선후배
                멘토링도 함께 이루어집니다.
              </p>
            </div>

            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae"
                  alt="캠퍼스 프로젝트"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">캠퍼스 프로젝트</h3>
              <p className="text-gray-600">
                각 캠퍼스의 필요를 발견하고 해결하는 프로젝트를 직접 기획하고
                실행합니다. 학생들의 필요를 충족시키는 다양한 활동을 통해 캠퍼스
                환경을 개선하고 긍정적인 영향력을 미칩니다. 학생회와 협력하여
                프로젝트를 진행하기도 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 활동 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">주요 활동</h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              NCMN 동아리는 캠퍼스에서 다양한 활동을 통해 학생들의 필요를 채우고
              의미있는 변화를 만들어갑니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">스터디 그룹</h3>
              <p className="text-gray-600">
                전공별 스터디 그룹을 구성하여 함께 공부하고 성장하는 환경을
                조성합니다. 선배들의 멘토링과 함께 효과적인 학습법을 공유하고,
                시험 준비를 함께합니다.
              </p>
            </div>

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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">진로 멘토링</h3>
              <p className="text-gray-600">
                졸업생과 현직자들을 초청하여 다양한 직업군에 대한 멘토링을
                제공합니다. 자신의 적성과 꿈을 발견하고 구체적인 진로 계획을
                세울 수 있도록 도움을 줍니다.
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">캠퍼스 이벤트</h3>
              <p className="text-gray-600">
                다양한 문화 행사와 이벤트를 기획하고 진행합니다. 음악회, 영화제,
                북클럽 등 캠퍼스 내 다양한 활동을 통해 학생들 간의 교류와 소통의
                장을 마련합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 캠퍼스별 활동 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              캠퍼스별 활동
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              각 대학교별로 특화된 프로그램과 활동을 통해 캠퍼스 특성에 맞는
              사역을 진행합니다
            </p>
          </div>

          <div className="space-y-10">
            <div className="bg-gray-50 rounded-xl overflow-hidden gsap-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-4 relative h-60 md:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b"
                    alt="서울대학교"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-8 p-8">
                  <h3 className="text-2xl font-bold mb-3">서울대학교</h3>
                  <p className="text-gray-600 mb-4">
                    공공정책 관련 스터디 그룹 운영, 사회 이슈 세미나 및 토론회,
                    학부별 멘토링 프로그램 등을 진행합니다.
                  </p>
                  <p>
                    <span className="font-semibold">모임 장소:</span> 대학본부
                    앞 잔디밭, 중앙도서관 스터디룸
                  </p>
                  <p>
                    <span className="font-semibold">정기 모임:</span> 매주
                    화요일 저녁 7시
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden gsap-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-4 relative h-60 md:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0"
                    alt="연세대학교"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-8 p-8">
                  <h3 className="text-2xl font-bold mb-3">연세대학교</h3>
                  <p className="text-gray-600 mb-4">
                    창업 인큐베이팅 프로그램, 국제 학생 교류 활동, 지역사회
                    봉사활동 등을 중점적으로 진행합니다.
                  </p>
                  <p>
                    <span className="font-semibold">모임 장소:</span> 신촌캠퍼스
                    학생회관, 백양로 카페
                  </p>
                  <p>
                    <span className="font-semibold">정기 모임:</span> 매주
                    목요일 오후 6시
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden gsap-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-4 relative h-60 md:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a"
                    alt="고려대학교"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-8 p-8">
                  <h3 className="text-2xl font-bold mb-3">고려대학교</h3>
                  <p className="text-gray-600 mb-4">
                    리더십 워크샵, 학술 심포지엄, 문화예술 페스티벌, 고대-연대
                    교류 프로그램 등을 중점적으로 운영합니다.
                  </p>
                  <p>
                    <span className="font-semibold">모임 장소:</span> 중앙광장,
                    하나스퀘어 세미나실
                  </p>
                  <p>
                    <span className="font-semibold">정기 모임:</span> 매주
                    수요일 오후 5시
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 gsap-fade-in">
            <Link
              href="/gatherings"
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800"
            >
              모든 캠퍼스 모임 보기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
            캠퍼스 사역에 함께하세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto gsap-fade-in">
            지금 NCMN 동아리에 가입하고 여러분의 캠퍼스에서 의미있는 변화를
            만들어가세요. 함께할 때 더 큰 영향력을 발휘할 수 있습니다.
          </p>
          <div className="gsap-fade-in">
            <Link
              href="/join"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              동아리 가입하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
