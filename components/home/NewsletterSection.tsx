"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "24px auto", padding: "0 20px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0A0D16 0%, #161C2E 100%)",
          color: "#FFFFFF",
          padding: "36px 24px",
          borderRadius: "20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(139, 16, 41, 0.35)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Background Decorative Radial Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 2px 2px, #8B1029 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "2.5px", color: "#8B1029", textTransform: "uppercase", marginBottom: "8px", display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(139, 16, 41, 0.12)", padding: "4px 12px", borderRadius: "20px" }}>
            <Mail size={14} style={{ color: "#8B1029" }} />
            <span>EXECUTIVE BRIEFING NEWSLETTER</span>
          </div>

          <h2 className="font-serif" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 900, lineHeight: 1.25, color: "#FFFFFF", margin: "0 0 10px" }}>
            Market Intelligence Delivered Directly To Your Inbox
          </h2>

          <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.55, margin: "0 0 24px" }}>
            Join 450,000+ corporate leaders, investors, and decision-makers getting weekly strategic briefings and executive interviews.
          </p>

          {submitted ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.4)", color: "#22c55e", padding: "12px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "13px" }}>
              <CheckCircle2 size={18} />
              <span>Thank you! You are now subscribed to The Success World weekly briefing.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              style={{
                display: "flex",
                gap: "10px",
                maxWidth: "520px",
                margin: "0 auto",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your corporate email address..."
                style={{
                  flex: "1 1 240px",
                  padding: "12px 18px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#8B1029",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 14px rgba(139, 16, 41, 0.35)",
                }}
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <ShieldCheck size={12} style={{ color: "#8B1029" }} />
            <span>No spam. Unsubscribe at any time with one click.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
