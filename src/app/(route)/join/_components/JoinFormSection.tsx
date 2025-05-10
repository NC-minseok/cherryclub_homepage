import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormData } from "../_types/form";
import {
  GENDER_OPTIONS,
  GRADE_OPTIONS,
  SEMESTER_OPTIONS,
} from "../_data/formOptions";

/**
 * @component JoinFormSection
 * @description 동아리 가입신청 폼 전체를 담당하는 컴포넌트입니다.
 * @example
 * <JoinFormSection />
 * @test
 * - 폼이 정상적으로 렌더링되는지 확인
 * - 각 필드/옵션이 올바르게 표시되는지 확인
 * - 제출/완료/에러 상태가 정상 동작하는지 확인
 */
const JoinFormSection: React.FC = () => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setIsSubmitting(false);
        return;
      }
      setIsSubmitted(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-green-100 border border-green-400 text-green-700 px-8 py-10 rounded-xl text-center mb-8">
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
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 gsap-fade-in">
            <h2 className="text-3xl font-bold mb-4">가입신청서 작성</h2>
            <p className="text-gray-600">
              아래 양식을 작성하여 NCMN 동아리 가입을 신청해주세요. 모든 항목은
              필수 입력사항입니다.
            </p>
          </div>
          {/* TODO: 에러 메시지 영역 필요시 추가 */}
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
                  {...register("name", { required: "이름을 입력해주세요" })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 font-medium text-gray-700"
                >
                  성별
                </label>
                <select
                  id="gender"
                  className={`w-full px-4 py-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  {...register("gender", { required: "성별을 선택해주세요" })}
                >
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label
                  htmlFor="birthday"
                  className="block mb-2 font-medium text-gray-700"
                >
                  생년월일
                </label>
                <input
                  type="date"
                  id="birthday"
                  className={`w-full px-4 py-2 border ${
                    errors.birthday ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  {...register("birthday", {
                    required: "생년월일을 입력해주세요",
                  })}
                />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.birthday.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="university"
                  className="block mb-2 font-medium text-gray-700"
                >
                  학교
                </label>
                <input
                  type="text"
                  id="university"
                  className={`w-full px-4 py-2 border ${
                    errors.university ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="OO대학교"
                  {...register("university", {
                    required: "학교를 입력해주세요",
                  })}
                />
                {errors.university && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.university.message as string}
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
                  {...register("major", { required: "전공을 입력해주세요" })}
                />
                {errors.major && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.major.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="student_id"
                  className="block mb-2 font-medium text-gray-700"
                >
                  학번
                </label>
                <input
                  type="text"
                  id="student_id"
                  className={`w-full px-4 py-2 border ${
                    errors.student_id ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="20231234"
                  {...register("student_id", {
                    required: "학번을 입력해주세요",
                  })}
                />
                {errors.student_id && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.student_id.message as string}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block mb-2 font-medium text-gray-700"
                >
                  지역
                </label>
                <input
                  type="text"
                  id="region"
                  className={`w-full px-4 py-2 border ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="서울/경기/부산 등"
                  {...register("region", { required: "지역을 입력해주세요" })}
                />
                {errors.region && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.region.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {...register("grade", { required: "학년을 선택해주세요" })}
                >
                  {GRADE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.grade.message as string}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="semester"
                  className="block mb-2 font-medium text-gray-700"
                >
                  학기
                </label>
                <select
                  id="semester"
                  className={`w-full px-4 py-2 border ${
                    errors.semester ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  {...register("semester", { required: "학기를 선택해주세요" })}
                >
                  {SEMESTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.semester.message as string}
                  </p>
                )}
              </div>
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
                  id="agree"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  {...register("agree", {
                    required: "개인정보 수집에 동의해주세요",
                  })}
                />
              </div>
              <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            {errors.agree && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agree.message as string}
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
        </div>
      </div>
    </section>
  );
};

export default JoinFormSection;
