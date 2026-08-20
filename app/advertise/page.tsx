import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/editorial/PageIntro";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise | The Success World",
  description: "Partner with The Success World to connect your brand with 45,000+ decision-makers and C-suite leaders.",
};

export default function AdvertisePage() {
  return (
    <main className="advertise-page site-shell inner-shell">
      <PageIntro
        title="Advertise With Us"
        intro="Connect your brand with 45,000+ decision-makers, venture partners and C-suite leaders who trust The Success World."
        eyebrow="Partnerships & Media"
        dark
      />

      <section className="section" style={{ padding: "48px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "32px", marginBottom: "48px" }}>
          <div style={{ background: "var(--light-grey)", padding: "32px", borderRadius: "16px", border: "1px solid var(--border-grey)" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
              Digital Display & Native
            </h3>
            <p style={{ color: "var(--text-grey)", fontSize: "15px", lineHeight: 1.6, marginBottom: "16px" }}>
              High-impact display placements and native sponsored stories across our main site and industry channels.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> Homepage Cover Takeovers</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> Industry Vertical Sponsorships</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> High-Impact IAB Banners</li>
            </ul>
          </div>

          <div style={{ background: "var(--black)", color: "var(--white)", padding: "32px", borderRadius: "16px" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
              Executive Newsletter
            </h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: "15px", lineHeight: 1.6, marginBottom: "16px" }}>
              Reach 45,000+ verified executive subscribers directly in their inbox every week.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> Exclusive Newsletter Header</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> Editorial Takeaways & Quotes</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center" }}><CheckCircle2 size={16} color="var(--startups)" /> Dedicated Sponsor Releases</li>
            </ul>
          </div>

          <div style={{ background: "var(--light-grey)", padding: "32px", borderRadius: "16px", border: "1px solid var(--border-grey)" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
              Print Magazine Edition
            </h3>
            <p style={{ color: "var(--text-grey)", fontSize: "15px", lineHeight: 1.6, marginBottom: "16px" }}>
              Quarterly print distribution to corporate suites, VIP airport lounges and private executive events.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <li style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%" }}><CheckCircle2 size={16} color="var(--startups)" /> Full Page Color Advertisements</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%" }}><CheckCircle2 size={16} color="var(--startups)" /> Inside Front & Back Covers</li>
              <li style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%" }}><CheckCircle2 size={16} color="var(--startups)" /> Executive Profile Features</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", background: "var(--light-grey)", padding: "48px", borderRadius: "16px" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "32px", fontWeight: 800, marginBottom: "12px" }}>
            Ready to Partner With Us?
          </h2>
          <p style={{ color: "var(--text-grey)", fontSize: "16px", marginBottom: "24px" }}>
            View our full Media Kit deck or contact our corporate partnerships team.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/media-kit" className="btn btn-primary">
              View Media Kit <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
