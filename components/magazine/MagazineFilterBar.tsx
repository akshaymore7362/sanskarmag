"use client";

import { LayoutGrid, ChevronDown, Search } from "lucide-react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function MagazineFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "24px 6vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* LEFT: All Editions Dropdown Pill */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "#FFFFFF",
            border: "1px solid #E5E2D9",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#17151C",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
          }}
        >
          <LayoutGrid size={15} style={{ color: "#D49A24" }} />
          <span>All Editions</span>
          <ChevronDown size={14} style={{ color: "#77727D" }} />
        </button>
      </div>

      {/* CENTER: Category Filter Pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: "7px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                border: isActive ? "1px solid #17151C" : "1px solid #E5E2D9",
                background: isActive ? "#17151C" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#55505C",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* RIGHT: Search Input Field */}
      <div
        style={{
          position: "relative",
          width: "280px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or keyword..."
          style={{
            width: "100%",
            padding: "8px 36px 8px 14px",
            background: "#FFFFFF",
            border: "1px solid #E5E2D9",
            borderRadius: "8px",
            fontSize: "13px",
            outline: "none",
            color: "#17151C",
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
          }}
        />
        <Search size={15} style={{ position: "absolute", right: "12px", color: "#94A3B8", pointerEvents: "none" }} />
      </div>
    </div>
  );
}
