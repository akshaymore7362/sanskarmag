"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Search, Sparkles, Check, ArrowUpDown, Layers } from "lucide-react";

export type MagazineSortOption = "sequence" | "year-desc" | "year-asc";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  availableYears: string[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
  sortBy: MagazineSortOption;
  onSortChange: (sort: MagazineSortOption) => void;
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
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
}: Props) {
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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
        {/* LEFT: Year Selector & Sequence / Year Sort Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Year Filter Dropdown Button */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setIsYearDropdownOpen((prev) => !prev);
                setIsSortDropdownOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: selectedYear !== "All Years" ? "#0A192F" : "#FFFFFF",
                border: selectedYear !== "All Years" ? "1px solid #0A192F" : "1px solid #CBD5E1",
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

            {/* Year Dropdown Menu Overlay */}
            {isYearDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  width: "210px",
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
                      <span>{yr === "All Years" ? "All Publication Years" : `${yr} Editions`}</span>
                      {isSelected && <Check size={14} style={{ color: "#0A192F" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Year Filter Pills (2026, 2025, 2024) */}
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
                    padding: "7px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    border: isSelected ? "1.5px solid #0A192F" : "1px solid #CBD5E1",
                    background: isSelected ? "#0A192F" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#334155",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 2px 8px rgba(10,25,47,0.15)" : "none",
                    flexShrink: 0,
                  }}
                >
                  {yr === "All Years" ? "All Years" : `'${yr.slice(2)} (${yr})`}
                </button>
              );
            })}
          </div>

          {/* Sequence & Year Order Control Pill */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setIsSortDropdownOpen((prev) => !prev);
                setIsYearDropdownOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                background: "#F8FAFC",
                border: "1px solid #CBD5E1",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
                color: "#0A192F",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowUpDown size={14} style={{ color: "#C5A059" }} />
              <span>
                {sortBy === "sequence"
                  ? "Sort: Sequence-Wise (Ed. 01, 02...)"
                  : sortBy === "year-desc"
                  ? "Sort: Year-Wise (2026 → 2024)"
                  : "Sort: Year-Wise (2024 → 2026)"}
              </span>
              <ChevronDown size={13} style={{ transform: isSortDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
            </button>

            {/* Sort Menu Overlay */}
            {isSortDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  width: "240px",
                  background: "#FFFFFF",
                  border: "1px solid #DDD5CC",
                  borderRadius: "10px",
                  boxShadow: "0 12px 32px rgba(10, 25, 47, 0.15)",
                  padding: "8px 6px",
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#94A3B8", padding: "4px 10px 6px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  SORTING SEQUENCE
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSortChange("sequence");
                    setIsSortDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    textAlign: "left",
                    background: sortBy === "sequence" ? "var(--editorial-surface, #FCFAF6)" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: sortBy === "sequence" ? 800 : 600,
                    color: sortBy === "sequence" ? "#0A192F" : "#55545A",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Sequence-Wise (Edition 01, 02...)</span>
                  {sortBy === "sequence" && <Check size={14} style={{ color: "#0A192F" }} />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSortChange("year-desc");
                    setIsSortDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    textAlign: "left",
                    background: sortBy === "year-desc" ? "var(--editorial-surface, #FCFAF6)" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: sortBy === "year-desc" ? 800 : 600,
                    color: sortBy === "year-desc" ? "#0A192F" : "#55545A",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Year-Wise (Newest 2026 → 2024)</span>
                  {sortBy === "year-desc" && <Check size={14} style={{ color: "#0A192F" }} />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSortChange("year-asc");
                    setIsSortDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    textAlign: "left",
                    background: sortBy === "year-asc" ? "var(--editorial-surface, #FCFAF6)" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: sortBy === "year-asc" ? 800 : 600,
                    color: sortBy === "year-asc" ? "#0A192F" : "#55545A",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Year-Wise (Oldest 2024 → 2026)</span>
                  {sortBy === "year-asc" && <Check size={14} style={{ color: "#0A192F" }} />}
                </button>
              </div>
            )}
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
              border: "1px solid #CBD5E1",
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

        {(selectedYear !== "All Years" || activeCategory !== "All" || searchQuery.trim() || sortBy !== "sequence") && (
          <button
            type="button"
            onClick={() => {
              onSelectYear("All Years");
              onSelectCategory("All");
              onSearchChange("");
              onSortChange("sequence");
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
