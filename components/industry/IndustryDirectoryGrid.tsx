"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Scale,
  Cpu,
  Factory,
  Truck,
  Landmark,
  ChevronRight,
} from "lucide-react";

// Only industries that actually exist as an `industryCategory` document in
// Sanity are listed here — a card whose slug has no matching document 404s
// on click, so entries with no real content behind them (real estate,
// energy, education, retail, media, others) are left out rather than shown
// as dead links. "Manufacturing" is kept under its real Sanity slug
// (manufacturing-products), not the shorter one that doesn't exist there.
export const industryList = [
  {
    slug: "healthcare",
    name: "Healthcare",
    desc: "Insights on healthcare innovation and systems",
    icon: Stethoscope,
  },
  {
    slug: "legal",
    name: "Legal",
    desc: "Analysis on law, policy and regulations",
    icon: Scale,
  },
  {
    slug: "tech-ai",
    name: "Tech / AI",
    desc: "AI, software, cloud and emerging technologies",
    icon: Cpu,
  },
  {
    slug: "manufacturing-products",
    name: "Manufacturing",
    desc: "Smart manufacturing and industrial trends",
    icon: Factory,
  },
  {
    slug: "transportation",
    name: "Transportation",
    desc: "Mobility, logistics and supply chains",
    icon: Truck,
  },
  {
    slug: "finance",
    name: "Finance",
    desc: "Markets, banking and financial services",
    icon: Landmark,
  },
];

export function IndustryDirectoryGrid() {
  const [activeSlug, setActiveSlug] = useState("healthcare");

  return (
    <section style={{ width: "100%", maxWidth: "100%", margin: "28px auto 36px", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
      <div
        className="grid-responsive-4"
        style={{
          gap: "16px",
        }}
      >
        {industryList.map((item) => {
          const IconComp = item.icon;
          const isActive = activeSlug === item.slug;

          return (
            <Link
              key={item.slug}
              href={`/industries/${item.slug}`}
              onMouseEnter={() => setActiveSlug(item.slug)}
              style={{
                background: isActive ? "#102A43" : "#FFFFFF",
                border: isActive ? "1px solid #102A43" : "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 6px 18px rgba(80, 7, 28, 0.25)" : "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(30, 64, 175, 0.2)" : "rgba(80, 7, 28, 0.06)",
                  display: "grid",
                  placeItems: "center",
                  color: isActive ? "#FFFFFF" : "#102A43",
                  flexShrink: 0,
                }}
              >
                <IconComp size={18} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: isActive ? "#FFFFFF" : "#102A43",
                    margin: "0 0 2px",
                    lineHeight: 1.25,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: isActive ? "rgba(255, 255, 255, 0.75)" : "#4B5563",
                    margin: 0,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <ChevronRight
                size={15}
                style={{
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  flexShrink: 0,
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
