"use client";

import Image from "next/image";
import { Layers, Users, Globe2 } from "lucide-react";

export function IndustryHero() {
  return (
    <section
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)",
        borderBottom: "1px solid #E5E7EB",
        position: "relative",
        overflow: "hidden",
        padding: "32px 6vw 28px",
      }}
    >
      {/* Background Subtle Wave Pattern */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0 128C280 64 560 192 840 128C1120 64 1300 160 1440 128V320H0V128Z"
          fill="url(#industryWave)"
        />
        <defs>
          <linearGradient id="industryWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#0A192F" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="hero-grid-split"
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN: Eyebrow, Heading, Description & 3 Stats */}
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#C5A059",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            MARKET DIRECTORY
          </span>

          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(34px, 4.2vw, 50px)",
              fontWeight: 900,
              color: "#0A192F",
              margin: "0 0 10px",
              lineHeight: 1.1,
            }}
          >
            Explore Industries
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#4B5563",
              lineHeight: 1.5,
              maxWidth: "520px",
              marginBottom: "20px",
            }}
          >
            Sector intelligence across technology, finance, healthcare, real estate, energy, media and global markets.
          </p>

          {/* 3 Key Statistics Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(212, 154, 36, 0.25)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Layers size={18} style={{ color: "#0A192F" }} />
              <div>
                <div style={{ fontSize: "17px", fontWeight: 900, color: "#0A192F", lineHeight: 1.1 }}>12+</div>
                <div style={{ fontSize: "11px", color: "#4B5563" }}>Industries Covered</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Users size={18} style={{ color: "#0A192F" }} />
              <div>
                <div style={{ fontSize: "17px", fontWeight: 900, color: "#0A192F", lineHeight: 1.1 }}>5000+</div>
                <div style={{ fontSize: "11px", color: "#4B5563" }}>Expert Contributors</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Globe2 size={18} style={{ color: "#0A192F" }} />
              <div>
                <div style={{ fontSize: "17px", fontWeight: 900, color: "#0A192F", lineHeight: 1.1 }}>1M+</div>
                <div style={{ fontSize: "11px", color: "#4B5563" }}>Monthly Readers</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern Global City Photo with Market Graphics */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              height: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
              alt="Global Financial Skyline"
              fill
              className="object-cover"
              unoptimized
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(80, 7, 28, 0.75) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
                color: "#FFFFFF",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#C5A059", letterSpacing: "1.5px" }}>
                GLOBAL INTELLIGENCE
              </span>
              <h4 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, margin: "2px 0 0", color: "#FFFFFF" }}>
                Market Dynamics & Sector Forecasts
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
