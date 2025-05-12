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
              전체·지역모임
            </h1>
            <p className="text-xl mb-8">
            전체·지역모임은 전국 또는 지역별로 동아리 회원들이 모여 하나의 비전으로 연합하며 새 힘을 얻는 모임입니다.✨
            </p>
          </div>
        </div>
      </section>

      {/* 전체 모임 소개 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 gsap-fade-in">전체 모임🏫</h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              전체모임은 매달 첫주 목요일 전국에 있는 모든 회원들이 한자리에 모여 하나의 비전으로 연합하며 새 힘을 얻는 모임입니다.
            </p>
          </div>
      {/* 전체 모임 사진 추가*/}
          <div className="relative h-96 rounded-xl overflow-hidden mb-12 gsap-fade-in">
            <Image
              src="/images/home/전체모임.jpg"
              alt="전체 모임"
              fill
              className="object-cover"
            />
          </div>

          {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gsap-fade-in">
              <h3 className="text-2xl font-bold mb-3">비전캠프</h3>
              <p className="text-gray-600">
              비전캠프는 대학캠퍼스의 부흥을 갈망하며 기독교문명개혁운동을 주도할 다음세대 학생들을 위한 캠프입니다.
              대학 캠퍼스 부흥의 비전을 공유하고 내가 속한 대학 캠퍼스 안에서부터 5k사역을 통해 그리스도의 아름다운 계절이 오길 소망하며 NCMN 5대운동에 함께 동참할 리더들을 세우고 있습니다.
              여러분은 비전캠프를 통해서 기독교문개혁운동을 주도하는 리더로 서게 될 것입니다. 캠퍼스별로 네크워크를 형성하고 NCMN의 5대운동을 캠퍼스 안에서 펼쳐서 열방을 섬기는 리더로 세워지게 될 것입니다.
              </p>
            </div>
             🔄 비전캠프 사진 - 인스타그램 피드 스타일로 변경 
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-4">
                      {[
                        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6",
                        "https://images.unsplash.com/photo-1525026198548-4baa812f1183",
                      ].map((src, idx) => (
                        <div
                          key={idx}
                          className="inline-block relative h-64 w-64 rounded-lg overflow-hidden mr-4"
                        >
                          <Image
                            src={src}
                            alt={`비전캠프 이미지 ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
          </div>*/}
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
                  src="/images/home/서울지역모임.jpg"
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
                <span className="font-semibold">정기 모임:</span> 매월 둘째 목요일
              </p>
              <p>
                <span className="font-semibold">장소:</span> NCMN 5K 운동본부 3층 ( 서울 영등포구 선유로 202)
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/home/인천경기지역모임.jpg"
                  alt="인천경기 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">인청경기 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                 인천경기 지역 대학의 회원들이 모여 해양 관련 프로젝트, 지역 문화
                탐방, 멘토링 프로그램을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 셋째 목요
              </p>
              <p>
                <span className="font-semibold">장소:</span> NCMN 5K 운동본부 2층 ( 서울 영등포구 선유로 202)
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/home/대전충청지역모임.png"
                  alt="대전충청 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">대전충청 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                대전충청 지역 대학의 회원들이 모여 과학기술 관련 스터디, 창업
                멘토링, 세미나 등을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 마지막 금요일  
              </p>
              <p>
                <span className="font-semibold">장소:</span> 뉴비전교회 (대전 대덕구 아리랑로 149 3층)
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/home/대구포항지역모임.jpg"
                  alt="대구포항 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">대구포항 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                대구포항 지역 대학의 회원들이 모여 문화예술 프로젝트, 지역사회
                봉사활동, 리더십 세미나를 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 마지막 주 화요일일
                
              </p>
              <p>
                <span className="font-semibold">장소:</span> NCMN 대구지부 사무실 (대주광역시 동구 효신로5길 10)
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8"
                  alt="부산창원 지역 모임"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">부산창원 지역 모임</h3>
              <p className="text-gray-600 mb-4">
                부산창원 지역 대학의 회원들이 모여 창업 관련 활동, 취업 컨설팅, 문화
                교류 프로그램을 진행합니다.
              </p>
              <p>
                <span className="font-semibold">정기 모임:</span> 매월 셋째 금요일
                
              </p>
              <p>
                <span className="font-semibold">장소:</span> NCMN 부산 비전센터(부산광역시 동래구 명장동 626)
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
