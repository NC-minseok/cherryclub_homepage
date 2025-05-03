"use client";

import HeroTitleSection from "./_components/HeroTitleSection";
import IntroductionSection from "./_components/IntroductionSection/indext";
import StatusSection from "./_components/StatusSection";
import CTASection from "./_components/CTASection";

export default function Home() {
  return (
    <div
      className="min-h-screen text-gray-800 overflow-hidden"
      suppressHydrationWarning
    >
      <HeroTitleSection />
      <IntroductionSection />
      <StatusSection />
      <CTASection />
    </div>
  );
}
