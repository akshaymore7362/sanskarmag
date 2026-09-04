import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial/PageIntro";
import { Award, Globe2, ShieldCheck, Target, ArrowRight } from "lucide-react";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "About Us | The Success World",
  description: "Learn about The Success World's mission, editorial philosophy, and global business coverage.",
};

const stats = [
  { label: "Global Readers", value: "450K+" },
  { label: "Executive Interviews", value: "220+" },
  { label: "International Bureaus", value: "14" },
  { label: "Editorial Accuracy", value: "99.8%" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Integrity",
    desc: "Our field reporting favors independent analysis over recycled press releases and empty trend buzzwords.",
  },
  {
    icon: Target,
    title: "Executive Relevance",
    desc: "We focus strictly on strategic decisions, market dynamics, and technological shifts that impact enterprise value.",
  },
  {
    icon: Globe2,
    title: "Global Perspective",
    desc: "From Wall Street to Silicon Valley, London, and Tokyo, our bureaus cover global capital and innovation hubs.",
  },
  {
    icon: Award,
    title: "Editorial Excellence",
    desc: "Crafted by veteran journalists and industry researchers who prioritize clarity, depth, and precision.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page site-shell inner-shell" style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="About The Success World"
        intro="The Success World is a premier executive publication delivering field reporting, market intelligence, and strategic analysis for ambitious operators and global business leaders."
        eyebrow="INSPIRED. INFORMED. EMPOWERING. EXCELLENCE."
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Stats Ribbon */}
        <section style={{ margin: "20px 0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              background: "#0A192F",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#fff",
              borderRadius: "20px",
              padding: "36px 40px",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4)"
            }}
          >
            {stats.map((st, idx) => (
              <div key={idx} style={{ textAlign: "center", borderRight: idx < stats.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                <div className="font-serif" style={{ fontSize: "42px", fontWeight: 900, color: "#C5A059" }}>{st.value}</div>
                <div style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "4px", fontWeight: 700 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Mission & Photo Feature */}
        <section style={{ marginBottom: "48px" }}>
          <div className="grid-split-layout" style={{ alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#C5A059", letterSpacing: "2px", textTransform: "uppercase" }}>OUR PHILOSOPHY</span>
              <h2 className="font-serif" style={{ fontSize: "38px", fontWeight: 900, color: "#0A192F", lineHeight: 1.15, margin: "10px 0 20px" }}>
                Field Reporting & High-Impact Executive Intelligence
              </h2>
              <p style={{ color: "#4B5563", fontSize: "16px", lineHeight: 1.7, marginBottom: "16px" }}>
                Founded with the vision to illuminate the forces driving global business, <strong>The Success World</strong> bridges the gap between raw economic data and actionable leadership strategy.
              </p>
              <p style={{ color: "#4B5563", fontSize: "16px", lineHeight: 1.7, marginBottom: "28px" }}>
                We interview CEOs, technology founders, and policy experts to bring our readers unvarnished perspective on artificial intelligence, venture finance, global supply chains, and market disruption.
              </p>
              <Link href="/blogs" className="btn btn-gold-gradient">
                <span>Explore Editorial Desk</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ position: "relative", height: "420px", borderRadius: "20px", overflow: "hidden", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&h=800&q=82"
                alt="Editorial Office"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Core Editorial Pillars Grid */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#C5A059", letterSpacing: "2px", textTransform: "uppercase" }}>WHAT GUIDES US</span>
            <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 800, color: "#0A192F", marginTop: "4px" }}>Our Core Editorial Pillars</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "16px",
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                  }}
                >
                  <div>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 154, 36, 0.12)", color: "#C5A059", display: "grid", placeItems: "center", marginBottom: "20px" }}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#0A192F", marginBottom: "10px" }}>{pil.title}</h3>
                    <p style={{ color: "#4B5563", fontSize: "14px", lineHeight: 1.6 }}>{pil.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter Component */}
        <NewsletterSection />
      </div>
    </main>
  );
}
