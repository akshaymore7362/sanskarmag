"use client";

import { Calendar, Search, Sparkles } from "lucide-react";

interface Props {
  availableYears: string[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalFilteredCount: number;
  yearCounts?: Record<string, number>;
}

export function MagazineFilterBar({
  availableYears,
  selectedYear,
  onSelectYear,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
  yearCounts = {},
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "24px clamp(16px, 2.5vw, 40px) 12px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Year Filter Buttons & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Direct Year Buttons: ALL (23), 2026 (6), 2025 (10), 2024 (7) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "4px" }}>
            <Calendar size={18} style={{ color: "#102A43" }} />
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#102A43", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Filter:
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              const label = yr === "All Years" ? "ALL" : yr;

              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => onSelectYear(yr)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    border: isSelected ? "2px solid #102A43" : "1px solid #CBD5E1",
                    background: isSelected ? "#102A43" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#334155",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 4px 12px rgba(10,25,47,0.18)" : "0 2px 4px rgba(0,0,0,0.02)",
                    flexShrink: 0,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search Input Field */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, edition or leader..."
            style={{
              width: "100%",
              padding: "10px 38px 10px 16px",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              color: "#102A43",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          />
          <Search size={16} style={{ position: "absolute", right: "14px", color: "#94A3B8", pointerEvents: "none" }} />
        </div>
      </div>

      {/* Active Filter Status Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          fontWeight: 700,
          color: "#102A43",
          borderTop: "1px solid var(--editorial-border, #DDD5CC)",
          paddingTop: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} style={{ color: "#102A43" }} />
          <span>
            {selectedYear === "All Years" ? "All Publication Years" : `${selectedYear} Published Magazines`}{" "}
            <span style={{ color: "#55545A", fontWeight: 600 }}>({totalFilteredCount} Issues)</span>
          </span>
        </div>

        {(selectedYear !== "All Years" || searchQuery.trim()) && (
          <button
            type="button"
            onClick={() => {
              onSelectYear("All Years");
              onSearchChange("");
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "12px",
              fontWeight: 800,
              color: "#102A43",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
}

