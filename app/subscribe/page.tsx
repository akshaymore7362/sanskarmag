import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscribe | The Success World",
  description: "Subscribe to The Success World for print and digital editions.",
};

const tiers = [
  {
    name: "Digital Membership",
    price: "$19",
    period: "/ month",
    features: [
      "Unlimited digital access to all web stories",
      "Full digital PDF magazine issue archive",
      "Weekly executive email briefings",
      "Subscriber-only market research reports",
    ],
    cta: "Start Digital Access",
    popular: false,
  },
  {
    name: "Print + Digital Executive",
    price: "$49",
    period: "/ month",
    features: [
      "Quarterly hardcover magazine delivered to home/office",
      "Unlimited digital access to all web stories",
      "Full digital PDF magazine issue archive",
      "Weekly executive email briefings",
      "VIP access to annual business summits",
    ],
    cta: "Join Executive Tier",
    popular: true,
  },
];

export default function SubscribePage() {
  return (
    <main className="site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Subscribe to The Success World"
        intro="Get full access to print issues, digital archives, quarterly magazines and exclusive executive briefings."
        eyebrow="Membership & Access"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "32px", maxWidth: "960px", margin: "0 auto" }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.popular ? "#0F131F" : "#FFFFFF",
                  border: tier.popular ? "2px solid #D49A24" : "1px solid #E5E2D9",
                  color: tier.popular ? "#FFFFFF" : "#17151C",
                  borderRadius: "20px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  position: "relative",
                }}
              >
                {tier.popular && (
                  <span style={{ position: "absolute", top: "-12px", right: "24px", background: "#D49A24", color: "#080A10", fontSize: "10px", fontWeight: 800, padding: "4px 12px", borderRadius: "12px", letterSpacing: "1px" }}>
                    RECOMMENDED
                  </span>
                )}

                <div>
                  <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>{tier.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
                    <span className="font-serif" style={{ fontSize: "44px", fontWeight: 900, color: "#D49A24" }}>{tier.price}</span>
                    <span style={{ fontSize: "14px", color: tier.popular ? "#94A3B8" : "#77727D" }}>{tier.period}</span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {tier.features.map((feat) => (
                      <li key={feat} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: tier.popular ? "#F8FAFC" : "#17151C" }}>
                        <Check size={16} style={{ color: "#D49A24", flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button type="button" className="btn btn-gold-gradient" style={{ width: "100%", justifyContent: "center" }}>
                  <Sparkles size={16} />
                  <span>{tier.cta}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </main>
  );
}
