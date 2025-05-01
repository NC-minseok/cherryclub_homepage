"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RegionData } from "../../_types/regionData";
import RegionPopup from "./RegionPopup";

// 지도 컨테이너 컴포넌트
interface MapContainerProps {
  regions: RegionData[];
  selectedRegion: RegionData | null;
  onRegionClick: (region: RegionData) => void;
  onClosePopup: () => void;
}

export default function MapContainer({
  regions,
  selectedRegion,
  onRegionClick,
  onClosePopup,
}: MapContainerProps) {
  return (
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
              delay: region.id * 0.1,
              duration: 0.6,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            whileHover={{ y: -3 }}
            onClick={() => onRegionClick(region)}
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
                  delay: region.id * 0.3 + 0.2,
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
        <RegionPopup selectedRegion={selectedRegion} onClose={onClosePopup} />

        {/* 지도 위 그래디언트 오버레이 (애플 스타일) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-30" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-blue-50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-50 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
