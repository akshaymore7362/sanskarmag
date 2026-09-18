"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, Sparkles, TrendingUp } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function MagazineNewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [latestIssue, setLatestIssue] = useState<MagazineIssue | null>(null);

  // Show the actual latest-published magazine cover here, never a mock graphic.
  useEffect(() => {
    magazineService.fetchSanityMagazines().then((items) => {
      if (items && items.length > 0) {
        setLatestIssue(items[0]);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section style={{ width: "100%", maxWidth: "100%", margin: "0 auto 60px", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
      <div
        className="grid-sidebar-layout magazine-newsletter-card"
        style={{
          background: "linear-gradient(135deg, #0B1E30 0%, #102A43 60%, #0B1E30 100%)",
          border: "1px solid rgba(30, 64, 175, 0.35)",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 25px rgba(30, 64, 175, 0.12)",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE: 3D Angled Magazine Cover Graphic */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "300px",
              maxWidth: "100%",
              height: "410px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(30, 64, 175, 0.4)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
              transform: "rotate(-4deg)",
              background: "linear-gradient(135deg, #0B1E30 0%, #102A43 100%)",
            }}
          >
            {latestIssue?.cover && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={latestIssue.cover}
                alt={latestIssue.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Newsletter Form & 3 Feature Indicators */}
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#93A9C4",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            STAY INSPIRED
          </span>

          <h2
            className="font-serif"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px", lineHeight: 1.2 }}
          >
            Stories Worth Your Time, Every Week.
          </h2>

          <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6, maxWidth: "680px", marginBottom: "24px" }}>
            Join 20,000+ subscribers and get the best business stories, leaders' insights &amp; exclusive editions delivered to your inbox.
          </p>

          {/* Email Subscription Form */}
          {subscribed ? (
            <div style={{ padding: "14px 20px", background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)", borderRadius: "10px", color: "#4ADE80", fontWeight: 700, fontSize: "14px", marginBottom: "24px" }}>
              ✓ Thank you for subscribing! Check your inbox for your first executive edition.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="magazine-newsletter-form" style={{ display: "flex", gap: "12px", maxWidth: "600px", marginBottom: "28px" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#FFFFFF",
                  outline: "none",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                className="btn btn-blue-gradient"
                style={{ padding: "12px 28px", fontSize: "14px", fontWeight: 800, borderRadius: "8px", flexShrink: 0 }}
              >
                Subscribe
              </button>
            </form>
          )}

          {/* 3 Feature Indicators Row (Matching reference image) */}
          <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={16} style={{ color: "#93A9C4" }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#FFFFFF" }}>Exclusive Editions</div>
                <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.6)" }}>Straight to you</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} style={{ color: "#93A9C4" }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#FFFFFF" }}>Inspiring Leaders</div>
                <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.6)" }}>Real stories, real impact</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={16} style={{ color: "#93A9C4" }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#FFFFFF" }}>Business Insights</div>
                <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.6)" }}>That drive growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
