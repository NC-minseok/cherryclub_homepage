"use client";

import { motion } from "framer-motion";
import { getChoseong } from "es-hangul";

interface UniversitySearchProps {
  universities: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function UniversitySearch({
  universities,
  searchQuery,
  onSearchChange,
}: UniversitySearchProps) {
  const filteredUniversities = universities.filter((uni) => {
    if (!searchQuery) return true;

    const searchQueryLower = searchQuery.toLowerCase();
    const uniLower = uni.toLowerCase();

    // 일반 검색
    if (uniLower.includes(searchQueryLower)) return true;

    // 초성 검색
    const uniChoseong = getChoseong(uni);
    const searchChoseong = getChoseong(searchQuery);

    return uniChoseong.includes(searchChoseong);
  });

  const showScrollGuide = filteredUniversities.length > 8;
  const noResults = searchQuery && filteredUniversities.length === 0;

  return (
    <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-100 mb-2">
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-full mr-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            <path d="M9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-blue-700 font-bold text-xs sm:text-sm">
          활동 대학 ({universities.length}개)
        </p>
      </div>

      {/* 대학 검색 입력 필드 */}
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="대학 검색 (초성 검색 가능)..."
          className="w-full pl-7 sm:pl-8 pr-4 py-1 text-xs bg-white/80 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => onSearchChange("")}
          >
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 대학 목록 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-h-20 sm:max-h-32 overflow-y-auto pr-1 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#93C5FD transparent",
        }}
      >
        <div className="flex flex-wrap gap-1">
          {filteredUniversities.map((university, index) => (
            <motion.span
              key={index}
              className="inline-flex items-center bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-blue-700 border border-blue-200 shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1 + index * 0.03,
                duration: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(219, 234, 254, 0.8)",
                transition: { duration: 0.1 },
              }}
            >
              {university}
            </motion.span>
          ))}
        </div>

        {/* 검색 결과가 없을 때 표시할 메시지 */}
        {noResults && (
          <div className="text-center py-2 text-blue-500 text-[10px] sm:text-xs">
            "{searchQuery}"에 대한 검색 결과가 없습니다
          </div>
        )}
      </motion.div>

      {/* 스크롤 안내 메시지 */}
      {showScrollGuide && (
        <div className="text-center mt-1">
          <span className="text-blue-500 text-[9px] sm:text-xs italic">
            ↑↓ 스크롤하여 더 보기
          </span>
        </div>
      )}
    </div>
  );
}
