"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-36 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div className="gsap-scale max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold mb-10 gsap-fade-in leading-tight text-blue-800">
            함께 성장할 준비가 되셨나요?
          </h2>
          <p
            className="text-xl md:text-3xl mb-14 max-w-3xl mx-auto gsap-fade-in leading-relaxed text-gray-700"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            지금 NCMN 동아리에 가입하고 리더십 여정을 시작하세요. 같은 비전을
            가진 동료들과 함께 성장할 수 있는 기회입니다.
          </p>
          <div className="text-center mt-6 sm:mt-10">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/join"
                className="bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center touch-manipulation active:bg-blue-100"
              >
                체리 동아리 신청하기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
