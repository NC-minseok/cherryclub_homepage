"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExternalPage() {
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
      <section className="bg-indigo-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">대외 사역</h1>
            <p className="text-xl mb-8">
              캠퍼스를 넘어 지역사회와 국제적으로 영향력을 발휘하는 다양한 대외
              활동을 통해 더 넓은 세상을 경험합니다
            </p>
          </div>
        </div>
      </section>

      {/* 지역사회 봉사 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              지역사회 봉사
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              NCMN 동아리는 지역사회의 필요에 적극적으로 응답하며 봉사활동을
              통해 사회적 책임을 실천합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1617450365226-9bf28c04e130"
                  alt="교육 봉사"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">교육 봉사</h3>
              <p className="text-gray-600">
                지역 청소년 센터와 협력하여 대학생 멘토링 프로그램을 운영합니다.
                학업 지도뿐만 아니라 진로 상담, 인성 교육까지 다양한 영역에서
                멘토로서 역할을 수행하며 청소년들의 성장을 돕습니다.
              </p>
            </div>

            <div className="gsap-fade-in">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                  alt="환경 보호 활동"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">환경 보호 활동</h3>
              <p className="text-gray-600">
                지역의 공원, 하천, 해변 등에서 정기적인 환경 정화 활동을
                진행합니다. 또한 환경 보호 인식을 높이기 위한 캠페인과 교육
                프로그램을 기획하고 실행하여 지속 가능한 환경을 만들어가는데
                기여합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 국제 교류 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">국제 교류</h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              국제적인 시각과 네트워크를 형성하기 위해 다양한 글로벌 프로그램에
              참여하고 교류합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1523374228107-6e44bd2b524e"
                  alt="국제 콘퍼런스"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">국제 콘퍼런스</h3>
              <p className="text-gray-600 mb-4">
                매년 개최되는 글로벌 리더십 콘퍼런스에 참가하여 국제적인
                네트워크를 형성하고 다양한 문화와 관점을 경험합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1528164344705-47542687000d"
                  alt="교환학생 지원"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">교환학생 지원</h3>
              <p className="text-gray-600 mb-4">
                교환학생 프로그램에 참여하는 회원들을 위한 준비 세미나와 현지
                적응 지원 네트워크를 운영하여 성공적인 해외 경험을 도모합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1526951521990-620dc14c214b"
                  alt="해외 봉사"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">해외 봉사</h3>
              <p className="text-gray-600 mb-4">
                방학 기간을 활용하여 아시아, 아프리카 등 개발도상국에서 교육,
                건설, 의료 등 다양한 분야의 봉사활동에 참여합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 전문 분야 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
              전문 분야 활동
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              각자의 전공과 관심 분야를 활용하여 전문성을 기반으로 한 다양한
              대외 활동을 진행합니다
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center gsap-fade-in">
              <div className="md:col-span-5">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
                    alt="창업 지원"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl font-bold mb-4">창업 지원 프로그램</h3>
                <p className="text-gray-600 mb-4">
                  창업에 관심 있는 대학생들을 위한 멘토링, 네트워킹, 투자 유치
                  지원 등 다양한 창업 지원 프로그램을 운영합니다. 경영, 마케팅,
                  기술 등 다양한 분야의 전문가들이 함께 참여하여 실질적인 도움을
                  제공합니다.
                </p>
                <Link
                  href="/join"
                  className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center"
                >
                  자세히 알아보기
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

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center gsap-fade-in">
              <div className="md:col-span-7 md:order-1 order-2">
                <h3 className="text-2xl font-bold mb-4">문화예술 프로젝트</h3>
                <p className="text-gray-600 mb-4">
                  음악, 미술, 공연 등 다양한 문화예술 분야에서 재능을 가진
                  회원들이 지역 문화 행사와 축제에 참여하여 예술 활동을
                  펼칩니다. 또한 소외 계층을 위한 문화예술 교육 프로그램을
                  기획하고 운영하여 문화적 격차 해소에 기여합니다.
                </p>
                <Link
                  href="/join"
                  className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center"
                >
                  자세히 알아보기
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
              <div className="md:col-span-5 md:order-2 order-1">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522158637959-30ab5eff4bd8"
                    alt="문화예술 프로젝트"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center gsap-fade-in">
              <div className="md:col-span-5">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573497491765-dccce02b29df"
                    alt="비영리 단체 협력"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl font-bold mb-4">비영리 단체 협력</h3>
                <p className="text-gray-600 mb-4">
                  지역의 다양한 비영리 단체 및 사회적 기업과 협력하여 사회문제
                  해결을 위한 프로젝트를 함께 진행합니다. 마케팅, 디자인, IT 등
                  전공 지식을 활용하여 단체의 활동을 지원하고 실무 경험을
                  쌓습니다.
                </p>
                <Link
                  href="/join"
                  className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center"
                >
                  자세히 알아보기
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
          </div>
        </div>
      </section>

      {/* 참여 실적 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">참여 실적</h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              지금까지 NCMN 동아리가 참여하고 기여한 다양한 활동들의 성과입니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center gsap-fade-in">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">32</div>
              <p className="text-gray-600">지역사회 봉사 프로젝트</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">12</div>
              <p className="text-gray-600">국제 콘퍼런스 참가</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">45</div>
              <p className="text-gray-600">비영리 단체 협력</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">8</div>
              <p className="text-gray-600">해외 봉사 활동</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <blockquote className="text-gray-600 italic mb-6">
                "NCMN 동아리의 교육 봉사 활동을 통해 우리 센터 청소년들이 학업
                성적뿐만 아니라 자존감과 미래에 대한 비전이 크게 향상되었습니다.
                헌신적인 대학생 멘토들에게 진심으로 감사드립니다."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <div className="font-semibold">김지영</div>
                  <div className="text-sm text-gray-500">
                    지역 청소년 센터 팀장
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <blockquote className="text-gray-600 italic mb-6">
                "NCMN 회원들의 마케팅 전략 지원 덕분에 우리 사회적 기업의
                인지도가 크게 상승했고, 매출 또한 30% 이상 증가했습니다.
                전문적인 지식을 바탕으로 한 실질적인 도움에 감사드립니다."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <div className="font-semibold">박성호</div>
                  <div className="text-sm text-gray-500">
                    친환경 사회적 기업 대표
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gsap-fade-in">
            대외 사역에 함께하세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto gsap-fade-in">
            여러분의 재능과, 전공, 관심사를 활용하여 더 넓은 세상에 긍정적인
            영향력을 미칠 수 있습니다. 지금 동아리에 가입하고 다양한 대외 활동에
            참여하세요!
          </p>
          <div className="gsap-fade-in">
            <Link
              href="/join"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              동아리 가입하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
