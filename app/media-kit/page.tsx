import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Kit 2026 | The Success World",
  description:
    "Exploring the future of creativity, technology and design innovation. Where ambition meets influence — The Success World Media Kit 2026.",
};

export default function MediaKitPage() {
  return (
    <main
      style={{
        background: "var(--editorial-ivory, #F7F5EF)",
        minHeight: "calc(100dvh - 96px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Slim top bar — title + download, everything else is the document itself */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "16px clamp(16px, 2.5vw, 40px)",
          borderBottom: "1px solid var(--hairline)",
          background: "#FFFFFF",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#6F8498",
            }}
          >
            The Success World
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
            Media Kit 2026
          </h1>
        </div>
        <a href="/media-kit-2026.pdf" download className="tsw-btn tsw-btn-primary">
          <Download size={16} />
          <span>Download PDF</span>
        </a>
      </div>

      {/* The document, filling the rest of the page */}
      <div style={{ flex: 1, width: "100%" }}>
        <iframe
          src="/media-kit-2026.pdf"
          title="The Success World — Media Kit 2026"
          style={{ width: "100%", height: "100%", minHeight: "calc(100dvh - 160px)", border: "none", display: "block" }}
        />
      </div>
    </main>
  );
}
