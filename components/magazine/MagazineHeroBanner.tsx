"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Pause,
  Play,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { MagazineIssue } from "@/types";

interface Props {
  issues: MagazineIssue[];
}

export function MagazineHeroBanner({ issues }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect (cycles every 5 seconds unless hovered)
  useEffect(() => {
    if (issues.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % issues.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [issues.length, isPaused]);

  if (!issues || issues.length === 0) return null;

  const active = issues[activeIndex];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % issues.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + issues.length) % issues.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const targetPdfUrl = active.pdfUrl ? active.pdfUrl : `/magazines/${active.slug || ""}`;
  const isExternalPdf = Boolean(
    active.pdfUrl && (active.pdfUrl.startsWith("http://") || active.pdfUrl.startsWith("https://"))
  );

  const issueTag = active.issue || `EDITION 0${activeIndex + 1}`;
  const issueDate = active.date || "2026";
  const issueSubtitle =
    active.subtitle || active.description || "Exclusive edition featuring visionary leaders, innovators and changemakers shaping the future.";

  // Extract top story items or key features
  const highlights =
    active.contents && active.contents.length > 0
      ? active.contents.slice(0, 3)
      : ["Leadership Spotlights", "Industry Market Briefings", "Global Innovation Trends"];

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
    }),
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="magazine-hero-banner-section"
      style={{
        width: "100%",
        background: "var(--editorial-ivory, #F5F1EA)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--editorial-border, #DDD5CC)",
      }}
    >
      {/* Background Micro Decorative Overlay Pattern */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}
      >
        <path d="M0 192C240 128 480 256 720 192C960 128 1200 224 1440 160V320H0V192Z" fill="url(#goldWaveHero)" />
        <defs>
          <linearGradient id="goldWaveHero" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#0A192F" />
          </linearGradient>
        </defs>
      </svg>

      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header Bar: Section Kicker & Slide Counter Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                background: "transparent",
                border: "1px solid #0A192F",
                color: "#0A192F",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={12} />
              SPECIAL MAGAZINE EDITION HERO
            </span>

            {isPaused && (
              <span style={{ fontSize: "10px", color: "var(--editorial-charcoal, #55545A)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Pause size={10} /> PAUSED ON HOVER
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#0A192F", letterSpacing: "1px" }}>
              0{activeIndex + 1} <span style={{ color: "var(--editorial-charcoal, #55545A)" }}>/ 0{issues.length}</span>
            </span>

            {/* Navigation Arrows in Top Bar */}
            {issues.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    background: "var(--editorial-surface, #FCFAF6)",
                    border: "1px solid var(--editorial-border, #DDD5CC)",
                    borderRadius: "50%",
                    color: "var(--editorial-navy, #101722)",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: "#0A192F",
                    border: "1px solid #0A192F",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main 2-Column Synchronized Animated Grid */}
        <div style={{ position: "relative", minHeight: "400px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hero-grid-split"
            >
              {/* LEFT COLUMN: Synchronized Dynamic Content */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: "#0A192F",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {issueTag}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--editorial-charcoal, #55545A)", letterSpacing: "1px" }}>
                    &bull; {issueDate}
                  </span>
                </div>

                <h1
                  className="font-serif"
                  style={{
                    fontSize: "clamp(30px, 3.6vw, 48px)",
                    fontWeight: 900,
                    color: "var(--editorial-navy, #101722)",
                    margin: "0 0 16px",
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {active.title}
                </h1>

                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--editorial-charcoal, #55545A)",
                    lineHeight: 1.6,
                    maxWidth: "600px",
                    marginBottom: "24px",
                  }}
                >
                  {issueSubtitle}
                </p>

                {/* Key Highlights / Coverage Bullet Points */}
                <div style={{ marginBottom: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                    FEATURED STORIES &amp; COVERAGE
                  </div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {highlights.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "var(--editorial-surface, #FCFAF6)",
                          border: "1px solid var(--editorial-border, #DDD5CC)",
                          color: "var(--editorial-navy, #101722)",
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "6px 14px",
                          borderRadius: "20px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 2px 6px rgba(16, 23, 34, 0.04)",
                        }}
                      >
                        <CheckCircle2 size={13} style={{ color: "#059669" }} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="hero-cta-group" style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                  {isExternalPdf ? (
                    <a
                      href={targetPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 900,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        padding: "14px 26px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 6px 20px rgba(10, 25, 47, 0.25)",
                      }}
                    >
                      <BookOpen size={16} />
                      <span>Read Digital Edition</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link
                      href={targetPdfUrl}
                      style={{
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 900,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        padding: "14px 26px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 6px 20px rgba(10, 25, 47, 0.25)",
                      }}
                    >
                      <BookOpen size={16} />
                      <span>Read Digital Edition</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}

                  <Link
                    href="/magazines"
                    style={{
                      background: "transparent",
                      border: "1px solid #0A192F",
                      color: "#0A192F",
                      fontSize: "13px",
                      fontWeight: 800,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>Browse All Issues</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Synchronized 3D Fan-out Stack Artwork */}
              <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "360px", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
                {/* 3D Overlapping Fan Stack Container */}
                <div style={{ position: "relative", width: "260px", height: "360px", maxWidth: "100%" }}>
                  {/* Background Layer 2 (Angled right) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "40px",
                      width: "240px",
                      height: "330px",
                      borderRadius: "12px",
                      background: "#FCFAF6",
                      border: "1px solid #DDD5CC",
                      transform: "rotate(6deg)",
                      boxShadow: "0 10px 30px rgba(16,23,34,0.08)",
                      opacity: 0.7,
                    }}
                  />

                  {/* Background Layer 1 (Angled left) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "20px",
                      width: "240px",
                      height: "330px",
                      borderRadius: "12px",
                      background: "#FCFAF6",
                      border: "1px solid #DDD5CC",
                      transform: "rotate(3deg)",
                      boxShadow: "0 14px 35px rgba(16,23,34,0.1)",
                      opacity: 0.85,
                    }}
                  />

                  {/* Main Front Upright Magazine Cover */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "250px",
                      height: "340px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid #DDD5CC",
                      boxShadow: "0 20px 50px rgba(16, 23, 34, 0.2)",
                      zIndex: 4,
                    }}
                  >
                    {active.cover ? (
                      <Image src={active.cover} alt={active.title} fill className="object-cover" unoptimized priority />
                    ) : (
                      <div
                        style={{
                          background: "#0A192F",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        <div className="font-serif" style={{ fontSize: "22px", fontWeight: 900, color: "#FFFFFF" }}>
                          STAR PRIME
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", marginTop: "6px" }}>INSPIRE. EMPOWER. SUCCEED.</div>
                      </div>
                    )}
                  </div>

                  {/* Circular Floating Badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      right: "0px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: "#0A192F",
                      boxShadow: "0 10px 25px rgba(10, 25, 47, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      padding: "8px",
                      zIndex: 6,
                      border: "3px solid var(--editorial-ivory, #F5F1EA)",
                    }}
                  >
                    <div style={{ fontSize: "10px", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2 }}>
                      Inspiring Leaders.
                    </div>
                    <div style={{ fontSize: "9px", fontWeight: 800, color: "rgba(255,255,255,0.8)", marginTop: "3px" }}>
                      Impacting Lives.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Thumbnail Strip Selector & Pagination Bar */}
        {issues.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              marginTop: "36px",
              paddingTop: "20px",
              borderTop: "1px solid var(--editorial-border, #DDD5CC)",
              flexWrap: "wrap",
            }}
          >
            {/* Interactive Cover Thumbnails */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", overflowX: "auto", paddingBottom: "4px" }}>
              {issues.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-label={`Select magazine slide ${idx + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "var(--editorial-surface, #FCFAF6)",
                    border: idx === activeIndex ? "2px solid #0A192F" : "1px solid var(--editorial-border, #DDD5CC)",
                    borderRadius: "8px",
                    padding: "6px 12px 6px 6px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ width: "32px", height: "42px", borderRadius: "4px", overflow: "hidden", position: "relative", background: "#0A192F", flexShrink: 0 }}>
                    {item.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.cover} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "9px", color: "#FFFFFF" }}>#{idx + 1}</span>
                    )}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "10px", fontWeight: 800, color: idx === activeIndex ? "#0A192F" : "var(--editorial-charcoal, #55545A)" }}>
                      {item.issue || `EDITION ${idx + 1}`}
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--editorial-navy, #101722)", maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Overall Stats */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={16} style={{ color: "#0A192F" }} />
                <span style={{ fontSize: "12px", color: "var(--editorial-navy, #101722)", fontWeight: 700 }}>80+ Editions</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={16} style={{ color: "#0A192F" }} />
                <span style={{ fontSize: "12px", color: "var(--editorial-navy, #101722)", fontWeight: 700 }}>500+ Leaders</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

