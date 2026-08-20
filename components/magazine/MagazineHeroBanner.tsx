"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Award, Users, ShieldCheck, Sparkles } from "lucide-react";
import type { MagazineIssue } from "@/types";

interface Props {
  issues: MagazineIssue[];
}

export function MagazineHeroBanner({ issues }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = issues.length > 0 ? issues[activeIndex] : null;

  const handleNext = () => {
    if (issues.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % issues.length);
  };

  const handlePrev = () => {
    if (issues.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + issues.length) % issues.length);
  };

  return (
    <section
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #090B10 0%, #141A29 60%, #06080E 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "60px 6vw 50px",
        borderBottom: "1px solid rgba(252, 211, 77, 0.15)",
      }}
    >
      {/* Decorative Gold Waves Overlay */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}
      >
        <path
          d="M0 192C240 128 480 256 720 192C960 128 1200 224 1440 160V320H0V192Z"
          fill="url(#goldWave)"
        />
        <defs>
          <linearGradient id="goldWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D49A24" />
            <stop offset="100%" stopColor="#B88014" />
          </linearGradient>
        </defs>
      </svg>

      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "48px",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN: Title, Subtitle & Key Stats */}
        <div>
          <h1
            className="font-serif"
            style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 16px", lineHeight: 1.1 }}
          >
            Magazines
          </h1>

          <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, maxWidth: "580px", marginBottom: "36px" }}>
            Exclusive editions featuring visionary leaders, innovators and changemakers shaping the future.
          </p>

          {/* 3 Key Stats Counter Row */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ background: "rgba(212, 154, 36, 0.15)", border: "1px solid rgba(212, 154, 36, 0.3)", padding: "10px", borderRadius: "10px", color: "#D49A24" }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#FFFFFF" }}>80+</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Exclusive Editions</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ background: "rgba(212, 154, 36, 0.15)", border: "1px solid rgba(212, 154, 36, 0.3)", padding: "10px", borderRadius: "10px", color: "#D49A24" }}>
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#FFFFFF" }}>500+</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Inspiring Leaders</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ background: "rgba(212, 154, 36, 0.15)", border: "1px solid rgba(212, 154, 36, 0.3)", padding: "10px", borderRadius: "10px", color: "#D49A24" }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#FFFFFF" }}>10+</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Fan-out Stack Carousel Artwork */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "360px" }}>
          {/* Navigation Arrows on Far Edges */}
          {issues.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "-20px",
                  zIndex: 10,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  color: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label="Previous Magazine"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "-20px",
                  zIndex: 10,
                  background: "rgba(212, 154, 36, 0.25)",
                  border: "1px solid rgba(212, 154, 36, 0.5)",
                  borderRadius: "50%",
                  color: "#D49A24",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label="Next Magazine"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* 3D Overlapping Fan Stack Container */}
          <div style={{ position: "relative", width: "260px", height: "360px" }}>
            {/* Background Layer 2 (Angled right) */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "40px",
                width: "240px",
                height: "330px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1F2937, #111827)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transform: "rotate(6deg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
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
                background: "linear-gradient(135deg, #374151, #1F2937)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                transform: "rotate(3deg)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.6)",
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
                border: "1px solid rgba(212, 154, 36, 0.4)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 154, 36, 0.2)",
                zIndex: 4,
              }}
            >
              {active?.cover ? (
                <Image src={active.cover} alt={active.title} fill className="object-cover" unoptimized priority />
              ) : (
                <div style={{ background: "linear-gradient(135deg, #151027 0%, #241548 100%)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px", textAlign: "center" }}>
                  <div className="font-serif" style={{ fontSize: "22px", fontWeight: 900, color: "#D49A24" }}>STAR PRIME</div>
                  <div style={{ fontSize: "11px", color: "#FFFFFF", marginTop: "6px" }}>INSPIRE. EMPOWER. SUCCEED.</div>
                </div>
              )}
            </div>

            {/* Circular Floating Gold Badge (Matching Image) */}
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                right: "-25px",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D49A24 0%, #B88014 100%)",
                boxShadow: "0 10px 25px rgba(212, 154, 36, 0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "10px",
                zIndex: 6,
                border: "3px solid #090B10",
              }}
            >
              <div style={{ fontSize: "10px", fontWeight: 900, color: "#080A10", lineHeight: 1.2 }}>
                Inspiring Leaders.
              </div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#080A10", marginTop: "3px", opacity: 0.9 }}>
                Impacting Lives.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Pagination Dots */}
      {issues.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "32px" }}>
          {issues.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                width: idx === activeIndex ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: idx === activeIndex ? "#D49A24" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
