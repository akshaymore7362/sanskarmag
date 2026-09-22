import { HeroSection } from "@/components/home/HeroSection";
import { BusinessBulletinSection } from "@/components/home/BusinessBulletinSection";
import { WebProfilesSection } from "@/components/home/WebProfilesSection";
import { MagazineSyncProvider } from "@/components/home/MagazineSyncContext";
import { DailyNewsSection } from "@/components/home/DailyNewsSection";
import { IntelligenceBrief } from "@/components/home/IntelligenceBrief";
import { LeadershipLens } from "@/components/home/LeadershipLens";
import { PartnerBrandsSection } from "@/components/home/PartnerBrandsSection";
import { MagazineSection } from "@/components/home/MagazineSection";
import { MasterTalksSection } from "@/components/home/MasterTalksSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";

// Re-generate this page in the background at most once a minute, so the
// homepage stays a fast pre-rendered page (no client-side fetch wait) while
// still picking up new Sanity content within a minute — never a full
// rebuild-only freeze.
export const revalidate = 60;

export default async function Home() {
  // Fetched here, server-side, so the Hero cover and Web Profile spotlight
  // render with real data on the very first response — no client mount →
  // fetch → wait round trip, which is what made them slow to appear.
  const [issues, profiles] = await Promise.all([
    magazineService.fetchSanityMagazines(),
    leaderService.fetchSanityLeaders(),
  ]);

  return (
    <main className="home-page" style={{ width: "100%", overflowX: "hidden" }}>
      {/* 1 + 2 + 3. HERO and EXECUTIVE DIRECTORY share one selected-issue index
          via MagazineSyncProvider (wrapped around this range, page order
          unchanged), so the Web Profile below always matches the magazine
          cover currently active in the Hero slider. HeroSection plays its
          own load-in animation, not scroll-triggered. */}
      <MagazineSyncProvider initialIssues={issues}>
        <HeroSection />

        {/* 2. BUSINESS BULLETIN */}
        <div className="tsw-reveal"><BusinessBulletinSection /></div>

        {/* 3. EXECUTIVE DIRECTORY */}
        <div className="tsw-reveal"><WebProfilesSection initialProfiles={profiles} /></div>
      </MagazineSyncProvider>

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
