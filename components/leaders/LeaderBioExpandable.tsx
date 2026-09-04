"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";

interface Props {
  bio: string;
}

export function LeaderBioExpandable({ bio }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!bio) return null;

  // Split long bio into paragraphs if double newlines exist or treat as block
  const paragraphs = bio.split("\n\n").filter(Boolean);

  return (
    <div
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "20px 24px",
        borderLeft: "4px solid #C5A059",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", color: "#C5A059" }}>
        <Quote size={18} />
        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          Executive Biography &amp; Profile Summary
        </span>
      </div>

      <div
        style={{
          position: "relative",
          maxHeight: isExpanded ? "none" : "120px",
          overflow: isExpanded ? "visible" : "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {paragraphs.length > 1 ? (
          paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: "15px", color: "#334155", lineHeight: 1.7, margin: "0 0 12px" }}>
              {p}
            </p>
          ))
        ) : (
          <p style={{ fontSize: "15px", color: "#334155", lineHeight: 1.7, margin: 0 }}>
            {bio}
          </p>
        )}

        {/* Gradient Fade overlay when collapsed */}
        {!isExpanded && bio.length > 250 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,0.95) 100%)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {bio.length > 250 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: "12px",
            background: "transparent",
            border: "1px solid #C5A059",
            borderRadius: "20px",
            color: "#0A192F",
            padding: "6px 16px",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isExpanded ? "Show Less" : "Read Full Profile"}</span>
          {isExpanded ? <ChevronUp size={14} style={{ color: "#C5A059" }} /> : <ChevronDown size={14} style={{ color: "#C5A059" }} />}
        </button>
      )}
    </div>
  );
}
