import { HeroSection } from "@/components/home/HeroSection";
import { BusinessBulletinSection } from "@/components/home/BusinessBulletinSection";
import { PartnerBrandsSection } from "@/components/home/PartnerBrandsSection";
import { LeadersSection } from "@/components/home/LeadersSection";
import { MarketNewsSection } from "@/components/home/MarketNewsSection";
import { MagazineSection } from "@/components/home/MagazineSection";
import { MasterTalksSection } from "@/components/home/MasterTalksSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main className="home-page" style={{ width: "100%", overflowX: "hidden" }}>
      {/* 1. Full Viewport Width Edge-to-Edge Hero Section */}
      <HeroSection />

      {/* Inner Site Shell Container for Remaining Page Sections */}
      <div className="site-shell">
        {/* 2. Business Bulletin */}
        <BusinessBulletinSection />

        {/* 3. Our Partner Brands */}
        <PartnerBrandsSection />

        {/* 4. Featured Leaders & Executives */}
        <LeadersSection />

        {/* 5. Market News & Economic Dynamics */}
        <MarketNewsSection />

        {/* 6. Latest Magazine Issues */}
        <MagazineSection />

        {/* 7. Master Talks */}
        <MasterTalksSection />

        {/* 8. Executive Newsletter */}
        <NewsletterSection />
      </div>
    </main>
  );
}
