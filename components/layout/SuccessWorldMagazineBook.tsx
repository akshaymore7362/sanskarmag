"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function SuccessWorldMagazineBook() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bookState, setBookState] = useState<"CLOSED" | "OPEN" | "FLIPPING">("OPEN");

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        setMagazines(items.slice(0, 6));
      }
    });
  }, []);

  // Automatic gentle page turn cycle every 4 seconds
  useEffect(() => {
    if (magazines.length <= 1) return;

    const timer = setInterval(() => {
      handleNextPage();
    }, 4000);

    return () => clearInterval(timer);
  }, [magazines, activeIdx]);

  function handleNextPage() {
    if (magazines.length === 0) return;
    setBookState("FLIPPING");
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % magazines.length);
      setBookState("OPEN");
    }, 450);
  }

  function handlePrevPage() {
    if (magazines.length === 0) return;
    setBookState("FLIPPING");
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + magazines.length) % magazines.length);
      setBookState("OPEN");
    }, 450);
  }

  const currentMag = magazines[activeIdx] || {
    title: "Executive Edition 2026",
    issue: "Edition 01",
    date: "May 2026",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    slug: "executive-magazine-2026",
  };

  const nextMag = magazines[(activeIdx + 1) % (magazines.length || 1)] || currentMag;
  const targetLink = currentMag.pdfUrl || `/magazines/${currentMag.slug}`;
  const isExternal = Boolean(currentMag.pdfUrl && currentMag.pdfUrl.startsWith("http"));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
        background: "#0A192F",
        border: "1px solid rgba(197, 160, 89, 0.3)",
        borderRadius: "14px",
        padding: "12px 14px",
        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Top Edition & Page Status Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          fontSize: "10px",
          fontWeight: 800,
          color: "#1E40AF",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <Sparkles size={12} />
          {currentMag.issue || "EDITION 2026"}
        </span>
        <span style={{ color: "#94A3B8" }}>
          {activeIdx + 1} / {magazines.length || 1}
        </span>
      </div>

      {/* 3D HARDCOVER SPREAD CONTAINER */}
      <div
        onClick={handleNextPage}
        style={{
          position: "relative",
          width: "100%",
          height: "145px",
          perspective: "1000px",
          cursor: "pointer",
          marginBottom: "10px",
          userSelect: "none",
        }}
        title="Click to turn page"
      >
        {/* Book Outer Frame Spread */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            background: "#06101E",
            overflow: "hidden",
          }}
        >
          {/* CENTER SPINE CREASE SHADOW */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px",
              background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(197,160,89,0.3) 50%, rgba(0,0,0,0.6) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          {/* LEFT PAGE: Cover Art */}
          <div
            style={{
              position: "relative",
              height: "100%",
              background: "#0A192F",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
            }}
          >
            {currentMag.cover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentMag.cover}
                alt={currentMag.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "#1E40AF",
                  fontSize: "10px",
                  fontWeight: 800,
                  textAlign: "center",
                  padding: "6px",
                }}
              >
                {currentMag.title}
              </div>
            )}

            {/* Inner Page Crease Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* RIGHT PAGE: Details & Instant CTA */}
          <div
            style={{
              position: "relative",
              height: "100%",
              background: "#081426",
              padding: "10px 8px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#1E40AF", marginBottom: "3px" }}>
                {currentMag.date || "2026"}
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.25,
                  margin: "0 0 4px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {currentMag.title}
              </div>
              <p
                style={{
                  fontSize: "9px",
                  color: "#94A3B8",
                  margin: 0,
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {currentMag.subtitle || "Executive briefing & market analysis."}
              </p>
            </div>

            {/* Open / Read Button */}
            {isExternal ? (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  width: "100%",
                  padding: "5px 6px",
                  background: "#1E40AF",
                  color: "#0A192F",
                  borderRadius: "5px",
                  fontSize: "9.5px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                <span>Read PDF</span>
                <ExternalLink size={10} />
              </a>
            ) : (
              <Link
                href={targetLink}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  width: "100%",
                  padding: "5px 6px",
                  background: "#1E40AF",
                  color: "#0A192F",
                  borderRadius: "5px",
                  fontSize: "9.5px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                <span>Open Issue</span>
                <BookOpen size={10} />
              </Link>
            )}
          </div>

          {/* 3D Animated Flip Leaf */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "50%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transition: "transform 0.45s ease-in-out",
              transform: bookState === "FLIPPING" ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: 15,
              pointerEvents: "none",
            }}
          >
            {/* Front of leaf */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "#081426",
                overflow: "hidden",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {currentMag.cover && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentMag.cover}
                  alt="Turning Leaf"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
              )}
            </div>

            {/* Back of leaf */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "#0A192F",
                overflow: "hidden",
              }}
            >
              {nextMag.cover && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={nextMag.cover}
                  alt="Next Leaf"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
        }}
      >
        <button
          type="button"
          onClick={handlePrevPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "5px",
            padding: "4px 8px",
            fontSize: "9.5px",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={11} />
          <span>Prev</span>
        </button>

        <span style={{ fontSize: "9.5px", color: "#94A3B8", fontWeight: 700 }}>
          Tap to turn page
        </span>

        <button
          type="button"
          onClick={handleNextPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "5px",
            padding: "4px 8px",
            fontSize: "9.5px",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            cursor: "pointer",
          }}
        >
          <span>Next</span>
          <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}
