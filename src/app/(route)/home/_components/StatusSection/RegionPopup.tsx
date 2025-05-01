"use client";

import { useState } from "react";
import { RegionData } from "../../_types/regionData";
import { motion, AnimatePresence } from "framer-motion";
import { Masker } from "@toss/utils";

interface RegionPopupProps {
  selectedRegion: RegionData | null;
  onClose: () => void;
}

export default function RegionPopup({
  selectedRegion,
  onClose,
}: RegionPopupProps) {
  // 대학 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState("");

  // 검색어 변경 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 선택된 지역이 없으면 null 반환
  if (!selectedRegion) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/60 p-3 sm:p-4 m-2 sm:m-3 max-w-xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 영역 */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <svg
                width="16"
                height="20"
                viewBox="0 0 30 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M15 0C6.72 0 0 6.72 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.72 23.28 0 15 0Z"
                  fill="#E5172F"
                  fillOpacity="0.8"
                />
              </svg>
              {selectedRegion.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 bg-white/80 rounded-full p-1 transition-colors border border-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
          </div>

          {/* 통계 요약 컴포넌트 */}
          <StatsSummary
            leader={selectedRegion.leader}
            universitiesCount={selectedRegion.universities.length}
            membersCount={selectedRegion.count}
          />

          {/* 대학 검색 컴포넌트 */}
          <div className="text-xs">
            <UniversitySearch
              universities={selectedRegion.universities}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>

          {/* 스타일 정의 */}
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #93c5fd;
              border-radius: 20px;
            }
          `}</style>

          {/* 문의하기 버튼 */}
          <div className="mt-3 sm:mt-4 flex justify-center">
            <motion.button
              className="inline-flex items-center bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition-colors text-xs sm:text-sm font-bold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              문의하기
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// 지역 통계 요약 컴포넌트
interface StatsSummaryProps {
  leader: string;
  universitiesCount: number;
  membersCount: number;
}

function StatsSummary({
  leader,
  universitiesCount,
  membersCount,
}: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
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

// 대학 검색 컴포넌트
interface UniversitySearchProps {
  universities: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function UniversitySearch({
  universities,
  searchQuery,
  onSearchChange,
}: UniversitySearchProps) {
  const filteredUniversities = universities.filter((uni) =>
    searchQuery ? uni.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

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
          placeholder="대학 검색..."
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
