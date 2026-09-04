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
      {/* Category Pills (Scrollable on mobile) */}
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
          flex: 1,
          minWidth: 0,
        }}
      >
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

      {/* Right Search Input Field */}
      <div style={{ position: "relative", width: "100%", maxWidth: "260px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles..."
          style={{
            width: "100%",
            padding: "8px 36px 8px 12px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            fontSize: "12px",
            outline: "none",
            color: "#0A192F",
          }}
        />
        <Search size={15} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
      </div>
    </div>
  );
}
