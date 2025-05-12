"use client";

import { motion } from "framer-motion";
import { Masker } from "@toss/utils";

interface StatsSummaryProps {
  leader: string;
  universitiesCount: number;
  membersCount: number;
}

export function StatsSummary({
  leader,
  universitiesCount,
  membersCount,
}: StatsSummaryProps) {
  return (
    <div
      className={`grid ${leader ? "grid-cols-3" : "grid-cols-2"} gap-2 mb-3`}
    >
      {leader && (
        <motion.div
          className="col-span-1 flex flex-col items-center justify-center text-center bg-red-50 py-2 px-1 sm:p-3 rounded-lg border border-red-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full mb-1 sm:mb-2 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-6 sm:w-6 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-red-700">
            지부장
          </div>
          <motion.div
            className="text-xs sm:text-base font-bold text-red-600 mt-1"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {Masker.maskName(leader)}
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="col-span-1 flex flex-col items-center justify-center text-center bg-blue-50 py-2 px-1 sm:p-3 rounded-lg border border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-1 sm:mb-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        </div>
        <div className="text-[10px] sm:text-xs font-bold text-blue-700">
          활동 대학
        </div>
        <motion.div
          className="text-sm sm:text-lg font-bold text-blue-600 mt-1"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {universitiesCount}개
        </motion.div>
      </motion.div>

      <motion.div
        className="col-span-1 flex flex-col items-center justify-center text-center bg-green-50 py-2 px-1 sm:p-3 rounded-lg border border-green-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full mb-1 sm:mb-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <div className="text-[10px] sm:text-xs font-bold text-green-700">
          활동 인원
        </div>
        <motion.div
          className="text-sm sm:text-lg font-bold text-green-600 mt-1"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          {membersCount}명
        </motion.div>
      </motion.div>
    </div>
  );
}
