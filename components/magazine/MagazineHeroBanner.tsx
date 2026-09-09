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
  Pause,
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

  // Continuous Auto-slide effect (3.5 seconds)
  useEffect(() => {
    if (issues.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % issues.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [issues.length]);

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
  const issueDate = active.date || active.year || "";
  const issueSubtitle =
    active.subtitle || active.description || "Exclusive edition featuring visionary leaders, innovators and changemakers.";

  const highlights =
    active.contents && active.contents.length > 0
      ? active.contents.slice(0, 3)
      : ["Leadership Spotlights", "Market Briefings", "Global Innovation"];

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 25 : -25,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -25 : 25,
    }),
  };

  const behind1 = issues.length > 1 ? issues[(activeIndex + 1) % issues.length] : null;
  const behind2 = issues.length > 2 ? issues[(activeIndex + 2) % issues.length] : null;

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
        padding: "24px 6vw 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                background: "#0A192F",
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Sparkles size={11} />
              FEATURED MAGAZINE &bull; {issueDate}
            </span>

            {isPaused && (
              <span style={{ fontSize: "10px", color: "#55545A", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Pause size={10} /> PAUSED
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F" }}>
              0{activeIndex + 1} <span style={{ color: "#55545A" }}>/ 0{issues.length}</span>
            </span>

            {issues.length > 1 && (
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "50%",
                    color: "#0A192F",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: "#0A192F",
                    border: "1px solid #0A192F",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Compact Animated Grid: 3D Cross Magazine Stack & Info */}
        <div style={{ position: "relative" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 480px",
                gap: "36px",
                alignItems: "center",
              }}
            >
              {/* LEFT COLUMN: Compact Content (Reflects ONLY Front Active Magazine) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "560px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#1E40AF", letterSpacing: "1px", textTransform: "uppercase" }}>
                    {issueTag} &bull; {issueDate}
                  </span>
                </div>

                <h1
                  className="font-serif"
                  style={{
                    fontSize: "clamp(24px, 2.2vw, 32px)",
                    fontWeight: 900,
                    color: "#101722",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {active.title}
                </h1>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#55545A",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {issueSubtitle}
                </p>

                {/* Bullet Highlights */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "2px" }}>
                  {highlights.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#101722",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircle2 size={12} style={{ color: "#059669" }} />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Call To Action Buttons */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
                  {isExternalPdf ? (
                    <a
                      href={targetPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        padding: "10px 18px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <BookOpen size={14} />
                      <span>Read Digital Edition</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <Link
                      href={targetPdfUrl}
                      style={{
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        padding: "10px 18px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <BookOpen size={14} />
                      <span>Read Digital Edition</span>
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Expansive 3D 3-Layer Cross Magazine Fan Showcase */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: "440px",
                    height: "500px",
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Background Layer 2 (Cross-angled right behind) */}
                  {behind2 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "10px",
                        width: "295px",
                        aspectRatio: "3 / 4",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #DDD5CC",
                        transform: "rotate(10deg)",
                        boxShadow: "0 12px 32px rgba(10, 25, 47, 0.15)",
                        opacity: 0.75,
                        zIndex: 1,
                        background: "#FCFAF6",
                      }}
                    >
                      {behind2.cover ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={behind2.cover} alt={behind2.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", background: "#0A192F" }} />
                      )}
                    </div>
                  )}

                  {/* Background Layer 1 (Cross-angled left behind) */}
                  {behind1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        width: "310px",
                        aspectRatio: "3 / 4",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #DDD5CC",
                        transform: "rotate(-8deg)",
                        boxShadow: "0 14px 36px rgba(10, 25, 47, 0.2)",
                        opacity: 0.88,
                        zIndex: 2,
                        background: "#FCFAF6",
                      }}
                    >
                      {behind1.cover ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={behind1.cover} alt={behind1.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", background: "#0A192F" }} />
                      )}
                    </div>
                  )}

                  {/* Front Main Upright Active Cover (Large Focal Point) */}
                  <div
                    style={{
                      position: "relative",
                      width: "330px",
                      aspectRatio: "3 / 4",
                      borderRadius: "14px",
                      overflow: "hidden",
                      borderLeft: "6px solid #0A192F",
                      background: "#FCFAF6",
                      boxShadow: "0 24px 60px rgba(10, 25, 47, 0.32)",
                      zIndex: 3,
                    }}
                  >
                    {isExternalPdf ? (
                      <a href={targetPdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>
                        {active.cover ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={active.cover} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
                            THE SUCCESS WORLD
                          </div>
                        )}
                      </a>
                    ) : (
                      <Link href={targetPdfUrl} style={{ display: "block", width: "100%", height: "100%" }}>
                        {active.cover ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={active.cover} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
                            THE SUCCESS WORLD
                          </div>
                        )}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector Strip */}
        {issues.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px solid var(--editorial-border, #DDD5CC)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center", overflowX: "auto", paddingBottom: "2px" }}>
              {issues.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-label={`Select magazine slide ${idx + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#FFFFFF",
                    border: idx === activeIndex ? "2px solid #0A192F" : "1px solid #CBD5E1",
                    borderRadius: "6px",
                    padding: "4px 8px 4px 4px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ width: "24px", height: "32px", borderRadius: "3px", overflow: "hidden", position: "relative", background: "#0A192F", flexShrink: 0 }}>
                    {item.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.cover} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "8px", color: "#FFFFFF" }}>#{idx + 1}</span>
                    )}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "9px", fontWeight: 800, color: idx === activeIndex ? "#0A192F" : "#55545A" }}>
                      {item.issue || `ED. 0${idx + 1}`}
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#101722", maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Award size={14} style={{ color: "#0A192F" }} />
                <span style={{ fontSize: "11px", color: "#101722", fontWeight: 700 }}>80+ Editions</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Users size={14} style={{ color: "#0A192F" }} />
                <span style={{ fontSize: "11px", color: "#101722", fontWeight: 700 }}>500+ Leaders</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


