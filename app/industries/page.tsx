"use client";

import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustryDirectoryGrid } from "@/components/industry/IndustryDirectoryGrid";
import { FeaturedIndustryCard } from "@/components/industry/FeaturedIndustryCard";
import { LatestIndustryIntelligence } from "@/components/industry/LatestIndustryIntelligence";
import { IndustrySidebar } from "@/components/industry/IndustrySidebar";
import { IndustryValueStrip } from "@/components/industry/IndustryValueStrip";

export default function IndustriesPage() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingBottom: "24px" }}>
      {/* 1. Compact Explore Industries Hero (300-350px high) */}
      <IndustryHero />

      {/* 2. Main Industry Directory (Compact 4-Column Desktop Grid) */}
      <IndustryDirectoryGrid />

      {/* 3. Featured Industry (Horizontal 50/50 Layout) */}
      <FeaturedIndustryCard />

      {/* 4. Latest Industry Intelligence (5 Article Rows) + Trending Sidebar (2 Modules) */}
      <div
        className="grid-sidebar-layout"
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 6vw 40px",
        }}
      >
        <LatestIndustryIntelligence />
        <IndustrySidebar />
      </div>

      {/* 5. Small Value Strip */}
      <IndustryValueStrip />
    </main>
  );
}
