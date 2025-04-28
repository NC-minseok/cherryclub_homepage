"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { regions, stats } from "@/src/data/home";
import { RegionData } from "@/src/types/home";
import StatCounter from "./StatCounter";
import RegionPopup from "./RegionPopup";

export default function StatusSection() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "-100px 0px",
  });

  // 지역 클릭 핸들러
  const handleRegionClick = (region: RegionData) => {
    setSelectedRegion(region);
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-block mb-2 px-4 py-1.5 bg-blue-600/10 rounded-full">
            <span className="text-blue-700 font-semibold text-sm">
              전국 현황
            </span>
          </div>
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-8 gsap-fade-in bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-md bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            체리 동아리 전국 현황
          </motion.h1>

          {/* 통계 수치 */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-3 mt-6 sm:mt-8 mb-10 sm:mb-16 max-w-3xl mx-auto px-4 sm:px-0"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  scale: 1.03,
                }}
              >
                {/* 배경 그라데이션 효과 */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                  initial={{ width: "0%" }}
                  animate={isStatsInView ? { width: "100%" } : { width: "0%" }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                />

                <motion.div
                  className="text-blue-600 font-bold text-xl sm:text-2xl md:text-3xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isStatsInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <StatCounter value={stat.value} isInView={isStatsInView} />
                </motion.div>
                <motion.div
                  className="text-gray-600 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative mx-auto max-w-3xl gsap-scale"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* 지도 컨테이너 */}
          <div className="relative aspect-[508/585] max-w-xs sm:max-w-sm md:max-w-2xl mx-auto">
            {/* 배경 지도 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl transform -rotate-3 scale-105"></div>
                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl transform rotate-3 scale-105"></div>
                <Image
                  src="/svg/home/map.svg"
                  alt="대한민국 지도"
                  width={508}
                  height={585}
                  className="w-full h-auto drop-shadow-md"
                  priority
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </div>

            {/* 지역 핀 */}
            {regions.map((region) => (
              <motion.div
                key={region.id}
                className="absolute"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                initial={{ y: -50, opacity: 0, scale: 1.2 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{
                  once: true,
                  margin: "-100px 0px",
                }}
                transition={{
                  delay: region.id * 0.3,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                whileHover={{ y: -3 }}
                onClick={() => handleRegionClick(region)}
              >
                <div className="relative cursor-pointer group">
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: region.id * 0.3 + 0.2,
                      duration: 0.3,
                    }}
                  >
                    <svg
                      width="24"
                      height="32"
                      viewBox="0 0 30 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-lg w-4 h-5 sm:w-6 sm:h-8"
                    >
                      <path
                        d="M15 0C6.72 0 0 6.72 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.72 23.28 0 15 0ZM15 20.5C12 20.5 9.5 18 9.5 15C9.5 12 12 9.5 15 9.5C18 9.5 20.5 12 20.5 15C20.5 18 18 20.5 15 20.5Z"
                        fill="#E5172F"
                      />
                      <circle cx="15" cy="15" r="7" fill="white" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold border-2 border-white shadow-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: region.id * 0.3 + 0.4,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    {region.count}
                  </motion.div>

                  {/* 핀이 꽂힐 때 나타나는 효과 */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.7 }}
                    whileInView={{ scale: 2.5, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: region.id * 0.3 + 0.1,
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-1/2 -ml-3 -mt-3 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}

            {/* 지역 팝업 정보 */}
            <RegionPopup
              selectedRegion={selectedRegion}
              onClose={() => setSelectedRegion(null)}
            />

            {/* 지도 위 그래디언트 오버레이 (애플 스타일) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-30" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-blue-50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-50 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
