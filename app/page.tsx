import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedStories } from "@/components/home/FeaturedStories";
import { MagazineSection } from "@/components/home/MagazineSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { InsightsSection } from "@/components/home/InsightsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { MarketIntelligenceSection } from "@/components/home/MarketIntelligenceSection";
import { StartupWatchSection } from "@/components/home/StartupWatchSection";
import { EditorsBriefingSection } from "@/components/home/EditorsBriefingSection";

export default function Home() {
  return (
    <main className="site-shell">
      <HeroSection />
      <FeaturedStories />
      <MagazineSection />
      <LatestArticles />
      <EditorsBriefingSection />
      <MarketIntelligenceSection />
      <StartupWatchSection />
      <InsightsSection />
      <EventsSection />
      <NewsletterSection />
    </main>
  );
}
