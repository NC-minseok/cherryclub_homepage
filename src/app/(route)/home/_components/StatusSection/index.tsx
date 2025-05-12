"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { RegionData } from "../../_types/regionData";
import SectionTag from "../SectionTag";
import StatsGrid from "./StatsGrid";
import MapContainer from "./MapContainer";
import { AnimatedTitle } from "@/src/shared/components";
import useClientClubStatus from "@/src/app/(route)/home/_hook/useClientClubStatus";

export default function StatusSection() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const { regions, stats } = useClientClubStatus();

  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "-100px 0px",
  });

  // 지역 클릭 핸들러
  const handleRegionClick = (region: RegionData) => {
    setSelectedRegion(region);
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setSelectedRegion(null);
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <div className="flex flex-col items-center justify-center">
            <SectionTag text="전국 현황" />
            <AnimatedTitle text="체리 동아리 전국 현황" />
          </div>

          {/* 통계 수치 */}
          <div ref={statsRef}>
            <StatsGrid stats={stats} isStatsInView={isStatsInView} />
          </div>
        </div>

        <MapContainer
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionClick={handleRegionClick}
          onClosePopup={handleClosePopup}
        />
      </div>
    </section>
  );
}
