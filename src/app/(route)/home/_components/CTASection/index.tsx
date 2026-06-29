import { motion, Variants } from "framer-motion";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/noriter_otr/";
// TODO: 7월 3일 5K 아웃리치 신청 링크로 교체
const OUTREACH_APPLY_URL = "#";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 bg-black overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-black to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        className="relative z-10 container mx-auto px-8 sm:px-16 md:px-24 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* 오버라인 레이블 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-blue-400" />
          <span className="text-blue-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
            Join Us
          </span>
          <span className="w-8 h-px bg-blue-400" />
        </motion.div>

        {/* 타이틀 */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(0,100,255,0.5)]"
        >
          함께 5K 운동에
          <br />
          동참하세요
        </motion.h2>

        {/* 일정 뱃지 */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/50 text-blue-200 text-sm font-medium backdrop-blur-sm bg-blue-950/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            2026.07.03 · 캠퍼스 주변 5K 아웃리치
          </span>
        </motion.div>

        {/* 설명 */}
        {/* <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-10"
        >
          캠퍼스 주변 반경 5Km, 절대 필요가 있는 이웃에게 예수님의 사랑을 전하는
          현장에 여러분을 초대합니다.
        </motion.p> */}

        {/* 버튼 */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* 신청 버튼 (주요 CTA) */}
          <motion.div
            className="inline-block w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={OUTREACH_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(0,100,255,0.4)] hover:shadow-[0_0_45px_rgba(0,100,255,0.6)] inline-flex items-center gap-2 touch-manipulation"
            >
              <span>5K 아웃리치 신청</span>
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

          {/* 인스타그램 버튼 (보조) */}
          <motion.div
            className="inline-block w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center border border-blue-400/50 text-blue-200 backdrop-blur-sm bg-blue-950/30 px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-blue-900/50 hover:border-blue-400 transition-all inline-flex items-center gap-2 touch-manipulation"
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
      </motion.div>
    </section>
  );
}
