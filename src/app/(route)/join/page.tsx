"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FormData {
  name: string;
  phone: string;
  email: string;
  school: string;
  major: string;
  grade: string;
  interest: string;
  message: string;
  terms: boolean;
}

export default function JoinPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/application/cherry_club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === "duplicate_phone") {
        } else if (result.error === "duplicate_email") {
        } else {
        }
        setIsSubmitting(false);
        return;
      }

      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28">
      {/* 히어로 섹션 */}
      <section className="bg-blue-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              동아리 가입신청
            </h1>
            <p className="text-xl mb-8">
              NCMN 동아리와 함께 성장할 준비가 되셨나요? 아래 양식을 작성하여
              지금 가입 신청을 해보세요!
            </p>
          </div>
        </div>
      </section>

      {/* 가입 양식 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-10 rounded-xl text-center mb-8">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h2 className="text-2xl font-bold mb-4">
                  가입신청이 완료되었습니다!
                </h2>
                <p className="mb-4">
                  NCMN 동아리 가입 신청서가 성공적으로 제출되었습니다. 입력하신
                  이메일로 추가 안내사항을 보내드릴 예정이니 확인해주세요.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  다시 작성하기
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12 gsap-fade-in">
                  <h2 className="text-3xl font-bold mb-4">가입신청서 작성</h2>
                  <p className="text-gray-600">
                    아래 양식을 작성하여 NCMN 동아리 가입을 신청해주세요. 모든
                    항목은 필수 입력사항입니다.
                  </p>
                </div>

                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"></div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 gsap-fade-in"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        이름
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="홍길동"
                        {...register("name", {
                          required: "이름을 입력해주세요",
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        연락처
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className={`w-full px-4 py-2 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="010-1234-5678"
                        {...register("phone", {
                          required: "연락처를 입력해주세요",
                          pattern: {
                            value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                            message: "올바른 전화번호 형식이 아닙니다",
                          },
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "올바른 이메일 형식이 아닙니다",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="school"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        학교
                      </label>
                      <input
                        type="text"
                        id="school"
                        className={`w-full px-4 py-2 border ${
                          errors.school ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="OO대학교"
                        {...register("school", {
                          required: "학교를 입력해주세요",
                        })}
                      />
                      {errors.school && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.school.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="major"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        전공
                      </label>
                      <input
                        type="text"
                        id="major"
                        className={`w-full px-4 py-2 border ${
                          errors.major ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        placeholder="OO학과"
                        {...register("major", {
                          required: "전공을 입력해주세요",
                        })}
                      />
                      {errors.major && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.major.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="grade"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      학년
                    </label>
                    <select
                      id="grade"
                      className={`w-full px-4 py-2 border ${
                        errors.grade ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      {...register("grade", {
                        required: "학년을 선택해주세요",
                      })}
                    >
                      <option value="">학년 선택</option>
                      <option value="1">1학년</option>
                      <option value="2">2학년</option>
                      <option value="3">3학년</option>
                      <option value="4">4학년</option>
                      <option value="other">그 외</option>
                    </select>
                    {errors.grade && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.grade.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      관심 분야
                    </label>
                    <select
                      id="interest"
                      className={`w-full px-4 py-2 border ${
                        errors.interest ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      {...register("interest", {
                        required: "관심 분야를 선택해주세요",
                      })}
                    >
                      <option value="">관심 분야 선택</option>
                      <option value="leadership">리더십 훈련</option>
                      <option value="campus">캠퍼스 사역</option>
                      <option value="gatherings">전체/지역 모임</option>
                      <option value="external">대외 사역</option>
                      <option value="all">모든 분야</option>
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.interest.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      가입 동기
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-2 border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="NCMN 동아리에 가입하고자 하는 동기를 자유롭게 작성해주세요."
                      {...register("message", {
                        required: "가입 동기를 입력해주세요",
                        minLength: {
                          value: 30,
                          message: "최소 30자 이상 작성해주세요",
                        },
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message as string}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        {...register("terms", {
                          required: "개인정보 수집에 동의해주세요",
                        })}
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-600"
                    >
                      개인정보 수집 및 이용에 동의합니다.
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.terms.message as string}
                    </p>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-blue-600 text-white rounded-full font-medium text-lg hover:bg-blue-700 transition-colors ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "제출 중..." : "가입 신청하기"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center gsap-fade-in">
              자주 묻는 질문
            </h2>

            <div className="space-y-6 gsap-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  가입 절차는 어떻게 되나요?
                </h3>
                <p className="text-gray-600">
                  가입 신청서 제출 후 담당자의 검토를 거쳐 개별 연락을 통해 면담
                  일정을 잡게 됩니다. 간단한 면담 후 최종 가입이 확정되며, 전체
                  과정은 약 1-2주 소요됩니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">회비가 있나요?</h3>
                <p className="text-gray-600">
                  NCMN 동아리는 학기별 소정의 회비를 수납하고 있습니다. 회비는
                  동아리 활동 및 행사 운영에 사용되며, 정확한 금액은 가입 확정
                  후 안내해 드립니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  활동 시간 부담이 큰가요?
                </h3>
                <p className="text-gray-600">
                  기본적으로 월 2회 정기 모임과 학기당 1-2회의 전체 행사 참여가
                  필요합니다. 그 외 활동은 본인의 관심과 참여 의사에 따라
                  자유롭게 결정할 수 있습니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  타 학교 학생도 가입 가능한가요?
                </h3>
                <p className="text-gray-600">
                  네, 타 학교 학생도 가입 가능합니다. NCMN은 다양한 대학의
                  학생들이 함께 활동하며 교류하는 것을 장려합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center gsap-fade-in">
            <h2 className="text-3xl font-bold mb-6">추가 문의사항</h2>
            <p className="text-lg text-gray-600 mb-8">
              가입 관련 추가 문의사항이 있으시면 아래 연락처로 문의해주세요
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="mailto:info@ncmn.org"
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
                info@ncmn.org
              </a>
              <a
                href="tel:+821012345678"
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
                010-1234-5678
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
