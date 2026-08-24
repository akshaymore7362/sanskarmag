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
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* INNER SITE SHELL FOR REMAINING SECTIONS */}
      <div className="site-shell">
        {/* 2. BUSINESS BULLETIN (ENTERPRISE & MARKET INTELLIGENCE) */}
        <BusinessBulletinSection />

        {/* 3. WEB PROFILES (DIRECTLY AFTER BUSINESS BULLETIN) */}
        <WebProfilesSection />

        {/* 4. DAILY LIVE NEWS (REAL-TIME TODAY'S HEADLINES) */}
        <DailyNewsSection />

        {/* 5. THE INTELLIGENCE BRIEF */}
        <IntelligenceBrief />

        {/* 6. LEADERSHIP LENS */}
        <LeadershipLens />

        {/* 7. OUR PARTNER BRANDS (STRATEGIC ALLIANCES) */}
        <PartnerBrandsSection />

        {/* 8. LATEST MAGAZINE ISSUES */}
        <MagazineSection />

        {/* 9. MASTER TALKS & INTERVIEWS */}
        <MasterTalksSection />

        {/* 10. EXECUTIVE BRIEFING NEWSLETTER */}
        <NewsletterSection />
      </div>
    </main>
  );
}
