import React from "react";

/**
 * @component JoinContactSection
 * @description 가입 문의/연락처 정보를 보여주는 영역입니다.
 * @example
 * <JoinContactSection />
 * @test
 * - 컴포넌트가 정상적으로 렌더링되는지 확인
 * - 이메일/전화번호가 올바르게 표시되는지 확인
 */
const JoinContactSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center gsap-fade-in">
        <h2 className="text-3xl font-bold mb-6">추가 문의사항</h2>
        <p className="text-lg text-gray-600 mb-8">
          가입 관련 추가 문의사항이 있으시면 아래 연락처로 문의해주세요
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="mailto:cherryclub@gmail.com"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            cherryclub@gmail.com
          </a>
          <a
            href="tel:+821050228934"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            010-5022-8934
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default JoinContactSection;
