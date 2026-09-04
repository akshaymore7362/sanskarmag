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
        setMagazines(issues.slice(0, 6)); // Take latest 6 magazines
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles latest magazines every 4s unless hovered)
  useEffect(() => {
    if (magazines.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [magazines.length, isPaused]);

  const activeIssue = magazines.length > 0 ? magazines[currentIndex % magazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  const heroTitle = activeIssue?.title || "International Executive Edition & Global Market Leadership 2026";
  const heroDesc =
    activeIssue?.subtitle ||
    activeIssue?.description ||
    "Delivering exclusive economic briefings, technology breakthroughs, and strategic insights for global operators and C-suite leaders.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION 0${currentIndex + 1}`;
  const issueDate = activeIssue?.date || "2026";

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
      x: dir > 0 ? 35 : -35,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -35 : 35,
    }),
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundColor: "var(--editorial-ivory, #F5F1EA)",
        background: "var(--editorial-ivory, #F5F1EA)",
        borderBottom: "1px solid var(--editorial-border, #DDD5CC)",
        padding: "42px 0 52px",
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
          background: "radial-gradient(circle, rgba(10, 25, 47, 0.06) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div className="site-shell" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top Header Bar: Section Eyebrow & Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                background: "transparent",
                border: "1px solid #0A192F",
                color: "#0A192F",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={12} />
              EXECUTIVE MAGAZINE SLIDER &bull; {issueDate}
            </span>

            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1.2px",
                color: "#059669",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ width: "7px", height: "7px", background: "#059669", borderRadius: "50%", boxShadow: "0 0 8px #059669" }} />
              LIVE PRESS RELEASE
            </span>

            {isPaused && (
              <span style={{ fontSize: "10px", color: "var(--editorial-charcoal, #55545A)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Pause size={10} /> PAUSED
              </span>
            )}
          </div>

          {magazines.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#0A192F" }}>
                0{currentIndex + 1} <span style={{ color: "var(--editorial-charcoal, #55545A)" }}>/ 0{magazines.length}</span>
              </span>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    background: "var(--editorial-surface, #FCFAF6)",
                    border: "1px solid var(--editorial-border, #DDD5CC)",
                    borderRadius: "50%",
                    color: "var(--editorial-navy, #101722)",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 2px 4px rgba(16, 23, 34, 0.05)",
                  }}
                  aria-label="Previous Magazine Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: "#0A192F",
                    border: "1px solid #0A192F",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 2px 4px rgba(10, 25, 47, 0.3)",
                  }}
                  aria-label="Next Magazine Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Synchronized Animated 2-Column Hero Area */}
        <div style={{ position: "relative", minHeight: "410px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hero-grid-responsive"
            >
              {/* LEFT COLUMN: Editorial Content & CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Main Headline */}
                <h1
                  className="font-serif"
                  style={{
                    fontSize: "clamp(30px, 3.6vw, 46px)",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    color: "var(--editorial-navy, #101722)",
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Empowering Visionaries &amp; <span style={{ color: "#0A192F" }}>Shaping Global Markets</span>
                </h1>

                {/* Dynamic Issue Title & Description Card */}
                <div style={{ background: "var(--editorial-surface, #FCFAF6)", border: "1px solid var(--editorial-border, #DDD5CC)", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 8px 30px rgba(16, 23, 34, 0.06)" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>
                    FEATURED COVERAGE &bull; {issueTag}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "var(--editorial-navy, #101722)", margin: "0 0 6px", lineHeight: 1.3 }}>
                    {heroTitle}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--editorial-charcoal, #55545A)", margin: 0, lineHeight: 1.55 }}>
                    {heroDesc}
                  </p>
                </div>

                {/* Cover Featured Executive Profile Card */}
                {activeLeader && (
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "var(--editorial-surface, #FCFAF6)", border: "1px solid var(--editorial-border, #DDD5CC)", borderRadius: "10px", padding: "10px 14px", boxShadow: "0 8px 30px rgba(16, 23, 34, 0.06)" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden", border: "2px solid #0A192F", flexShrink: 0 }}>
                      {activeLeader.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={activeLeader.image} alt={activeLeader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0A192F", color: "#FFFFFF", fontWeight: 900, fontSize: "18px" }}>
                          {activeLeader.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 800, color: "#0A192F", letterSpacing: "1px", textTransform: "uppercase" }}>
                        COVER FEATURED EXECUTIVE
                      </div>
                      <div className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "var(--editorial-navy, #101722)" }}>
                        {activeLeader.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--editorial-charcoal, #55545A)", fontWeight: 600 }}>
                        {activeLeader.role} {activeLeader.company ? `&bull; ${activeLeader.company}` : ""}
                      </div>
                    </div>
                  </div>
                )}

                {/* Topics Bar */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", fontWeight: 700, color: "var(--editorial-charcoal, #55545A)" }}>
                  {["Enterprise AI & Tech", "Capital Markets", "Executive Leadership"].map((topic) => (
                    <span key={topic} style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <CheckCircle size={14} style={{ color: "#059669" }} /> {topic}
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
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 800,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        padding: "14px 24px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 12px rgba(10, 25, 47, 0.25)",
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
                        background: "#0A192F",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 800,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        padding: "14px 24px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 12px rgba(10, 25, 47, 0.25)",
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
                      background: "transparent",
                      color: "#0A192F",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      borderRadius: "6px",
                      border: "1px solid #0A192F",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ShieldCheck size={16} style={{ color: "#0A192F" }} />
                    <span>Nominate A Leader</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Synchronized 3D Animated Cover Showcase */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    aspectRatio: "3 / 4",
                    borderRadius: "14px",
                    overflow: "hidden",
                    borderLeft: "6px solid #0A192F",
                    background: "var(--editorial-surface, #FCFAF6)",
                    boxShadow: "0 20px 45px -10px rgba(10, 25, 47, 0.25), 0 8px 20px rgba(16, 23, 34, 0.08)",
                  }}
                >
                  {/* Issue Tag Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      zIndex: 10,
                      background: "#0A192F",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
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
                        <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "20px", padding: "20px", textAlign: "center" }}>
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
                        <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#0A192F", fontWeight: 900, fontSize: "20px", padding: "20px", textAlign: "center" }}>
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
                      marginTop: "18px",
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
                          width: "42px",
                          height: "56px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: idx === currentIndex ? "2.5px solid #0A192F" : "1.5px solid var(--editorial-border, #DDD5CC)",
                          padding: 0,
                          background: "var(--editorial-surface, #FCFAF6)",
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
                          <span style={{ fontSize: "9px", color: "#0A192F", fontWeight: 900 }}>#{idx + 1}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Executive Impact Metrics Counter Bar */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "22px",
            borderTop: "1px solid var(--editorial-border, #DDD5CC)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#0A192F" }}>
              500+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "var(--editorial-charcoal, #55545A)", textTransform: "uppercase" }}>
              EXECUTIVE LEADERS PROFILED
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "var(--editorial-navy, #101722)" }}>
              120K+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "var(--editorial-charcoal, #55545A)", textTransform: "uppercase" }}>
              C-SUITE SUBSCRIBERS
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#0A192F" }}>
              50+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "var(--editorial-charcoal, #55545A)", textTransform: "uppercase" }}>
              COUNTRIES REACHED
            </div>
          </div>

          <div>
            <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "var(--editorial-navy, #101722)" }}>
              100%
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "var(--editorial-charcoal, #55545A)", textTransform: "uppercase" }}>
              INDEPENDENT JOURNALISM
            </div>
          </div>
        </div>
      </div>

      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}

