"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { CardData } from "../../_types/cardData";
import ImageLightbox from "./ImageLightbox";

type CardProps = {
  card: CardData;
  index: number;
  isMobile: boolean;
};

export default function IntroductionCard({ card, index, isMobile }: CardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // openVideoFirst가 설정된 카드는 첫 영상부터(미디어 배열에서 이미지 다음) 열림
  const defaultIndex =
    card.openVideoFirst && (card.videos?.length ?? 0) > 0
      ? card.images.length
      : 0;

  const openLightbox = (i = defaultIndex) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        key={card.id}
        className={`group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 flex flex-col w-full h-full ${
          isMobile ? "mx-auto px-4" : ""
        }`}
        whileHover={
          isMobile ? undefined : { y: -8, transition: { duration: 0.3 } }
        }
        whileTap={{ scale: 0.98 }}
        onClick={() => openLightbox()}
        style={{ cursor: "zoom-in" }}
      >
        <div
          className={`absolute -right-20 -top-20 w-40 h-40 ${card.bgColor1} rounded-full opacity-30`}
        />

        {/* 이미지 */}
        <div className="relative h-52 sm:h-64 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 shadow-lg block w-full text-left">
          <Image
            src={card.images[0]}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />

          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full">
            <span className="text-blue-700 font-semibold text-xs sm:text-sm">
              {card.tag}
            </span>
          </div>

          {/* 미디어 장수 배지 */}
          {(card.images.length > 1 || (card.videos?.length ?? 0) > 0) && (
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              {card.images.length + (card.videos?.length ?? 0)}
            </div>
          )}

          {/* 확대 힌트 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-2 0v1m0-3v1m-4 2H9m3 0h1"
                />
              </svg>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm mr-2 sm:mr-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {card.title}
        </h3>

        <div className="overflow-hidden mb-4">
          {card.descriptions.map((desc: string, i: number) => (
            <p
              key={i}
              className="text-sm sm:text-base text-gray-600"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {desc}
            </p>
          ))}
        </div>
      </motion.div>

      {/* 라이트박스 포탈 */}
      {lightboxOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <ImageLightbox
              images={card.images}
              videos={card.videos}
              initialIndex={lightboxIndex}
              title={card.title}
              onClose={() => setLightboxOpen(false)}
            />
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
