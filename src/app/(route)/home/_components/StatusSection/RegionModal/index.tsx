"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegionModalProps } from "./types";
import { StatsSummary } from "./StatsSummary";
import { UniversitySearch } from "./UniversitySearch";

export default function RegionModal({
  selectedRegion,
  onClose,
}: RegionModalProps) {
  // 대학 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState("");

  // 검색어 변경 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 팝업 닫기 핸들러
  const handleClose = () => {
    setSearchQuery(""); // 검색 상태 초기화
    onClose();
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
        onClick={handleClose}
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
              onClick={handleClose}
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
              <a
                href="https://www.instagram.com/kings_hero0214/?igsh=MWxoZWU5NGZhd3g0bQ%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
              >
                문의하기
              </a>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
