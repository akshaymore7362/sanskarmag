"use client";

import { useState } from "react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const slides = [
  { page: 1, title: "Cover — The Success World Media Kit 2026", desc: "Executive circulation, digital reach, and audience demographics." },
  { page: 2, title: "Audience Profile & Reader Demographics", desc: "45,000+ C-suite executives, founders, venture partners, and operators across 60 countries." },
  { page: 3, title: "Digital Circulation & Monthly Metrics", desc: "1.2M monthly page views, 85% decision-maker readership rate." },
  { page: 4, title: "Print & Quarterly Magazine Opportunities", desc: "Full page, double page spreads, cover wraps and special report placements." },
  { page: 5, title: "Newsletter Briefing Sponsorships", desc: "Exclusive daily & weekly newsletter header banners and dedicated editorial takeaways." },
  { page: 6, title: "Custom Content & Brand Studio", desc: "Co-created intelligence reports, executive video series, and custom case studies." },
  { page: 7, title: "Summits & Event Partnerships", desc: "Headline sponsorship for regional summits, roundtables, and VIP founder dinners." },
  { page: 8, title: "Ad Specifications & Technical Requirements", desc: "Standard IAB display banner sizes, high-res PDF print specs, and submission guidelines." },
  { page: 9, title: "Editorial Calendar 2026", desc: "Upcoming quarterly themes: AI Revolution, Scale Issue, Global Finance, Founder Mindset." },
  { page: 10, title: "Rates & Contact Partnership Team", desc: "Custom media packages, rate card and contact details for our brand partnerships team." },
];

export default function MediaKitPage() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeSlide = slides[activeSlideIndex];

  return (
    <main className="media-kit-page site-shell inner-shell">
      <PageIntro
        title="Media Kit"
        intro="Download our 2026 media kit and explore executive audience demographics and sponsorship positions."
        eyebrow="Brand Partnerships"
        dark
      />

      <section className="section" style={{ padding: "48px 0" }}>
        {/* Slide Deck Viewer Container */}
        <div style={{ background: "var(--black)", color: "var(--white)", borderRadius: "20px", padding: "48px", border: "1px solid rgba(255,255,255,.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--startups)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Page {activeSlide.page} of {slides.length}
            </div>
            <a href="/about" className="btn btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,.3)", fontSize: "13px" }}>
              <Download size={14} /> Download Media Kit PDF
            </a>
          </div>

          <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", padding: "64px 32px", textAlign: "center", minHeight: "320px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>
              {activeSlide.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: "18px", maxWidth: "600px" }}>
              {activeSlide.desc}
            </p>
          </div>

          {/* Slide Deck Navigation Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px" }}>
            <button
              onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeSlideIndex === 0}
              className="btn btn-secondary"
              style={{ color: "white", borderColor: "rgba(255,255,255,.3)", opacity: activeSlideIndex === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Previous Page
            </button>

            {/* Slide Indicators */}
            <div style={{ display: "flex", gap: "8px" }}>
              {slides.map((s, idx) => (
                <button
                  key={s.page}
                  onClick={() => setActiveSlideIndex(idx)}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: activeSlideIndex === idx ? "var(--startups)" : "rgba(255,255,255,.2)",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={activeSlideIndex === slides.length - 1}
              className="btn btn-primary"
              style={{ background: "var(--startups)", opacity: activeSlideIndex === slides.length - 1 ? 0.4 : 1 }}
            >
              Next Page <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
