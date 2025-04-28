"use client";

import HeroSection from "@/src/app/(route)/home/_components/HeroSection";
import IntroductionSection from "@/src/app/(route)/home/_components/IntroductionSection";
import StatusSection from "@/src/app/(route)/home/_components/StatusSection";
import CTASection from "@/src/app/(route)/home/_components/CTASection";

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
