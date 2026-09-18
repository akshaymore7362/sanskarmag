"use client";

import { useState } from "react";
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
} from "lucide-react";
import { NominateModal } from "@/components/modals/NominateModal";
import { useMagazineSync, deriveWebProfile } from "@/components/home/MagazineSyncContext";

export function HeroSection() {
  // Single source of truth, shared with WebProfilesSection via
  // MagazineSyncProvider: the issue list, which issue id is selected, and
  // the navigation functions used by every input (autoplay, buttons, dots,
  // swipe). There is no separate local index/state here — the cover below
  // and WebProfilesSection's spotlight both render from the exact same
  // `selectedIssue` object, so they cannot drift apart.
  const { issues, selectedIssue, selectedIndex, direction, goToNext, goToPrev, goToId, isPaused, setPaused } =
    useMagazineSync();
  const [nominateOpen, setNominateOpen] = useState(false);

  const activeIssue = selectedIssue;
  // Derived directly from the same issue object as the cover — never from a
  // separate leaders array — so it can never mismatch.
  const profile = activeIssue ? deriveWebProfile(activeIssue) : null;

  const heroTitle = activeIssue?.title || "International Executive Edition";
  const heroDesc =
    activeIssue?.subtitle ||
    activeIssue?.description ||
    "Delivering strategic economic briefings and executive insights for global decision makers.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION 0${selectedIndex + 1}`;
  const issueDate = activeIssue?.date || activeIssue?.year || "";

  const targetPdfUrl = activeIssue?.pdfUrl ? activeIssue.pdfUrl : `/magazines/${activeIssue?.slug || ""}`;
  const isExternalPdf = Boolean(
    activeIssue?.pdfUrl && (activeIssue.pdfUrl.startsWith("http://") || activeIssue.pdfUrl.startsWith("https://"))
  );

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

  const behind1 = issues.length > 1 ? issues[(selectedIndex + 1) % issues.length] : null;
  const behind2 = issues.length > 2 ? issues[(selectedIndex + 2) % issues.length] : null;

  return (
    <section
      style={{
        backgroundColor: "var(--editorial-ivory, #F7F5EF)",
        background: "var(--editorial-ivory, #F7F5EF)",
        borderBottom: "1px solid var(--editorial-border, #DDD5CC)",
        padding: "24px 0 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle editorial watermark + grid — decorative only, kept low-opacity so it never competes with content */}
      <div aria-hidden className="hero-decor tsw-in-header" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        <span
          className="font-serif"
          style={{
            position: "absolute",
            top: "-6%",
            right: "-2%",
            fontSize: "clamp(140px, 22vw, 340px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#102A43",
            opacity: 0.045,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          SUCCESS
        </span>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "6%",
            width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(16,42,67,0.12) 20%, rgba(16,42,67,0.12) 80%, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "18%",
            width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(16,42,67,0.08) 20%, rgba(16,42,67,0.08) 80%, transparent)",
          }}
        />
      </div>

      <div className="site-shell" style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "0 clamp(16px, 2.5vw, 40px)", position: "relative", zIndex: 2 }}>
        {/* Top Eyebrow & Navigation Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                background: "#102A43",
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
          </div>

          {issues.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#102A43" }}>
                0{selectedIndex + 1} <span style={{ color: "#55545A" }}>/ 0{issues.length}</span>
              </span>

              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  type="button"
                  onClick={goToPrev}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "50%",
                    color: "#102A43",
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
                  onClick={goToNext}
                  style={{
                    background: "#102A43",
                    border: "1px solid #102A43",
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
              key={selectedIssue?.id ?? selectedIndex}
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
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
                {/* Main Headline */}
                <h1
                  className="font-serif tsw-in-1"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 44px)",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    color: "#101722",
                    margin: 0,
                    letterSpacing: "-0.3px",
                    maxWidth: "16ch",
                  }}
                >
                  Empowering Visionaries &amp; <span style={{ color: "#102A43" }}>Shaping Global Markets</span>
                </h1>

                {/* Single Combined Featured Coverage Text Block */}
                <div className="tsw-in-2" style={{ maxWidth: "620px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#102A43", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px" }}>
                    FEATURED COVERAGE &bull; {issueTag}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "19px", fontWeight: 800, color: "#101722", margin: "0 0 6px", lineHeight: 1.3 }}>
                    {heroTitle}
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "#55545A", margin: 0, lineHeight: 1.6 }}>
                    {heroDesc}
                  </p>
                </div>

                {/* Executive Profile — derived from this exact issue, so it can never show a different person than the cover */}
                {profile && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 0" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid #102A43", flexShrink: 0 }}>
                      {profile.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={profile.avatar} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#102A43", color: "#FFFFFF", fontWeight: 800, fontSize: "17px" }}>
                          {profile.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "#101722", lineHeight: 1.2 }}>
                        {profile.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#55545A", fontWeight: 600 }}>
                        {profile.headline}
                      </div>
                    </div>
                  </div>
                )}

                {/* Industry Topics Tag Bar */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", fontWeight: 700, color: "#55545A" }}>
                  {["Enterprise AI & Tech", "Capital Markets", "Executive Leadership"].map((topic) => (
                    <span key={topic} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle size={12} style={{ color: "#059669" }} /> {topic}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="tsw-in-3" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
                  {isExternalPdf ? (
                    <a
                      href={targetPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{
                        background: "#4472C4",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        padding: "13px 22px",
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
                      className="btn"
                      style={{
                        background: "#4472C4",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        padding: "13px 22px",
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
                      color: "#4472C4",
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      padding: "13px 22px",
                      borderRadius: "6px",
                      border: "1.5px solid #4472C4",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ShieldCheck size={14} style={{ color: "#4472C4" }} />
                    <span>Nominate Now</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Expansive 3D 3-Layer Cross Magazine Fan Showcase */}
              <div className="tsw-in-scale" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  style={{
                    position: "relative",
                    width: "clamp(220px, 74vw, 440px)",
                    height: "clamp(250px, 84vw, 500px)",
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
                        width: "clamp(148px, 50vw, 295px)",
                        aspectRatio: "8 / 10.5",
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
                        <div style={{ height: "100%", background: "#102A43" }} />
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
                        width: "clamp(155px, 52vw, 310px)",
                        aspectRatio: "8 / 10.5",
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
                        <div style={{ height: "100%", background: "#102A43" }} />
                      )}
                    </div>
                  )}

                  {/* Front Main Upright Active Cover (Large Focal Point) */}
                  <div
                    style={{
                      position: "relative",
                      width: "clamp(165px, 56vw, 330px)",
                      aspectRatio: "8 / 10.5",
                      borderRadius: "14px",
                      overflow: "hidden",
                      borderLeft: "6px solid #102A43",
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
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#102A43", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
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
                          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#102A43", fontWeight: 900, fontSize: "18px", padding: "16px", textAlign: "center" }}>
                            THE SUCCESS WORLD
                          </div>
                        )}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Thumbnail Switcher */}
                {issues.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {issues.map((item, idx) => {
                      const isActive = item.id === selectedIssue?.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => goToId(item.id ?? "")}
                          aria-label={`Switch to magazine ${idx + 1}`}
                          aria-current={isActive}
                          style={{
                            width: "36px",
                            height: "48px",
                            borderRadius: "4px",
                            overflow: "hidden",
                            border: isActive ? "2.5px solid #102A43" : "1px solid #CBD5E1",
                            padding: 0,
                            background: "#FCFAF6",
                            cursor: "pointer",
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? "scale(1.08)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {item.cover ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={item.cover} alt={`Magazine ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <span style={{ fontSize: "9px", color: "#102A43", fontWeight: 800 }}>#{idx + 1}</span>
                          )}
                        </button>
                      );
                    })}
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
          <div className="hero-stat-tile">
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#102A43", lineHeight: 1.1 }}>
              500+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              EXECUTIVE LEADERS
            </div>
          </div>

          <div className="hero-stat-tile">
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#101722", lineHeight: 1.1 }}>
              120K+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              C-SUITE SUBSCRIBERS
            </div>
          </div>

          <div className="hero-stat-tile">
            <div className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#102A43", lineHeight: 1.1 }}>
              50+
            </div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", color: "#55545A", textTransform: "uppercase" }}>
              COUNTRIES REACHED
            </div>
          </div>

          <div className="hero-stat-tile">
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


