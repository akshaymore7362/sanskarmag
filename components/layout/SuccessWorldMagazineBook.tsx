"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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

  if (magazines.length === 0) return null;

  const currentMag = magazines[activeIdx] || magazines[0];
  const nextMag = magazines[(activeIdx + 1) % (magazines.length || 1)] || currentMag;
  const targetLink = currentMag.pdfUrl || `/magazines/${currentMag.slug}`;
  const isExternal = Boolean(currentMag.pdfUrl && currentMag.pdfUrl.startsWith("http"));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* 3D HARDCOVER SPREAD CONTAINER */}
      <div
        onClick={handleNextPage}
        style={{
          position: "relative",
          width: "100%",
          height: "320px",
          perspective: "1200px",
          cursor: "pointer",
          marginBottom: "12px",
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
            borderRadius: "10px",
            background: "#06101E",
            overflow: "hidden",
            border: "1px solid rgba(147, 197, 253, 0.25)",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0,0,0,0.3)",
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
              background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(147, 197, 253,0.3) 50%, rgba(0,0,0,0.6) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          {/* LEFT PAGE: Cover Art */}
          <div
            style={{
              position: "relative",
              height: "100%",
              background: "#102A43",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
            }}
          >
            {currentMag.cover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentMag.cover}
                alt={currentMag.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "#102A43",
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

            {/* Bottom scrim so the CTA stays legible over any cover art */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "38%",
                background: "linear-gradient(0deg, rgba(6,16,30,0.85) 0%, rgba(6,16,30,0) 100%)",
                pointerEvents: "none",
              }}
            />

            <Link
              href={`/magazines/${currentMag.slug}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: "6px",
                right: "6px",
                bottom: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                padding: "5px 6px",
                background: "rgba(16, 42, 67, 0.9)",
                color: "#FFFFFF",
                borderRadius: "5px",
                fontSize: "9px",
                fontWeight: 900,
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              <span>Read Edition</span>
              <BookOpen size={10} />
            </Link>
          </div>

          {/* RIGHT PAGE: Next Edition Cover Art */}
          <div
            style={{
              position: "relative",
              height: "100%",
              background: "#081426",
              overflow: "hidden",
            }}
          >
            {nextMag.cover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={nextMag.cover}
                alt={nextMag.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: 800,
                  textAlign: "center",
                  padding: "6px",
                }}
              >
                {nextMag.title}
              </div>
            )}

            {/* Inner Page Crease Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(270deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Bottom scrim so the CTA stays legible over any cover art */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "38%",
                background: "linear-gradient(0deg, rgba(6,16,30,0.85) 0%, rgba(6,16,30,0) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Open / Read Button Overlay */}
            {isExternal ? (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  left: "6px",
                  right: "6px",
                  bottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "5px 6px",
                  background: "rgba(16, 42, 67, 0.9)",
                  color: "#FFFFFF",
                  borderRadius: "5px",
                  fontSize: "9px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                }}
              >
                <span>Read Edition</span>
                <ExternalLink size={10} />
              </a>
            ) : (
              <Link
                href={targetLink}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  left: "6px",
                  right: "6px",
                  bottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "5px 6px",
                  background: "rgba(16, 42, 67, 0.9)",
                  color: "#FFFFFF",
                  borderRadius: "5px",
                  fontSize: "9px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                }}
              >
                <span>Read Edition</span>
                <BookOpen size={10} />
              </Link>
            )}
          </div>

          {/* 3D Animated Flip Leaf (only visible mid-turn; otherwise the real right page shows through) */}
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
              visibility: bookState === "FLIPPING" ? "visible" : "hidden",
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
                  style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.85 }}
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
                background: "#102A43",
                overflow: "hidden",
              }}
            >
              {nextMag.cover && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={nextMag.cover}
                  alt="Next Leaf"
                  style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.85 }}
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
