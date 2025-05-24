import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CardData } from "../../_types/cardData";

type CardProps = {
  card: CardData;
  index: number;
  isMobile: boolean;
};

export default function IntroductionCard({ card, index, isMobile }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      key={card.id}
      className={`group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 flex flex-col ${
        isMobile ? "min-w-full h-[350px] mx-auto px-4" : "mx-2"
      }`}
      whileHover={
        isMobile ? undefined : { y: -8, transition: { duration: 0.3 } }
      }
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`absolute -right-20 -top-20 w-40 h-40 ${card.bgColor1} rounded-full opacity-30`}
      />

      <div className="relative h-52 sm:h-64 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-lg">
        <Image
          src={card.image}
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
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 flex items-center">
        <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm mr-2 sm:mr-3">
          {String(index + 1).padStart(2, "0")}
        </span>
        {card.title}
      </h3>

      <div className="overflow-hidden mb-4 h-[120px]">
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

      {/* <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6">
        <Link
          href={card.link}
          className="touch-manipulation inline-flex items-center text-blue-600 font-medium text-base hover:text-blue-500 transition-colors group-hover:underline active:text-blue-700"
        >
          자세히 알아보기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 ml-2 transition-transform group-hover:translate-x-2"
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
      </div> */}
    </motion.div>
  );
}
