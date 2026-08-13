import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/editorial/PageIntro";

export const metadata: Metadata = {
  title: "Advertise | Momentum Magazine",
  description: "Advertising, sponsorship and media kit information for Momentum Magazine.",
};

export default function AdvertisePage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Advertise" intro="Reach senior decision-makers, founders and operators through premium editorial environments." eyebrow="Media Partnerships" />
      <section className="media-kit-grid">
        {["Digital Advertising", "Magazine Advertising", "Sponsored Content", "Events", "Research Briefings", "Newsletter Sponsorship"].map((item) => (
          <article key={item}><h2>{item}</h2><p>Premium placements designed for high-intent readers who value business intelligence and leadership insight.</p></article>
        ))}
      </section>
      <section className="signal-band">
        <h2>Audience</h2>
        <p>Founders, C-suite executives, investors, operators and policy-aware business leaders across global markets.</p>
        <Link href="/contact">Request Media Kit</Link>
      </section>
    </main>
  );
}
