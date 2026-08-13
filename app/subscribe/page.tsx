import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Subscribe | Momentum Magazine",
  description: "Subscribe to Momentum Magazine for print and digital editions.",
};

export default function SubscribePage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Subscribe" intro="Get full access to Momentum Magazine print issues, digital archives, and exclusive executive briefings." eyebrow="Membership" />
      <section className="content-bands newsletter-benefits">
        <div>
          <h2>Digital Access</h2>
          <p>Unlimited access to all articles, digital magazine archives, and subscriber-only deep dives.</p>
        </div>
        <div>
          <h2>Print + Digital</h2>
          <p>Receive all print editions delivered to your office or home plus full digital portal access.</p>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
