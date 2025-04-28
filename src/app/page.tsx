"use client";

import HeroSection from "@/src/components/home/HeroSection";
import IntroductionSection from "@/src/components/home/IntroductionSection";
import StatusSection from "@/src/components/home/StatusSection";
import CTASection from "@/src/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-800 overflow-hidden">
      <HeroSection />
      <IntroductionSection />
      <StatusSection />
      <CTASection />
    </div>
  );
}
