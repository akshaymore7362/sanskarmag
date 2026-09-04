"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Search, Sparkles, Check } from "lucide-react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  availableYears: string[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalFilteredCount: number;
}

export function MagazineFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  availableYears,
  selectedYear,
  onSelectYear,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
}: Props) {
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "24px 6vw 12px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top Filter Controls Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {/* LEFT: Year Selector Dropdown & Year Quick Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Interactive Year Selector Dropdown Pill */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsYearDropdownOpen((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: selectedYear !== "All Years" ? "#0A192F" : "#FFFFFF",
                border: selectedYear !== "All Years" ? "1px solid #0A192F" : "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 800,
                color: selectedYear !== "All Years" ? "#FFFFFF" : "#0A192F",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <Calendar size={15} style={{ color: selectedYear !== "All Years" ? "#D4B475" : "#C5A059" }} />
              <span>{selectedYear === "All Years" ? "Filter by Year" : `Year: ${selectedYear}`}</span>
              <ChevronDown size={14} style={{ color: selectedYear !== "All Years" ? "#D4B475" : "#4B5563", transform: isYearDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
            </button>

            {/* Dropdown Menu Overlay */}
            {isYearDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  width: "200px",
                  background: "#FFFFFF",
                  border: "1px solid #DDD5CC",
                  borderRadius: "10px",
                  boxShadow: "0 12px 32px rgba(10, 25, 47, 0.15)",
                  padding: "8px 6px",
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#94A3B8", padding: "4px 10px 6px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  PUBLICATION YEAR
                </div>
                {availableYears.map((yr) => {
                  const isSelected = selectedYear === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        onSelectYear(yr);
                        setIsYearDropdownOpen(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        textAlign: "left",
                        background: isSelected ? "var(--editorial-surface, #FCFAF6)" : "transparent",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? "#0A192F" : "#55545A",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <span>{yr === "All Years" ? "All Publication Years" : `${yr} Edition`}</span>
                      {isSelected && <Check size={14} style={{ color: "#0A192F" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Year Filter Pills */}
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflowX: "auto",
              maxWidth: "100%",
              paddingBottom: "2px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => onSelectYear(yr)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    border: isSelected ? "1px solid #0A192F" : "1px solid #E5E7EB",
                    background: isSelected ? "#0A192F" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Search Input Field */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "280px",
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
              padding: "8px 36px 8px 14px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              color: "#0A192F",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          />
          <Search size={15} style={{ position: "absolute", right: "12px", color: "#94A3B8", pointerEvents: "none" }} />
        </div>
      </div>

      {/* Category Pills Strip */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
          maxWidth: "100%",
          paddingBottom: "4px",
          WebkitOverflowScrolling: "touch",
          minWidth: 0,
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 800, color: "#94A3B8", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>
          SECTOR:
        </span>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                border: isActive ? "1px solid #0A192F" : "1px solid #E5E7EB",
                background: isActive ? "#0A192F" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#4B5563",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Year & Filter Status Summary Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: 700,
          color: "#0A192F",
          borderTop: "1px solid var(--editorial-border, #DDD5CC)",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={13} style={{ color: "#0A192F" }} />
          <span>
            {selectedYear === "All Years" ? "All Publication Years" : `${selectedYear} Published Editions`}{" "}
            <span style={{ color: "#55545A", fontWeight: 600 }}>({totalFilteredCount} Issues)</span>
          </span>
        </div>

        {(selectedYear !== "All Years" || activeCategory !== "All" || searchQuery.trim()) && (
          <button
            type="button"
            onClick={() => {
              onSelectYear("All Years");
              onSelectCategory("All");
              onSearchChange("");
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "11px",
              fontWeight: 800,
              color: "#0A192F",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
