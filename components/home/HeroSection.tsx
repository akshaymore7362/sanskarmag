"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Award, CheckCircle, Sparkles, User } from "lucide-react";
import { NominateModal } from "@/components/modals/NominateModal";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import type { MagazineIssue, Leader } from "@/types";

export function HeroSection() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nominateOpen, setNominateOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((issues) => {
      if (issues && issues.length > 0) {
        setMagazines(issues.slice(0, 5));
      } else {
        setMagazines(magazineService.all().slice(0, 5));
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Automatic Carousel: Advances magazine slide every 1000ms (1 second)
  useEffect(() => {
    if (magazines.length === 0) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.min(magazines.length, 5));
        setIsAnimating(false);
      }, 200);
    }, 1000);

    return () => clearInterval(timer);
  }, [magazines.length]);

  const handleNext = () => {
    if (magazines.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(magazines.length, 5));
      setIsAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    if (magazines.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + Math.min(magazines.length, 5)) % Math.min(magazines.length, 5));
      setIsAnimating(false);
    }, 200);
  };

  const displayMagazines = magazines.slice(0, 5);
  const activeIssue = displayMagazines.length > 0 ? displayMagazines[currentIndex % displayMagazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  return (
    <section
      className="hero-editorial-section"
      aria-label="Executive Magazine Hero"
      style={{
        width: "100%",
        minHeight: "520px",
        background: "linear-gradient(135deg, #060913 0%, #0B0F1C 50%, #150811 100%)",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Parallax Layer (drifts slowly at 0.35x speed) */}
      <div
        className={`hero-bg-parallax-layer ${isAnimating ? "exiting" : "entering"}`}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          pointerEvents: "none",
          backgroundImage: activeIssue?.cover
            ? `radial-gradient(circle at 70% 30%, rgba(212, 154, 36, 0.25) 0%, transparent 60%), url(${activeIssue.cover})`
            : "radial-gradient(circle at 70% 30%, rgba(212, 154, 36, 0.25) 0%, transparent 60%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(24px)",
          transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-out",
        }}
      />

      <div
        className="hero-fullwidth-grid"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* LEFT COLUMN: Foreground Magazine Image Layer (moves at 0.65x speed with depth scale 1.03x -> 1.00x) */}
        <div className="hero-left-cover-col">
          <div
            className={`hero-magazine-cover-box hero-fg-parallax-layer ${isAnimating ? "exiting" : "entering"}`}
          >
            {activeIssue?.cover ? (
              <Image
                src={activeIssue.cover}
                alt={activeIssue.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="hero-cover-placeholder">
                <div className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#D49A24" }}>The Success World</div>
                <div style={{ fontSize: "12px", color: "#FFFFFF", marginTop: "8px", letterSpacing: "2px" }}>EXECUTIVE EDITION</div>
              </div>
            )}
            {/* Edition Top Badge */}
            <div className="hero-cover-top-badge">
              {activeIssue?.issue || `Issue 0${currentIndex + 1}`}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Content Layer */}
        <div className="hero-right-content-col">
          {/* Layer 4: Small Metadata & Gold Pill (moves at 1.15x speed) */}
          <div className={`hero-eyebrow-row hero-meta-parallax-layer ${isAnimating ? "exiting" : "entering"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                className="hero-gold-pill"
                style={{
                  background: "rgba(212, 154, 36, 0.15)",
                  border: "1px solid rgba(212, 154, 36, 0.35)",
                  color: "#D49A24",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                <Sparkles size={13} /> INTERNATIONAL MAGAZINE EDITION
              </span>
              <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>
                {activeIssue?.date || "2026 Edition"}
              </span>
            </div>

            {/* Prev / Next Controls */}
            {displayMagazines.length > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#D49A24", fontWeight: 700, marginRight: "4px" }}>
                  0{currentIndex + 1} / 0{displayMagazines.length}
                </span>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hero-arrow-btn"
                  aria-label="Previous Magazine Edition"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hero-arrow-btn active"
                  aria-label="Next Magazine Edition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Layer 3: Headline & Editorial Text (moves at 1.0x speed with 25px slide) */}
          <div className={`hero-text-parallax-layer ${isAnimating ? "exiting" : "entering"}`}>
            <h1 className="hero-main-title font-serif">
              {activeIssue?.title || "The Architect of Intelligence & Global Enterprise"}
            </h1>
            <p className="hero-main-desc">
              {activeIssue?.description || "Inside the executive mindset shaping the next decade of enterprise, technology, and global capital allocation."}
            </p>
          </div>

          {/* Executive Leadership Card Layer */}
          <div className={`hero-leader-card hero-text-parallax-layer ${isAnimating ? "exiting" : "entering"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="hero-leader-avatar">
                {activeLeader?.image ? (
                  <Image src={activeLeader.image} alt={activeLeader.name} fill className="object-cover" unoptimized />
                ) : (
                  <div style={{ background: "#D49A24", height: "100%", display: "grid", placeItems: "center", color: "#080A10", fontWeight: 800 }}>
                    <User size={24} />
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Award size={13} style={{ color: "#D49A24" }} />
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                    COVER FEATURED EXECUTIVE
                  </span>
                </div>
                <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", margin: "2px 0 0" }}>
                  {activeLeader?.name || "Executive Leadership Board"}
                </h3>
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.75)", fontWeight: 600 }}>
                  {activeLeader?.role || "Global Leader"} {activeLeader?.company ? `• ${activeLeader.company}` : ""}
                </div>
              </div>
            </div>

            {activeLeader?.bio && (
              <p className="hero-leader-quote">
                "{activeLeader.bio}"
              </p>
            )}
          </div>

          {/* Topics Pills */}
          <div className={`hero-text-parallax-layer ${isAnimating ? "exiting" : "entering"}`} style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px", textTransform: "uppercase", flexShrink: 0 }}>
              TOPICS:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["01 AI Leadership", "02 Capital Markets", "03 Global Scale", "04 Enterprise Tech"].map((topic, tIdx) => (
                <div key={tIdx} className="hero-topic-pill">
                  <CheckCircle size={12} style={{ color: "#D49A24", flexShrink: 0 }} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons & Pagination Dots (100ms delayed movement) */}
          <div className={`hero-actions-bar hero-cta-parallax-layer ${isAnimating ? "exiting" : "entering"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/magazines" className="btn btn-gold-gradient" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: 800, borderRadius: "10px" }}>
                <BookOpen size={18} />
                <span>Read Digital Magazine</span>
                <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={() => setNominateOpen(true)}
                className="btn"
                style={{
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: "rgba(212, 154, 36, 0.18)",
                  border: "1px solid rgba(212, 154, 36, 0.5)",
                  color: "#D49A24",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Award size={18} />
                <span>Nominate Now</span>
              </button>
            </div>

            {/* Pagination Dots for 5 Latest Magazines */}
            {displayMagazines.length > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {displayMagazines.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(idx);
                        setIsAnimating(false);
                      }, 200);
                    }}
                    className={`hero-dot ${idx === currentIndex ? "active" : ""}`}
                    aria-label={`Go to magazine ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}
