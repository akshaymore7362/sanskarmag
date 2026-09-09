"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import { NominateModal } from "@/components/modals/NominateModal";
import type { MagazineIssue, Leader } from "@/types";

export function HeroSection() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [nominateOpen, setNominateOpen] = useState(false);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((issues) => {
      if (issues && issues.length > 0) {
        setMagazines(issues.slice(0, 6));
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Continuous Automatic Slide Timer (3.5s)
  useEffect(() => {
    if (magazines.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [magazines.length]);

  const activeIssue = magazines.length > 0 ? magazines[currentIndex % magazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  const heroTitle = activeIssue?.title || "International Executive Edition";
  const heroDesc =
    activeIssue?.subtitle ||
    activeIssue?.description ||
    "Delivering strategic economic briefings and executive insights for global decision makers.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION 0${currentIndex + 1}`;
  const issueDate = activeIssue?.date || activeIssue?.year || "";

  const targetPdfUrl = activeIssue?.pdfUrl ? activeIssue.pdfUrl : `/magazines/${activeIssue?.slug || ""}`;
  const isExternalPdf = Boolean(
    activeIssue?.pdfUrl && (activeIssue.pdfUrl.startsWith("http://") || activeIssue.pdfUrl.startsWith("https://"))
  );

  const handleNext = () => {
    if (magazines.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % magazines.length);
  };

  const handlePrev = () => {
    if (magazines.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + magazines.length) % magazines.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

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

  const behind1 = magazines.length > 1 ? magazines[(currentIndex + 1) % magazines.length] : null;
  const behind2 = magazines.length > 2 ? magazines[(currentIndex + 2) % magazines.length] : null;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundColor: "var(--editorial-ivory, #F5F1EA)",
        background: "var(--editorial-ivory, #F5F1EA)",
        borderBottom: "1px solid var(--editorial-border, #DDD5CC)",
        padding: "24px 0 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="site-shell" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top Eyebrow & Navigation Bar */}
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
              EXECUTIVE EDITION &bull; {issueDate}
            </span>

            {isPaused && (
              <span style={{ fontSize: "10px", color: "#55545A", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Pause size={10} /> PAUSED
              </span>
            )}
          </div>

          {magazines.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F" }}>
                0{currentIndex + 1} <span style={{ color: "#55545A" }}>/ 0{magazines.length}</span>
              </span>

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
                  aria-label="Previous Magazine Slide"
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
                  aria-label="Next Magazine Slide"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Animated Hero Grid: 3D Cross Magazine Stack & Compact Info */}
        <div style={{ position: "relative" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="hero-grid-responsive"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 480px",
                gap: "36px",
                alignItems: "center",
              }}
            >
              {/* LEFT COLUMN: Compact Editorial Information (Reflects ONLY Front Magazine) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "560px" }}>
                {/* Main Headline */}
                <h1
                  className="font-serif"
                  style={{
                    fontSize: "clamp(24px, 2.2vw, 32px)",
                    fontWeight: 900,
                    lineHeight: 1.2,
                    color: "#101722",
                    margin: 0,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Empowering Visionaries &amp; <span style={{ color: "#0A192F" }}>Shaping Global Markets</span>
                </h1>

                {/* Single Combined Featured Coverage Text Block */}
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#1E40AF", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "3px" }}>
                    FEATURED COVERAGE &bull; {issueTag}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "16px", fontWeight: 800, color: "#101722", margin: "0 0 4px", lineHeight: 1.3 }}>
                    {heroTitle}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#55545A", margin: 0, lineHeight: 1.45 }}>
                    {heroDesc}
                  </p>
                </div>

                {/* Executive Profile */}
                {activeLeader && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 0" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid #0A192F", flexShrink: 0 }}>
                      {activeLeader.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={activeLeader.image} alt={activeLeader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0A192F", color: "#FFFFFF", fontWeight: 800, fontSize: "14px" }}>
                          {activeLeader.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-serif" style={{ fontSize: "13px", fontWeight: 800, color: "#101722", lineHeight: 1.2 }}>
                        {activeLeader.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#55545A", fontWeight: 600 }}>
                        {activeLeader.role} {activeLeader.company ? `&bull; ${activeLeader.company}` : ""}
                      </div>
                    </div>
                  </div>
                )}

                {/* Industry Topics Tag Bar */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "11px", fontWeight: 700, color: "#55545A" }}>
                  {["Enterprise AI & Tech", "Capital Markets", "Executive Leadership"].map((topic) => (
                    <span key={topic} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle size={12} style={{ color: "#059669" }} /> {topic}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
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
                      <span>Read Digital Magazine</span>
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
                      <span>Read Digital Magazine</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setNominateOpen(true)}
                    style={{
                      background: "transparent",
                      color: "#1E40AF",
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      padding: "10px 18px",
                      borderRadius: "6px",
                      border: "1.5px solid #1E40AF",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ShieldCheck size={14} style={{ color: "#1E40AF" }} />
                    <span>Nominate Now</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Expansive 3D 3-Layer Cross Magazine Fan Showcase */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                        {heroCover ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={heroCover} alt={heroTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
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
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
                            THE SUCCESS WORLD
                          </div>
                        )}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Thumbnail Switcher */}
                {magazines.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {magazines.slice(0, 6).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        aria-label={`Switch to magazine ${idx + 1}`}
                        style={{
                          width: "36px",
                          height: "48px",
                          borderRadius: "4px",
                          overflow: "hidden",
                          border: idx === currentIndex ? "2.5px solid #0A192F" : "1px solid #CBD5E1",
                          padding: 0,
                          background: "#FCFAF6",
                          cursor: "pointer",
                          opacity: idx === currentIndex ? 1 : 0.6,
                          transform: idx === currentIndex ? "scale(1.08)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {item.cover ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={item.cover} alt={`Magazine ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "9px", color: "#0A192F", fontWeight: 800 }}>#{idx + 1}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Compact Metrics Strip */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "14px",
            borderTop: "1px solid var(--editorial-border, #DDD5CC)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <div>
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#0A192F", lineHeight: 1.1 }}>
              500+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              EXECUTIVE LEADERS
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#101722", lineHeight: 1.1 }}>
              120K+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              C-SUITE SUBSCRIBERS
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#0A192F", lineHeight: 1.1 }}>
              50+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              COUNTRIES REACHED
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#101722", lineHeight: 1.1 }}>
              100%
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              INDEPENDENT JOURNALISM
            </div>
          </div>
        </div>
      </div>

      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}


