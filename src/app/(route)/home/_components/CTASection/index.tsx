"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTag from "../SectionTag";

export default function CTASection() {
  return (
    <section className="py-36 bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <SectionTag text="체리동아리 신청하기" />
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-xl md:text-7xl mb-14 max-w-3xl mx-auto leading-relaxed text-gray-700"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="block mb-2 text-blue-600 font-bold">
              오늘은 캠퍼스로!
            </span>
            <span className="block mb-2 text-indigo-600 font-bold">
              내일은 열방으로!
            </span>
            <span className="block text-violet-600 font-bold">
              체리동아리가 함께합니다!
            </span>
          </motion.h1>
          <motion.div
            className="text-center mt-10"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/join"
                className="bg-white text-blue-600 border-2 border-blue-600 px-4 sm:px-8 py-2 sm:py-4 rounded-full font-semibold text-base sm:text-xl hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center touch-manipulation active:bg-blue-100"
              >
                <span>체리 동아리 신청하기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
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
          </motion.div>
          <motion.p
            className="text-sm text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          ></motion.p>
        </motion.div>
      </div>
    </section>
  );
}
