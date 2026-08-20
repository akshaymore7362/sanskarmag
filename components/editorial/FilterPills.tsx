"use client";

import { useState } from "react";

type Props = {
  items: string[];
  activeItem?: string;
  onSelect?: (item: string) => void;
};

export function FilterPills({ items, activeItem: externalActive, onSelect }: Props) {
  const [internalActive, setInternalActive] = useState(items[0] || "");
  const active = externalActive !== undefined ? externalActive : internalActive;

  const handleClick = (item: string) => {
    setInternalActive(item);
    onSelect?.(item);
  };

  const getPillClass = (item: string, isActive: boolean) => {
    if (isActive) return "pill pill-all";
    const lower = item.toLowerCase();
    if (lower.includes("startup")) return "pill pill-startups";
    if (lower.includes("tech")) return "pill pill-tech";
    if (lower.includes("finance") || lower.includes("bank")) return "pill pill-finance";
    if (lower.includes("leader")) return "pill pill-leadership";
    if (lower.includes("strategy")) return "pill pill-strategy";
    if (lower.includes("market")) return "pill pill-marketing";
    return "pill pill-tech";
  };

  return (
    <div className="filter-pills" aria-label="Editorial filters">
      {items.map((item) => {
        const isActive = active.toLowerCase() === item.toLowerCase();
        return (
          <button
            type="button"
            key={item}
            className={getPillClass(item, isActive)}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
