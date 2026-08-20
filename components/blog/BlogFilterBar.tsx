"use client";

import { Search } from "lucide-react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function BlogFilterBar({
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
        padding: "16px 6vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {/* Category Pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
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
                border: isActive ? "1px solid #50071C" : "1px solid #E5E2D9",
                background: isActive ? "#50071C" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#4A454E",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right Search Input Field */}
      <div style={{ position: "relative", width: "260px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles..."
          style={{
            width: "100%",
            padding: "8px 36px 8px 12px",
            background: "#FFFFFF",
            border: "1px solid #E5E2D9",
            borderRadius: "6px",
            fontSize: "12px",
            outline: "none",
            color: "#17151C",
          }}
        />
        <Search size={15} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
      </div>
    </div>
  );
}
