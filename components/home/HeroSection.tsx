"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Globe, Award, CheckCircle, BookOpen, ShieldCheck, ExternalLink } from "lucide-react";
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
        // Take latest 6 magazines
        setMagazines(issues.slice(0, 6));
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles latest 6 magazines every 2.5s)
  useEffect(() => {
    if (magazines.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [magazines.length]);

  const activeIssue = magazines.length > 0 ? magazines[currentIndex % magazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  const heroTitle = activeIssue?.title || "International Magazine Edition & Global Market Leadership 2026";
  const heroDesc = activeIssue?.description || "Exploring the visionary strategies driving global enterprise adoption and market transformation.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION ${currentIndex + 1}`;
  const issueDate = activeIssue?.date || "2026";

  const targetPdfUrl = activeIssue?.pdfUrl ? activeIssue.pdfUrl : `/magazines/${activeIssue?.slug || ""}`;
  const isExternalPdf = Boolean(activeIssue?.pdfUrl && (activeIssue.pdfUrl.startsWith("http://") || activeIssue.pdfUrl.startsWith("https://")));

  return (
    <section
      className="hero-reference-section"
      style={{
        width: "100%",
        background: "transparent",
        color: "#17151C",
        padding: "24px 0",
        position: "relative",
        overflow: "hidden",
        minHeight: "480px",
        borderBottom: "1px solid #E2DCD0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
          alignItems: "center",
        }}
      >
        {/* LEFT COLUMN: Real Sanity Magazine Cover (Click opens PDF) */}
        <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              background: "#FFFFFF",
              padding: "8px",
              borderRadius: "12px",
              border: "1px solid #E5E2D9",
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.06)",
              transition: "transform 0.4s ease",
            }}
          >
            {/* Edition Star Badge */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                zIndex: 20,
                background: "#8B1029",
                color: "#FFFFFF",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Star size={12} fill="#FFFFFF" />
              <span>{issueTag}</span>
            </div>

            {/* Clickable Magazine Cover Opening PDF */}
            {isExternalPdf ? (
              <a
                href={targetPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", width: "100%", aspectRatio: "3 / 4", maxHeight: "420px", borderRadius: "8px", overflow: "hidden", background: "#0a192f" }}
              >
                {heroCover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={heroCover}
                    alt={heroTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "24px", padding: "20px", textAlign: "center" }}>
                    SANITY DIGITAL MAGAZINE
                  </div>
                )}
              </a>
            ) : (
              <Link
                href={targetPdfUrl}
                style={{ display: "block", width: "100%", aspectRatio: "3 / 4", maxHeight: "420px", borderRadius: "8px", overflow: "hidden", background: "#0a192f" }}
              >
                {heroCover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={heroCover}
                    alt={heroTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "24px", padding: "20px", textAlign: "center" }}>
                    SANITY DIGITAL MAGAZINE
                  </div>
                )}
              </Link>
            )}
          </div>

          {/* Auto-Slide Indicators (Strictly 6 Latest Magazines) */}
          {magazines.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
              {magazines.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: idx === currentIndex ? "#8B1029" : "#D8D3C5",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sanity Editorial Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#775a19",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              borderBottom: "1px solid #E2DCD0",
              paddingBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Globe size={14} /> INTERNATIONAL MAGAZINE EDITION
            </span>
            <span style={{ color: "#77727D" }}>• {issueDate}</span>
          </div>

          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(20px, 2.6vw, 32px)",
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#17151C",
              margin: 0,
            }}
          >
            {heroTitle}
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "#44474d",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {heroDesc}
          </p>

          {/* Executive Leadership Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              border: "1px solid #E5E2D9",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              height: "64px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#0a192f",
                color: "#8B1029",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                fontSize: "15px",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {activeLeader?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={activeLeader.image} alt={activeLeader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                activeLeader?.name ? activeLeader.name.charAt(0) : "SW"
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#775a19", fontSize: "10px", fontWeight: 800, letterSpacing: "1px", display: "flex", alignItems: "center", gap: "4px", marginBottom: "1px" }}>
                <Award size={12} /> COVER FEATURED EXECUTIVE
              </div>
              <div className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "#17151C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activeLeader?.name || "Executive Profile"}
              </div>
              <div style={{ fontSize: "11px", color: "#77727D", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activeLeader?.role || "Executive Leader"} {activeLeader?.company ? `• ${activeLeader.company}` : ""}
              </div>
            </div>
          </div>

          {/* Topics List */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#77727D", letterSpacing: "1px" }}>TOPICS:</span>
            {["01 Enterprise AI", "02 Capital Markets", "03 Global Scale"].map((topic, idx) => (
              <span
                key={idx}
                style={{
                  padding: "4px 10px",
                  border: "1px solid #D8D3C5",
                  borderRadius: "5px",
                  fontSize: "11px",
                  color: "#17151C",
                  background: "#EBE8DF",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <CheckCircle size={12} style={{ color: "#775a19" }} /> {topic}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "auto" }}>
            {isExternalPdf ? (
              <a
                href={targetPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#8B1029",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "11px 22px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(139,16,41,0.3)",
                }}
              >
                <BookOpen size={15} /> Read Digital Magazine <ExternalLink size={14} />
              </a>
            ) : (
              <Link
                href={targetPdfUrl}
                style={{
                  background: "#8B1029",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "11px 22px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(139,16,41,0.3)",
                }}
              >
                <BookOpen size={15} /> Read Digital Magazine
              </Link>
            )}

            <button
              type="button"
              onClick={() => setNominateOpen(true)}
              style={{
                border: "1px solid #101722",
                background: "#101722",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "11px 22px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ShieldCheck size={15} /> Nominate Now
            </button>
          </div>
        </div>
      </div>

      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}
