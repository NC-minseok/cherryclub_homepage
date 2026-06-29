import { motion } from "framer-motion";
import Link from "next/link";
import useScrollAnimation from "@/src/shared/hook/useScrollAnimation";

const INSTAGRAM_URL = "https://www.instagram.com/noriter_otr/";
// TODO: 7월 3일 5K 아웃리치 신청 링크로 교체
const OUTREACH_APPLY_URL = "#";

export default function CTASection() {
  const { itemVariants, style } = useScrollAnimation();

  return (
    <section className="py-10 bg-black relative overflow-hidden flex items-center justify-center">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.p
          className="text-blue-200 text-sm sm:text-base font-semibold tracking-widest uppercase flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="w-8 h-px bg-blue-400 inline-block" />
          캠퍼스 주변 5K 아웃리치 신청
          <span className="w-8 h-px bg-blue-400 inline-block" />
        </motion.p>
        <motion.div
          className="flex flex-row items-center gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...style }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
              className="border border-blue-400/50 text-blue-200 backdrop-blur-sm bg-blue-950/30 px-6 py-3 rounded-full font-semibold text-base hover:bg-blue-900/50 hover:border-blue-400 transition-all shadow-lg inline-flex items-center gap-2 touch-manipulation"
            >
              <span>7/3 5K 아웃리치 신청</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-full font-semibold text-base hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-2 touch-manipulation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>인스타그램</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
