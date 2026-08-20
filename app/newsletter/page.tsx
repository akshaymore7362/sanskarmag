import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Newsletter | The Success World",
  description: "Subscribe to The Success World's premium business newsletter.",
};

export default function NewsletterPage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Newsletter" intro="A weekly executive briefing on leadership, technology, markets and business momentum." eyebrow="Executive Briefing" />
      <section className="content-bands newsletter-benefits">
        <div><h2>What You Get</h2><p>Original essays, market signals, profile highlights and the stories our editors think matter most.</p></div>
        <div><h2>Cadence</h2><p>Delivered every Monday with occasional special briefings around major events and issue launches.</p></div>
      </section>
      <NewsletterSection />
    </main>
  );
}
