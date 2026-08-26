"use client";

import { useEffect, useState } from "react";
import { magazineService } from "@/services/magazineService";

export interface MagazineData {
  id: number;
  title: string;
  cover: string;
}

const defaultMagazines: MagazineData[] = [
  {
    id: 1,
    title: "Magazine 01",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Magazine 02",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Magazine 03",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Magazine 04",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Magazine 05",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Magazine 06",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
];

type BookState = "CLOSED" | "OPENING" | "OPEN" | "FLIPPING" | "CLOSING";

export function SuccessWorldMagazineBook() {
  const [magazines, setMagazines] = useState<MagazineData[]>(defaultMagazines);
  const [magIndex, setMagIndex] = useState(0);
  const [bookState, setBookState] = useState<BookState>("CLOSED");

  // Fetch Sanity magazine covers or structure strictly 6 magazines
  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        const mapped = items.slice(0, 6).map((item, idx) => ({
          id: idx + 1,
          title: `Magazine 0${idx + 1}`,
          cover: item.cover || defaultMagazines[idx % 6].cover,
        }));

        while (mapped.length < 6) {
          const idx = mapped.length;
          mapped.push({
            id: idx + 1,
            title: `Magazine 0${idx + 1}`,
            cover: defaultMagazines[idx].cover,
          });
        }
        setMagazines(mapped.slice(0, 6));
      }
    });
  }, []);

  // Infinite Automatic Animation Cycle in Fixed Area:
  // CLOSED -> OPENING -> OPEN (Display 2s) -> FLIPPING (Page turn 0.85s) -> OPEN -> ... -> CLOSING -> CLOSED
  useEffect(() => {
    if (magazines.length === 0) return;

    let timer: NodeJS.Timeout;

    if (bookState === "CLOSED") {
      timer = setTimeout(() => {
        setBookState("OPENING");
      }, 2000);
    } else if (bookState === "OPENING") {
      timer = setTimeout(() => {
        setBookState("OPEN");
      }, 750);
    } else if (bookState === "OPEN") {
      timer = setTimeout(() => {
        if (magIndex === magazines.length - 1) {
          setBookState("CLOSING");
        } else {
          setBookState("FLIPPING");
        }
      }, 2000);
    } else if (bookState === "FLIPPING") {
      timer = setTimeout(() => {
        setMagIndex((prev) => (prev + 1) % magazines.length);
        setBookState("OPEN");
      }, 850);
    } else if (bookState === "CLOSING") {
      timer = setTimeout(() => {
        setMagIndex(0);
        setBookState("CLOSED");
      }, 750);
    }

    return () => clearTimeout(timer);
  }, [bookState, magIndex, magazines]);

  function handleBookClick() {
    if (bookState === "CLOSED") {
      setBookState("OPENING");
    } else if (bookState === "OPEN") {
      if (magIndex === magazines.length - 1) {
        setBookState("CLOSING");
      } else {
        setBookState("FLIPPING");
      }
    }
  }

  const currentMag = magazines[magIndex] || defaultMagazines[0];
  const nextMag = magazines[(magIndex + 1) % magazines.length] || defaultMagazines[1];
  const isOpen = bookState !== "CLOSED";

  return (
    <div
      className="success-world-3d-magazine-showcase"
      style={{
        width: "250px",
        height: "210px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        userSelect: "none",
        overflow: "hidden", // Keep strictly within assigned area
      }}
    >
      {/* 3D HARDCOVER PHYSICAL MAGAZINE STAGE (FIXED AREA) */}
      <div
        style={{
          position: "relative",
          width: "240px",
          height: "180px",
          perspective: "1200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* SOFT AMBIENT DROP SHADOW BENEATH PHYSICAL BOOK */}
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            width: "220px",
            height: "16px",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
            borderRadius: "50%",
            zIndex: 1,
            pointerEvents: "none",
            transition: "transform 0.4s ease",
            transform: bookState === "FLIPPING" ? "scale(1.05) translateY(2px)" : "scale(1)",
          }}
        />

        {/* PHYSICAL 3D BOOK WRAPPER (FIXED AREA SIZE) */}
        <div
          onClick={handleBookClick}
          style={{
            position: "relative",
            width: isOpen ? "230px" : "125px",
            height: "170px",
            transformStyle: "preserve-3d",
            transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: "pointer",
            zIndex: 2,
          }}
          title="Success World Magazine 3D Flipbook"
        >
          {/* HARDCOVER EMBOSSED BURGUNDY & GOLD SPINE */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: isOpen ? "50%" : 0,
              width: "10px",
              marginLeft: isOpen ? "-5px" : "0",
              background: "linear-gradient(90deg, #50071C 0%, #8B1029 35%, #B69A5A 50%, #8B1029 65%, #50071C 100%)",
              boxShadow: "0 0 8px rgba(0,0,0,0.6)",
              zIndex: 40,
              borderRadius: "2px",
              transition: "left 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* 1. CLOSED BOOK (Fits inside fixed area) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "4px 8px 8px 4px",
              overflow: "hidden",
              background: "#0A0D16",
              boxShadow: "-6px 0 12px rgba(0,0,0,0.5), 8px 10px 25px rgba(0,0,0,0.6)",
              borderLeft: "5px solid #8B1029",
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              transition: "transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
              transform: isOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
              opacity: isOpen && bookState !== "OPENING" && bookState !== "CLOSING" ? 0 : 1,
              zIndex: 30,
            }}
          >
            {/* Stacked Paper Edges */}
            <div
              style={{
                position: "absolute",
                right: "-4px",
                top: "3px",
                bottom: "3px",
                width: "6px",
                background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3)",
              }}
            />

            {/* Actual Success World Magazine Cover Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentMag.cover}
              alt="Success World Magazine Front Cover"
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
                padding: "8px 6px 14px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Success World Logo"
                style={{ height: "20px", width: "auto", marginBottom: "2px", borderRadius: "50%" }}
              />
              <div className="font-serif" style={{ fontSize: "11px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.5px" }}>
                SUCCESS WORLD
              </div>
            </div>
          </div>

          {/* 2. OPEN BOOK 2-PAGE SPREAD (Fits inside fixed area) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.7)",
              borderRadius: "4px",
              transformStyle: "preserve-3d",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* LEFT PAGE SPREAD (Base Current Magazine Cover) */}
            <div
              style={{
                position: "relative",
                background: "#0A0D16",
                borderRadius: "4px 0 0 4px",
                overflow: "hidden",
                borderRight: "1px solid rgba(0,0,0,0.6)",
                boxShadow: "inset -10px 0 20px rgba(0,0,0,0.55)",
              }}
            >
              {/* Left Stacked Paper Edges */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "2px",
                  bottom: "2px",
                  width: "3px",
                  background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentMag.cover}
                alt={`Success World Magazine ${magIndex + 1} Page`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* RIGHT PAGE SPREAD (Next Magazine Cover) */}
            <div
              style={{
                position: "relative",
                background: "#0A0D16",
                borderRadius: "0 4px 4px 0",
                overflow: "hidden",
                borderLeft: "1px solid rgba(0,0,0,0.6)",
                boxShadow: "inset 10px 0 20px rgba(0,0,0,0.55)",
              }}
            >
              {/* Right Stacked Paper Edges */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "2px",
                  bottom: "2px",
                  width: "3px",
                  background: "repeating-linear-gradient(0deg, #F4F1EA 0px, #E5E2D9 2px, #FFFFFF 4px)",
                }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nextMag.cover}
                alt={`Success World Magazine Next Page`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* 3D REALISTIC PAGE FLIP LEAF (Animates 0deg -> -180deg) */}
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
                transform: bookState === "FLIPPING" ? "rotateY(-180deg)" : "rotateY(0deg)",
                zIndex: 25,
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
                  borderRadius: "0 4px 4px 0",
                  overflow: "hidden",
                  boxShadow: "inset 8px 0 16px rgba(0,0,0,0.4), 8px 0 20px rgba(0,0,0,0.5)",
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
                    background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
                    opacity: bookState === "FLIPPING" ? 0.7 : 0,
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
                  borderRadius: "4px 0 0 4px",
                  overflow: "hidden",
                  boxShadow: "inset -8px 0 16px rgba(0,0,0,0.4)",
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
        </div>
      </div>
    </div>
  );
}
