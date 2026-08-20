"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Smartphone, Briefcase, UserCheck, TrendingUp, Stethoscope, Scale, Sparkles, Mail } from "lucide-react";
import type { Article } from "@/types";

interface Props {
  trendingArticles: Article[];
}

export function BlogSidebar({ trendingArticles }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const trendingList = trendingArticles.slice(0, 5);

  const categoriesWithCounts = [
    { name: "Technology", count: "120 Articles", icon: Smartphone },
    { name: "Business", count: "98 Articles", icon: Briefcase },
    { name: "Leadership", count: "78 Articles", icon: UserCheck },
    { name: "Economy", count: "64 Articles", icon: TrendingUp },
    { name: "Healthcare", count: "52 Articles", icon: Stethoscope },
  ];

  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. TRENDING NOW CARD */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E2D9",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "10px", borderBottom: "1px solid #EAE7DC" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, fontSize: "14px", color: "#17151C" }}>
            <Flame size={15} style={{ color: "#E11D48" }} />
            <span>Trending Now</span>
          </div>
          <Link href="/blogs" style={{ fontSize: "11px", fontWeight: 700, color: "#50071C", display: "flex", alignItems: "center", gap: "3px", textDecoration: "none" }}>
            <span>View All</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {trendingList.map((item, idx) => (
            <div key={item.slug || String(idx)} style={{ display: "grid", gridTemplateColumns: "18px 56px 1fr", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#50071C", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(80, 7, 28, 0.08)", display: "grid", placeItems: "center" }}>
                {idx + 1}
              </span>

              <div style={{ position: "relative", width: "56px", height: "42px", borderRadius: "5px", overflow: "hidden", background: "#151027", flexShrink: 0 }}>
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#50071C", color: "#FFFFFF", fontSize: "8px" }}>
                    TSW
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif" style={{ fontSize: "12px", fontWeight: 700, color: "#17151C", margin: "0 0 2px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  <Link href={`/blogs/${item.slug}`} style={{ color: "#17151C", textDecoration: "none" }}>
                    {item.title}
                  </Link>
                </h4>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>
                  {item.readTime || "5 min read"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BURGUNDY NEWSLETTER BOX */}
      <div
        style={{
          background: "linear-gradient(135deg, #50071C 0%, #2A020E 100%)",
          border: "1px solid rgba(212, 154, 36, 0.3)",
          borderRadius: "14px",
          padding: "20px",
          color: "#FFFFFF",
          boxShadow: "0 8px 20px rgba(80, 7, 28, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1.5px", color: "#D49A24", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
          STAY INSPIRED
        </span>

        <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 900, color: "#FFFFFF", margin: "0 0 6px", lineHeight: 1.25 }}>
          Stories Worth Your Time, Every Week.
        </h3>

        <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.45, marginBottom: "14px" }}>
          Join 20,000+ business leaders receiving premium editorial briefings, market insights, and exclusive stories.
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
                color: "#17151C",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="btn btn-gold-gradient"
              style={{ padding: "8px 14px", fontSize: "12px", fontWeight: 800, borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Subscribe
            </button>
          </form>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "rgba(255, 255, 255, 0.5)", marginTop: "6px" }}>
          <span>No spam. Unsubscribe at any time.</span>
          <Mail size={13} style={{ color: "#D49A24", opacity: 0.6 }} />
        </div>
      </div>

      {/* 3. POPULAR CATEGORIES CARD */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E2D9",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
        }}
      >
        <h3 className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "#17151C", margin: "0 0 12px", paddingBottom: "8px", borderBottom: "1px solid #EAE7DC" }}>
          Popular Categories
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {categoriesWithCounts.map((cat, cIdx) => {
            const IconComponent = cat.icon;
            return (
              <div key={cIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#17151C" }}>
                  <IconComponent size={14} style={{ color: "#50071C" }} />
                  <span>{cat.name}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#94A3B8" }}>{cat.count}</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #EAE7DC" }}>
          <Link href="/industries" style={{ fontSize: "11px", fontWeight: 700, color: "#50071C", display: "flex", alignItems: "center", gap: "3px", textDecoration: "none" }}>
            <span>View All Categories</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
