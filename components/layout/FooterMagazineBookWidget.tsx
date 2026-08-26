"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function FooterMagazineBookWidget() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        setMagazines(items.slice(0, 6)); // Strictly latest 6 magazines
      }
    });
  }, []);

  // Auto-flip magazine pages every 3.5 seconds
  useEffect(() => {
    if (magazines.length <= 1) return;

    const timer = setInterval(() => {
      handleNextPage();
    }, 3500);

    return () => clearInterval(timer);
  }, [magazines, activeIdx]);

  function handleNextPage() {
    if (magazines.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % magazines.length);
      setIsFlipping(false);
    }, 300);
  }

  function handlePrevPage() {
    if (magazines.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + magazines.length) % magazines.length);
      setIsFlipping(false);
    }, 300);
  }

  if (magazines.length === 0) return null;

  const currentMag = magazines[activeIdx];
  const targetLink = currentMag.pdfUrl || `/magazines/${currentMag.slug}`;
  const isExternal = Boolean(currentMag.pdfUrl && currentMag.pdfUrl.startsWith("http"));

  return (
    <div
      style={{
        marginTop: "12px",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "14px",
        padding: "14px",
        maxWidth: "280px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Header Tagline */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#8B1029",
          textTransform: "uppercase",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <Sparkles size={12} style={{ color: "#8B1029" }} />
          FLIPPING MAGAZINE BOOK
        </span>

        <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "9px" }}>
          {activeIdx + 1} / {magazines.length}
        </span>
      </div>

      {/* 3D Animated Flipping Magazine Cover Book Container */}
      <div style={{ position: "relative", perspective: "1000px", margin: "0 auto 12px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 4",
            maxHeight: "190px",
            borderRadius: "8px",
            overflow: "hidden",
            borderLeft: "4px solid #8B1029",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), inset -2px 0 6px rgba(0,0,0,0.4)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: isFlipping ? "rotateY(-15deg) scale(0.96)" : "rotateY(0deg) scale(1)",
            opacity: isFlipping ? 0.7 : 1,
            background: "#0A0D16",
          }}
        >
          {/* Cover Image */}
          {currentMag.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentMag.cover}
              alt={currentMag.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "14px", padding: "10px", textAlign: "center" }}>
              THE SUCCESS WORLD
            </div>
          )}

          {/* Overlay Edition Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              right: "8px",
              background: "rgba(10, 13, 22, 0.85)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "4px 8px",
              borderRadius: "4px",
              color: "#FFFFFF",
              fontSize: "10px",
              fontWeight: 800,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#8B1029" }}>{currentMag.date}</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>Issue #{activeIdx + 1}</span>
          </div>
        </div>
      </div>

      {/* Title & Page Flip Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={handlePrevPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
          aria-label="Previous magazine page"
        >
          <ChevronLeft size={14} />
        </button>

        <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#FFFFFF", textOverflow: "ellipsis", overflow: "hidden" }}>
            {currentMag.title}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
          aria-label="Next magazine page"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Read Issue Button Link */}
      {isExternal ? (
        <a
          href={targetLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "8px 12px",
            background: "#8B1029",
            color: "#FFFFFF",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(139, 16, 41, 0.35)",
          }}
        >
          <BookOpen size={13} />
          <span>Read Digital Issue</span>
          <ExternalLink size={12} />
        </a>
      ) : (
        <Link
          href={targetLink}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "8px 12px",
            background: "#8B1029",
            color: "#FFFFFF",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(139, 16, 41, 0.35)",
          }}
        >
          <BookOpen size={13} />
          <span>Read Digital Issue</span>
        </Link>
      )}
    </div>
  );
}
