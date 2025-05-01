"use client";

import { motion } from "framer-motion";
import { StatData } from "../../_types/regionData";
import StatCounter from "./StatCounter";

// 통계 그리드 컴포넌트
interface StatsGridProps {
  stats: StatData[];
  isStatsInView: boolean;
}

export default function StatsGrid({ stats, isStatsInView }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6 sm:mt-8 mb-10 sm:mb-16 max-w-3xl mx-auto px-4 sm:px-0">
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
  );
}
