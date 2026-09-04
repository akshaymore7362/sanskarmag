"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Mail } from "lucide-react";

const trendingIndustryArticles = [
  {
    slug: "rise-generative-ai-business-operations",
    title: "The Rise of Generative AI in Business Operations",
    category: "Tech / AI",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    slug: "sustainable-energy-global-transition",
    title: "Sustainable Energy: The Global Transition",
    category: "Energy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80",
  },
  {
    slug: "future-smart-manufacturing",
    title: "Future of Smart Manufacturing",
    category: "Manufacturing",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    slug: "digital-healthcare-new-era",
    title: "Digital Healthcare: A New Era",
    category: "Healthcare",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
];

export function IndustrySidebar() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. TRENDING INDUSTRY STORY (4 Small Ranked Articles) */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, fontSize: "14px", color: "#0A192F", marginBottom: "12px", paddingBottom: "10px", borderBottom: "1px solid #E5E7EB" }}>
          <Flame size={15} style={{ color: "#E11D48" }} />
          <span>Trending Industry Story</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {trendingIndustryArticles.map((item, idx) => (
            <div key={item.slug || String(idx)} style={{ display: "grid", gridTemplateColumns: "18px 56px 1fr", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#0A192F", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(80, 7, 28, 0.08)", display: "grid", placeItems: "center" }}>
                {idx + 1}
              </span>

              <div style={{ position: "relative", width: "56px", height: "42px", borderRadius: "5px", overflow: "hidden", background: "#050C18", flexShrink: 0 }}>
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              </div>

              <div>
                <h4 className="font-serif" style={{ fontSize: "12px", fontWeight: 700, color: "#0A192F", margin: "0 0 2px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  <Link href={`/blogs/${item.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>
                    {item.title}
                  </Link>
                </h4>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>
                  {item.category} • {item.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WEEKLY BRIEFING (Burgundy Newsletter Box) */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A192F 0%, #050C18 100%)",
          border: "1px solid rgba(212, 154, 36, 0.3)",
          borderRadius: "14px",
          padding: "20px",
          color: "#FFFFFF",
          boxShadow: "0 8px 20px rgba(80, 7, 28, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1.5px", color: "#C5A059", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
          WEEKLY BRIEFING
        </span>

        <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 900, color: "#FFFFFF", margin: "0 0 6px", lineHeight: 1.25 }}>
          Stories Worth Your Time, Every Week.
        </h3>

        <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.45, marginBottom: "14px" }}>
          Get industry intelligence, expert analysis, and market insights delivered to your inbox.
        </p>

        {subscribed ? (
          <div style={{ padding: "8px 12px", background: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.4)", borderRadius: "6px", color: "#4ADE80", fontSize: "11px", fontWeight: 700 }}>
            ✓ Thank you for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: "100%",
                padding: "8px 10px",
                background: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontSize: "11px",
                color: "#0A192F",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="btn btn-gold-gradient"
              style={{ padding: "8px 14px", fontSize: "12px", fontWeight: 800, borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Subscribe Now
            </button>
          </form>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "rgba(255, 255, 255, 0.5)", marginTop: "6px" }}>
          <span>No spam. Unsubscribe at any time.</span>
          <Mail size={13} style={{ color: "#C5A059", opacity: 0.6 }} />
        </div>
      </div>
    </aside>
  );
}
