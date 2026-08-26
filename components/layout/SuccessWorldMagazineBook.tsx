"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Pause, Play, ExternalLink, Sparkles } from "lucide-react";
import { magazineService } from "@/services/magazineService";

export interface MagazineData {
  id: number;
  title: string;
  issue: string;
  date: string;
  cover: string;
  pdfUrl?: string;
  slug: string;
}

const defaultMagazines: MagazineData[] = [
  {
    id: 1,
    title: "Magazine 01",
    issue: "Edition 01",
    date: "JAN 2026",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-01",
  },
  {
    id: 2,
    title: "Magazine 02",
    issue: "Edition 02",
    date: "FEB 2026",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-02",
  },
  {
    id: 3,
    title: "Magazine 03",
    issue: "Edition 03",
    date: "MAR 2026",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-03",
  },
  {
    id: 4,
    title: "Magazine 04",
    issue: "Edition 04",
    date: "APR 2026",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-04",
  },
  {
    id: 5,
    title: "Magazine 05",
    issue: "Edition 05",
    date: "MAY 2026",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-05",
  },
  {
    id: 6,
    title: "Magazine 06",
    issue: "Edition 06",
    date: "JUN 2026",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
    slug: "magazine-06",
  },
];

export function SuccessWorldMagazineBook() {
  const [magazines, setMagazines] = useState<MagazineData[]>(defaultMagazines);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isOpenBook, setIsOpenBook] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch real Sanity magazines or structure exactly 6 magazines
  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        const mapped = items.slice(0, 6).map((item, idx) => ({
          id: idx + 1,
          title: item.title || `Magazine 0${idx + 1}`,
          issue: `Magazine 0${idx + 1}`,
          date: item.date || "2026",
          cover: item.cover || defaultMagazines[idx % 6].cover,
          pdfUrl: item.pdfUrl,
          slug: item.slug || `magazine-0${idx + 1}`,
        }));

        while (mapped.length < 6) {
          const idx = mapped.length;
          const fb = defaultMagazines[idx];
          mapped.push({
            id: idx + 1,
            title: `Magazine 0${idx + 1}`,
            issue: `Magazine 0${idx + 1}`,
            date: fb.date,
            cover: fb.cover,
            pdfUrl: fb.pdfUrl,
            slug: fb.slug,
          });
        }
        setMagazines(mapped.slice(0, 6));
      }
    });
  }, []);

  // Automatic 2-Second Page Flip & Animation Cycle
  useEffect(() => {
    if (isPaused || magazines.length <= 1) return;

    const interval = setInterval(() => {
      if (!isOpenBook) {
        setIsOpenBook(true); // Smoothly open book
      } else {
        flipToNext(); // Turn 3D page every 2.2 seconds
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isOpenBook, magazines]);

  function flipToNext() {
    if (isFlipping) return;
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
      setIsFlipping(false);
    }, 850); // Matches 3D page turn CSS transition duration
  }

  function flipToPrev() {
    if (isFlipping) return;
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + magazines.length) % magazines.length);
      setIsFlipping(false);
    }, 850);
  }

  function handleUserInteract() {
    setIsPaused(true);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000); // Resume auto-animation after 4s inactivity
  }

  const currentMag = magazines[currentIndex] || defaultMagazines[0];
  const nextMag = magazines[(currentIndex + 1) % magazines.length] || defaultMagazines[1];
  const targetHref = currentMag.pdfUrl || `/magazines/${currentMag.slug}`;
  const isExternal = Boolean(currentMag.pdfUrl && currentMag.pdfUrl.startsWith("http"));

  return (
    <div
      className="success-world-magazine-book"
      onMouseEnter={handleUserInteract}
      onClick={handleUserInteract}
      style={{
        width: "100%",
        maxWidth: "340px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 3D MAGAZINE BOOK STAGE */}
      <div
        style={{
          position: "relative",
          width: "100%",
          perspective: "1400px",
          padding: "16px 0 24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* SOFT AMBIENT SHADOW BENEATH BOOK */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            width: "82%",
            height: "18px",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 75%)",
            borderRadius: "50%",
            zIndex: 1,
            pointerEvents: "none",
            transition: "transform 0.4s ease",
            transform: isFlipping ? "scale(1.05) translateY(2px)" : "scale(1)",
          }}
        />

        {/* PHYSICAL 3D HARDCOVER BOOK */}
        <div
          style={{
            position: "relative",
            width: isOpenBook ? "310px" : "165px",
            height: "215px",
            transformStyle: "preserve-3d",
            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenBook(!isOpenBook);
          }}
          title={isOpenBook ? "Click to Close Magazine Book" : "Click to Open Magazine Book"}
        >
          {/* HARDCOVER EMBOSSED SPINE */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: isOpenBook ? "50%" : 0,
              width: "12px",
              marginLeft: isOpenBook ? "-6px" : "0",
              background: "linear-gradient(90deg, #50071C 0%, #8B1029 40%, #B69A5A 50%, #8B1029 60%, #50071C 100%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              zIndex: 30,
              borderRadius: "2px",
              transition: "left 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* 1. CLOSED BOOK COVER (Success World Executive Cover) */}
          {!isOpenBook && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px 10px 10px 4px",
                overflow: "hidden",
                background: "#0A0D16",
                boxShadow: "-6px 0 12px rgba(0,0,0,0.4), 8px 12px 30px rgba(0,0,0,0.6)",
                borderLeft: "6px solid #8B1029",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Stacked Paper Edges */}
              <div
                style={{
                  position: "absolute",
                  right: "-5px",
                  top: "4px",
                  bottom: "4px",
                  width: "8px",
                  background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                  boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3)",
                }}
              />

              {/* Cover Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentMag.cover}
                alt={`Success World ${currentMag.title} Cover`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Success World Logo & Magazine Name Header */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(180deg, rgba(10,13,22,0.92) 0%, rgba(10,13,22,0) 100%)",
                  padding: "10px 8px 18px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Success World Emblem"
                  style={{ height: "24px", width: "auto", marginBottom: "4px", borderRadius: "50%" }}
                />
                <div style={{ fontSize: "7px", fontWeight: 900, letterSpacing: "2px", color: "#8B1029", textTransform: "uppercase" }}>
                  THE EXECUTIVE PUBLICATION
                </div>
                <div className="font-serif" style={{ fontSize: "13px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.5px" }}>
                  SUCCESS WORLD
                </div>
              </div>
            </div>
          )}

          {/* 2. OPEN BOOK 2-PAGE SPREAD (Realistic 3D Page Turn) */}
          {isOpenBook && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                boxShadow: "0 14px 40px rgba(0, 0, 0, 0.7)",
                borderRadius: "6px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* LEFT PAGE: Current Magazine Cover */}
              <div
                style={{
                  position: "relative",
                  background: "#0A0D16",
                  borderRadius: "6px 0 0 6px",
                  overflow: "hidden",
                  borderRight: "1px solid rgba(0,0,0,0.6)",
                  boxShadow: "inset -10px 0 20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Left Stacked Paper Edges */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "3px",
                    bottom: "3px",
                    width: "4px",
                    background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                  }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentMag.cover}
                  alt={`Success World ${currentMag.title} Cover`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Left Page Top Header */}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "6px",
                    right: "6px",
                    background: "rgba(10, 13, 22, 0.85)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(139, 16, 41, 0.4)",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "8px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "1px" }}>
                    SUCCESS WORLD
                  </span>
                  <span style={{ fontSize: "8px", fontWeight: 800, color: "#8B1029" }}>
                    {currentMag.date}
                  </span>
                </div>
              </div>

              {/* RIGHT PAGE: Next Magazine Cover */}
              <div
                style={{
                  position: "relative",
                  background: "#0A0D16",
                  borderRadius: "0 6px 6px 0",
                  overflow: "hidden",
                  borderLeft: "1px solid rgba(0,0,0,0.6)",
                  boxShadow: "inset 10px 0 20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Right Stacked Paper Edges */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "3px",
                    bottom: "3px",
                    width: "4px",
                    background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                  }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nextMag.cover}
                  alt={`Success World Next Cover`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Right Page Footer Tag */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "6px",
                    right: "6px",
                    background: "rgba(10, 13, 22, 0.88)",
                    backdropFilter: "blur(4px)",
                    padding: "5px 6px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <div style={{ fontSize: "8px", fontWeight: 900, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase" }}>
                    NEXT ISSUE &bull; {nextMag.issue}
                  </div>
                  <div style={{ fontSize: "9px", fontWeight: 800, color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {nextMag.title}
                  </div>
                </div>
              </div>

              {/* 3D REALISTIC PAGE FLIP LEAF (Animates rotateY(0deg) -> rotateY(-180deg)) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: "50%",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.85s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                  transform: isFlipping ? "rotateY(-180deg)" : "rotateY(0deg)",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                {/* FRONT FACE OF FLIPPING PAGE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background: "#0A0D16",
                    borderRadius: "0 6px 6px 0",
                    overflow: "hidden",
                    boxShadow: "inset 10px 0 20px rgba(0,0,0,0.4), 10px 0 25px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentMag.cover}
                    alt="Turning Page Front"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                      opacity: isFlipping ? 0.6 : 0,
                      transition: "opacity 0.85s ease",
                    }}
                  />
                </div>

                {/* BACK FACE OF FLIPPING PAGE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "#0A0D16",
                    borderRadius: "6px 0 0 6px",
                    overflow: "hidden",
                    boxShadow: "inset -10px 0 20px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nextMag.cover}
                    alt="Turning Page Back"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAGAZINE DETAILS & CONTROLS */}
      <div
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "12px",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Magazine Title & Edition Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 900, color: "#8B1029", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {currentMag.issue} &bull; <span style={{ color: "rgba(255,255,255,0.7)" }}>{currentMag.date}</span>
            </div>
            <div className="font-serif" style={{ fontSize: "13px", fontWeight: 900, color: "#FFFFFF", margin: "2px 0 0" }}>
              {currentMag.title}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(!isPaused);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            {isPaused ? <Play size={11} style={{ color: "#22C55E" }} /> : <Pause size={11} style={{ color: "#8B1029" }} />}
            <span>{isPaused ? "Play" : "Pause"}</span>
          </button>
        </div>

        {/* 6 Magazine Page Flip Dots & Navigation Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              flipToPrev();
            }}
            disabled={isFlipping}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <ChevronLeft size={12} />
            <span>Prev</span>
          </button>

          {/* Strictly 6 Magazine Dots */}
          <div style={{ display: "flex", gap: "4px" }}>
            {magazines.slice(0, 6).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserInteract();
                  setCurrentIndex(idx);
                }}
                style={{
                  width: idx === currentIndex ? "14px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: idx === currentIndex ? "#8B1029" : "rgba(255, 255, 255, 0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                aria-label={`Go to Magazine 0${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              flipToNext();
            }}
            disabled={isFlipping}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>Next</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Open Digital Magazine Issue Link */}
        {isExternal ? (
          <a
            href={targetHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              padding: "8px",
              background: "#8B1029",
              color: "#FFFFFF",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(139, 16, 41, 0.35)",
            }}
          >
            <BookOpen size={13} />
            <span>Read Digital Magazine Issue</span>
            <ExternalLink size={11} />
          </a>
        ) : (
          <Link
            href={targetHref}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              padding: "8px",
              background: "#8B1029",
              color: "#FFFFFF",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(139, 16, 41, 0.35)",
            }}
          >
            <BookOpen size={13} />
            <span>Read Digital Magazine Issue</span>
          </Link>
        )}
      </div>
    </div>
  );
}
