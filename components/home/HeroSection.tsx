"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Globe, Award, CheckCircle, BookOpen, ShieldCheck, ExternalLink, Sparkles, TrendingUp, Users } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import { NominateModal } from "@/components/modals/NominateModal";
import type { MagazineIssue, Leader } from "@/types";

export function HeroSection() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nominateOpen, setNominateOpen] = useState(false);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((issues) => {
      if (issues && issues.length > 0) {
        setMagazines(issues.slice(0, 6)); // Take latest 6 magazines
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles latest 6 magazines every 3s)
  useEffect(() => {
    if (magazines.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [magazines.length]);

  const activeIssue = magazines.length > 0 ? magazines[currentIndex % magazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  const heroTitle = activeIssue?.title || "International Executive Edition & Global Market Leadership 2026";
  const heroDesc = activeIssue?.description || "Delivering exclusive economic briefings, technology breakthroughs, and strategic insights for global operators and C-suite leaders.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION 0${currentIndex + 1}`;
  const issueDate = activeIssue?.date || "2026";

  const targetPdfUrl = activeIssue?.pdfUrl ? activeIssue.pdfUrl : `/magazines/${activeIssue?.slug || ""}`;
  const isExternalPdf = Boolean(activeIssue?.pdfUrl && (activeIssue.pdfUrl.startsWith("http://") || activeIssue.pdfUrl.startsWith("https://")));

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #F9F7F2 0%, #F4F1EA 100%)",
        borderBottom: "1px solid #E5E2D9",
        padding: "40px 0 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Micro Decorative Glow Gradients */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(139, 16, 41, 0.06) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div className="site-shell" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Main 2-Column Hero Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* LEFT COLUMN: Editorial Content & CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Top Eyebrow Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "#8B1029",
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(139, 16, 41, 0.25)",
                }}
              >
                <Sparkles size={12} />
                {issueTag} &bull; {issueDate}
              </span>

              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1.2px",
                  color: "#159A5B",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ width: "7px", height: "7px", background: "#159A5B", borderRadius: "50%", boxShadow: "0 0 8px #159A5B" }} />
                LIVE PRESS RELEASE
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 3.8vw, 50px)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#101722",
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Empowering Visionaries &amp; <span style={{ color: "#8B1029" }}>Shaping Global Markets</span>
            </h1>

            {/* Dynamic Issue Title & Description */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>
                FEATURED COVERAGE
              </div>
              <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#101722", margin: "0 0 6px", lineHeight: 1.3 }}>
                {heroTitle}
              </h3>
              <p style={{ fontSize: "14px", color: "#55515A", margin: 0, lineHeight: 1.55 }}>
                {heroDesc}
              </p>
            </div>

            {/* Cover Featured Executive Profile Card */}
            {activeLeader && (
              <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "rgba(139, 16, 41, 0.05)", border: "1px solid rgba(139, 16, 41, 0.15)", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden", border: "2px solid #8B1029", flexShrink: 0 }}>
                  {activeLeader.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={activeLeader.image} alt={activeLeader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#8B1029", color: "#FFFFFF", fontWeight: 900, fontSize: "18px" }}>
                      {activeLeader.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase" }}>
                    COVER FEATURED EXECUTIVE
                  </div>
                  <div className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "#101722" }}>
                    {activeLeader.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#66616C", fontWeight: 600 }}>
                    {activeLeader.role} {activeLeader.company ? `&bull; ${activeLeader.company}` : ""}
                  </div>
                </div>
              </div>
            )}

            {/* Topics Bar */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", fontWeight: 700, color: "#332F38" }}>
              {["Enterprise AI & Tech", "Capital Markets", "Executive Leadership"].map((topic) => (
                <span key={topic} style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <CheckCircle size={14} style={{ color: "#8B1029" }} /> {topic}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "4px" }}>
              {isExternalPdf ? (
                <a
                  href={targetPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#8B1029",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    padding: "14px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 18px rgba(139, 16, 41, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <BookOpen size={16} />
                  <span>Read Digital Magazine</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  href={targetPdfUrl}
                  style={{
                    background: "#8B1029",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    padding: "14px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 18px rgba(139, 16, 41, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <BookOpen size={16} />
                  <span>Read Digital Magazine</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setNominateOpen(true)}
                style={{
                  background: "#101722",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(16, 23, 34, 0.25)",
                }}
              >
                <ShieldCheck size={16} style={{ color: "#B69A5A" }} />
                <span>Nominate A Leader</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Animated Magazine Cover Showcase & Switcher */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {/* 3D Magazine Cover Display Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "340px",
                aspectRatio: "3 / 4",
                borderRadius: "14px",
                overflow: "hidden",
                borderLeft: "6px solid #8B1029",
                background: "#0A0D16",
                boxShadow: "0 22px 50px -10px rgba(139, 16, 41, 0.4), 0 10px 25px rgba(0,0,0,0.5)",
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              {/* Gold Issue Tag Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  zIndex: 10,
                  background: "#8B1029",
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                }}
              >
                <Star size={11} fill="currentColor" />
                {issueTag}
              </div>

              {/* Cover Image */}
              {isExternalPdf ? (
                <a href={targetPdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>
                  {heroCover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={heroCover} alt={heroTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "20px", padding: "20px", textAlign: "center" }}>
                      THE SUCCESS WORLD
                    </div>
                  )}
                </a>
              ) : (
                <Link href={targetPdfUrl} style={{ display: "block", width: "100%", height: "100%" }}>
                  {heroCover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={heroCover} alt={heroTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "20px", padding: "20px", textAlign: "center" }}>
                      THE SUCCESS WORLD
                    </div>
                  )}
                </Link>
              )}
            </div>

            {/* Magazine Switcher Thumbnail Indicators */}
            {magazines.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "20px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {magazines.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Switch to magazine ${idx + 1}`}
                    style={{
                      width: "42px",
                      height: "56px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: idx === currentIndex ? "2.5px solid #8B1029" : "1.5px solid #E5E2D9",
                      padding: 0,
                      background: "#0A0D16",
                      cursor: "pointer",
                      opacity: idx === currentIndex ? 1 : 0.6,
                      transform: idx === currentIndex ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {item.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.cover} alt={`Magazine ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "9px", color: "#FFFFFF", fontWeight: 900 }}>#{idx + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Executive Impact Metrics Counter Bar */}
        <div
          style={{
            marginTop: "44px",
            paddingTop: "24px",
            borderTop: "1px solid #E5E2D9",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#8B1029" }}>
              500+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#55515A", textTransform: "uppercase" }}>
              EXECUTIVE LEADERS PROFILED
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#101722" }}>
              120K+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#55515A", textTransform: "uppercase" }}>
              C-SUITE SUBSCRIBERS
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#8B1029" }}>
              50+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#55515A", textTransform: "uppercase" }}>
              COUNTRIES REACHED
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#101722" }}>
              100%
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#55515A", textTransform: "uppercase" }}>
              INDEPENDENT JOURNALISM
            </div>
          </div>
        </div>
      </div>

      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}
