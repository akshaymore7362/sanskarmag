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
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "16px",
        padding: "16px",
        width: "100%",
        maxWidth: "320px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Column Title replacing Resources */}
      <h4
        className="footer-col-title font-serif"
        style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "1.5px",
          color: "#C5A059",
          textTransform: "uppercase",
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} style={{ color: "#C5A059" }} />
          OPEN MAGAZINE BOOK
        </span>

        <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "10px", fontWeight: 700 }}>
          Page {activeIdx + 1} of {magazines.length}
        </span>
      </h4>

      {/* REALISTIC OPEN 2-PAGE HARDCOVER MAGAZINE BOOK SPREAD */}
      <div
        style={{
          position: "relative",
          perspective: "1200px",
          margin: "0 auto 14px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            background: "#0A192F",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            padding: "8px",
            boxShadow: "0 14px 36px rgba(0, 0, 0, 0.6)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            overflow: "hidden",
            transition: "all 0.3s ease",
            transform: isFlipping ? "rotateY(-12deg) scale(0.97)" : "rotateY(0deg) scale(1)",
            opacity: isFlipping ? 0.75 : 1,
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
              width: "16px",
              background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.5) 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* LEFT PAGE: Magazine Cover Photo */}
          <div
            style={{
              background: "#0A192F",
              borderRadius: "6px 0 0 6px",
              aspectRatio: "3 / 4",
              overflow: "hidden",
              position: "relative",
              borderRight: "1px solid rgba(255,255,255,0.08)",
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
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#C5A059", fontWeight: 900, fontSize: "11px", padding: "6px", textAlign: "center" }}>
                COVER PAGE
              </div>
            )}
          </div>

          {/* RIGHT PAGE: Page Details & Issue Contents */}
          <div
            style={{
              background: "#0A192F",
              borderRadius: "0 6px 6px 0",
              padding: "10px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "1px solid rgba(0,0,0,0.4)",
            }}
          >
            <div>
              <div style={{ fontSize: "9px", fontWeight: 900, color: "#C5A059", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                {currentMag.date}
              </div>

              <div
                className="font-serif"
                style={{
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.25,
                  margin: "0 0 6px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {currentMag.title}
              </div>

              <p style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.7)", margin: 0, lineHeight: 1.3 }}>
                Executive edition covering business leadership &amp; markets.
              </p>
            </div>

            <div style={{ marginTop: "8px" }}>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
                Page {activeIdx + 1}
              </div>

              {isExternal ? (
                <a
                  href={targetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    width: "100%",
                    padding: "6px",
                    background: "#C5A059",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <span>Open Page</span>
                  <ExternalLink size={10} />
                </a>
              ) : (
                <Link
                  href={targetLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    width: "100%",
                    padding: "6px",
                    background: "#C5A059",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <span>Open Page</span>
                  <BookOpen size={10} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Page Flip Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <button
          type="button"
          onClick={handlePrevPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "10px",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={12} />
          <span>Prev Page</span>
        </button>

        <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>
          {activeIdx + 1} / {magazines.length}
        </span>

        <button
          type="button"
          onClick={handleNextPage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "10px",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
          }}
        >
          <span>Next Page</span>
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
