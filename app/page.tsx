import { HeroSection } from "@/components/home/HeroSection";
import { BusinessBulletinSection } from "@/components/home/BusinessBulletinSection";
import { WebProfilesSection } from "@/components/home/WebProfilesSection";
import { DailyNewsSection } from "@/components/home/DailyNewsSection";
import { IntelligenceBrief } from "@/components/home/IntelligenceBrief";
import { LeadershipLens } from "@/components/home/LeadershipLens";
import { PartnerBrandsSection } from "@/components/home/PartnerBrandsSection";
import { MagazineSection } from "@/components/home/MagazineSection";
import { MasterTalksSection } from "@/components/home/MasterTalksSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main className="home-page" style={{ width: "100%", overflowX: "hidden" }}>
      {/* 1. HERO — plays its own load-in animation, not scroll-triggered */}
      <HeroSection />

      {/* 2. BUSINESS BULLETIN */}
      <div className="tsw-reveal"><BusinessBulletinSection /></div>

      {/* 3. EXECUTIVE DIRECTORY */}
      <div className="tsw-reveal"><WebProfilesSection /></div>

      {/* 4. DAILY LIVE NEWS */}
      <div className="tsw-reveal"><DailyNewsSection /></div>

      {/* 5. THE INTELLIGENCE BRIEF */}
      <div className="tsw-reveal"><IntelligenceBrief /></div>

      {/* 6. LEADERSHIP LENS */}
      <div className="tsw-reveal"><LeadershipLens /></div>

      {/* 7. PARTNER BRANDS */}
      <div className="tsw-reveal"><PartnerBrandsSection /></div>

      {/* 8. LATEST MAGAZINE ISSUES */}
      <div className="tsw-reveal"><MagazineSection /></div>

      {/* 9. MASTER TALKS & INTERVIEWS */}
      <div className="tsw-reveal"><MasterTalksSection /></div>

      {/* 10. EXECUTIVE BRIEFING NEWSLETTER */}
      <div className="tsw-reveal"><NewsletterSection /></div>
    </main>
  );
}
