"use client";

import { Target, TrendingUp, Globe, Lightbulb } from "lucide-react";

export function IndustryValueStrip() {
  const valueItems = [
    { icon: Target, title: "Expert Insights", subtitle: "From industry leaders" },
    { icon: TrendingUp, title: "In-Depth Analysis", subtitle: "Data-driven perspectives" },
    { icon: Globe, title: "Global Perspective", subtitle: "Worldwide market coverage" },
    { icon: Lightbulb, title: "Actionable Intelligence", subtitle: "Strategies for growth" },
  ];

  return (
    <section
      style={{
        width: "100%",
        background: "#F9FAFB",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
        padding: "16px 6vw",
        margin: "24px 0 0",
      }}
    >
      <div
        className="grid-responsive-4"
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        {valueItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: "rgba(80, 7, 28, 0.08)",
                  display: "grid",
                  placeItems: "center",
                  color: "#0A192F",
                  flexShrink: 0,
                }}
              >
                <IconComp size={16} />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#0A192F" }}>{item.title}</div>
                <div style={{ fontSize: "10px", color: "#4B5563" }}>{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
