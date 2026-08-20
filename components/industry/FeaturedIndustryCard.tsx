"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedIndustryCard() {
  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto 36px", padding: "0 6vw" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "320px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(212, 154, 36, 0.3)",
          boxShadow: "0 12px 36px rgba(15, 23, 42, 0.25)",
        }}
      >
        {/* LEFT: Burgundy / Navy Panel */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #3B0716 60%, #50071C 100%)",
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#FFFFFF",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              color: "#D49A24",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            FEATURED INDUSTRY
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 2.5vw, 32px)",
              fontWeight: 900,
              color: "#FFFFFF",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            The Future of Healthcare Innovation
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              marginBottom: "24px",
              maxWidth: "480px",
            }}
          >
            How biotechnology advances, digital medtech tools, and AI diagnostics are revolutionizing global medicine and healthcare operations.
          </p>

          <div>
            <Link
              href="/industries/healthcare"
              className="btn btn-gold-gradient"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                fontSize: "13px",
                fontWeight: 800,
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <span>Explore Healthcare Industry</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* RIGHT: Large Healthcare Tech Image */}
        <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "320px", background: "#0F172A" }}>
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
            alt="Healthcare Technology & AI Diagnostics"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
