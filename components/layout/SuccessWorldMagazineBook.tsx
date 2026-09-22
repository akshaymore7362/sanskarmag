"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function SuccessWorldMagazineBook() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        setMagazines(items.slice(0, 6));
      }
    });
  }, []);

  // Automatic gentle cover cycle every 4 seconds
  useEffect(() => {
    if (magazines.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % magazines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [magazines]);

  function handleNextPage() {
    if (magazines.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % magazines.length);
  }

  function handlePrevPage() {
    if (magazines.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + magazines.length) % magazines.length);
  }

  if (magazines.length === 0) return null;

  const currentMag = magazines[activeIdx] || magazines[0];
  const targetLink = currentMag.pdfUrl || `/magazines/${currentMag.slug}`;
  const isExternal = Boolean(currentMag.pdfUrl && currentMag.pdfUrl.startsWith("http"));

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Single Magazine Cover, fit to the actual cover image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid rgba(16, 42, 67, 0.15)",
          boxShadow: "none",
          marginBottom: "12px",
        }}
      >
        {currentMag.cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={currentMag.cover}
            alt={currentMag.title}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              display: "grid",
              placeItems: "center",
              background: "#102A43",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: 800,
              textAlign: "center",
              padding: "16px",
            }}
          >
            {currentMag.title}
          </div>
        )}

        {/* Bottom scrim so the CTA stays legible over any cover art */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "22%",
            background: "linear-gradient(0deg, rgba(6,16,30,0.85) 0%, rgba(6,16,30,0) 100%)",
            pointerEvents: "none",
          }}
        />

        {isExternal ? (
          <a
            href={targetLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              left: "8px",
              right: "8px",
              bottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "7px 8px",
              background: "rgba(16, 42, 67, 0.9)",
              color: "#FFFFFF",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span>Read Edition</span>
            <ExternalLink size={11} />
          </a>
        ) : (
          <Link
            href={targetLink}
            style={{
              position: "absolute",
              left: "8px",
              right: "8px",
              bottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "7px 8px",
              background: "rgba(16, 42, 67, 0.9)",
              color: "#FFFFFF",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span>Read Edition</span>
            <BookOpen size={11} />
          </Link>
        )}
      </div>

      {/* Manual Controls Row */}
      {magazines.length > 1 && (
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
              background: "transparent",
              border: "1px solid rgba(16, 42, 67, 0.25)",
              color: "#102A43",
              borderRadius: "5px",
              padding: "4px 8px",
              fontSize: "9.5px",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            <ChevronLeft size={11} />
            <span>Prev</span>
          </button>

          <span style={{ fontSize: "9.5px", color: "#55545A", fontWeight: 700 }}>
            {activeIdx + 1} / {magazines.length}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            style={{
              background: "transparent",
              border: "1px solid rgba(16, 42, 67, 0.25)",
              color: "#102A43",
              borderRadius: "5px",
              padding: "4px 8px",
              fontSize: "9.5px",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            <span>Next</span>
            <ChevronRight size={11} />
          </button>
        </div>
      )}
    </div>
  );
}
