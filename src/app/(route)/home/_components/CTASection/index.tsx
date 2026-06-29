import { motion } from "framer-motion";
import Link from "next/link";
import useScrollAnimation from "@/src/shared/hook/useScrollAnimation";

const INSTAGRAM_URL = "https://instagram.com/cherryclub_official";
// TODO: 7월 3일 5K 아웃리치 신청 링크로 교체
const OUTREACH_APPLY_URL = "#";

export default function CTASection() {
  const { itemVariants, style } = useScrollAnimation();

  return (
    <section className="py-36 bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...style }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-xl md:text-7xl mb-14 max-w-3xl mx-auto leading-relaxed text-gray-700"
            style={{
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block mb-2 text-blue-600 font-bold">
              7월 5일,
            </span>
            <span className="block mb-2 text-indigo-600 font-bold">
              5K 아웃리치에
            </span>
            <span className="block text-violet-600 font-bold">
              함께 달려요!
            </span>
          </motion.h1>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* 인스타그램 버튼 */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full font-semibold text-base sm:text-xl hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-2 touch-manipulation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>인스타그램</span>
              </Link>
            </motion.div>

            {/* 구분선 */}
            <span className="hidden sm:block text-gray-400 text-2xl select-none">|</span>

            {/* 신청 버튼 */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={OUTREACH_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 border-2 border-blue-600 px-4 sm:px-8 py-2 sm:py-4 rounded-full font-semibold text-base sm:text-xl hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2 touch-manipulation active:bg-blue-100"
              >
                <span>7/5 아웃리치 신청</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
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
        </motion.div>
      </div>
    </section>
  );
}
