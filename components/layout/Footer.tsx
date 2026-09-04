"use client";

import { useState } from "react";
import Link from "next/link";
import { SuccessWorldMagazineBook } from "@/components/layout/SuccessWorldMagazineBook";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mail,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-dark" aria-label="Global Executive Footer">
      <div className="footer-container site-shell" style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "0 6vw" }}>
        
        {/* 1. TOP EXECUTIVE NEWSLETTER BRIEFING BANNER */}
        <div className="footer-newsletter-banner">
          <div className="footer-newsletter-info">
            <div className="footer-newsletter-eyebrow">
              <Sparkles size={13} />
              EXECUTIVE INTELLIGENCE BRIEFING
            </div>
            <h3 className="font-serif footer-newsletter-title">
              Stay Ahead of Global Markets &amp; Visionary Insights
            </h3>
            <p className="footer-newsletter-desc">
              Join 25,000+ C-suite executives, global leaders, and investors receiving our weekly digital edition.
            </p>
          </div>

          {subscribed ? (
            <div style={{ padding: "12px 20px", background: "rgba(34, 197, 94, 0.12)", border: "1px solid rgba(34, 197, 94, 0.3)", borderRadius: "8px", color: "#15803D", fontWeight: 700, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} />
              <span>Subscribed! Check your inbox for your executive briefing.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your executive email..."
                className="footer-newsletter-input"
              />
              <button type="submit" className="footer-newsletter-btn">
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* 2. 5-COLUMN MAIN FOOTER CONTENT GRID */}
        <div className="footer-top-grid">
          {/* Column 1: Brand Info, Tagline & Socials */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "12px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-dark-text.png"
                alt="The Success World Executive Magazine Logo"
                style={{ height: "38px", maxWidth: "220px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <div className="footer-tagline">INSPIRED. INFORMED. EMPOWERED.</div>
            <p className="footer-desc">
              The Success World is a premier international publication delivering executive briefings, technological breakthroughs, and economic insights for operators and global business leaders.
            </p>

            {/* Social Media Icons Row */}
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" title="X / Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="/newsletter" aria-label="Newsletter RSS" title="Newsletter">
                <Mail size={15} />
              </a>
            </div>

            {/* Live Newsroom Active Status Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "18px", fontSize: "11px", fontWeight: 800, color: "#101722", letterSpacing: "0.5px" }}>
              <span className="live-dot" />
              <span>GLOBAL NEWSROOM ACTIVE &bull; 24/7 DESK</span>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul>
              <li><Link href="/">Home Page</Link></li>
              <li><Link href="/magazines">Digital Magazines</Link></li>
              <li><Link href="/blogs">Articles &amp; Briefings</Link></li>
              <li><Link href="/industries">Industries Directory</Link></li>
              <li><Link href="/leaders">Executive Leaders</Link></li>
              <li><Link href="/startups">Startups Watch</Link></li>
            </ul>
          </div>

          {/* Column 3: COMPANY & NEWSROOM */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Newsroom</Link></li>
              <li><Link href="/advertise">Advertise With Us</Link></li>
              <li><Link href="/media-kit">Media Kit 2026</Link></li>
              <li><Link href="/subscribe">Subscriptions</Link></li>
              <li><Link href="/contact">Editorial Ethics</Link></li>
            </ul>
          </div>

          {/* Column 4: KEY SECTOR BRIEFS */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">SECTOR BRIEFS</h4>
            <ul>
              <li><Link href="/industries/tech-ai">Tech &amp; AI Revolution</Link></li>
              <li><Link href="/industries/healthcare">Healthcare &amp; Biotech</Link></li>
              <li><Link href="/industries/finance">Finance &amp; Fintech</Link></li>
              <li><Link href="/industries/real-estate">Real Estate &amp; PropTech</Link></li>
              <li><Link href="/industries/energy">Energy &amp; Climate Action</Link></li>
              <li><Link href="/industries/transportation">EV &amp; Transportation</Link></li>
            </ul>
          </div>

          {/* Column 5: 3D MAGAZINE SHOWCASE */}
          <div className="footer-links-col" style={{ width: "100%", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h4 className="footer-col-title font-serif" style={{ margin: 0 }}>
                3D SHOWCASE
              </h4>
              <span style={{ fontSize: "9px", fontWeight: 800, background: "#0A192F", color: "#FFFFFF", padding: "2px 6px", borderRadius: "4px", letterSpacing: "1px" }}>
                2026 EDITION
              </span>
            </div>

            {/* 3D Flipbook Magazine Component */}
            <SuccessWorldMagazineBook />

            <Link href="/magazines" className="footer-3d-btn">
              <span>Explore Digital Library</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* 3. FOOTER BOTTOM BAR */}
        <div className="footer-bottom-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <p style={{ margin: 0 }}>&copy; {currentYear} The Success World Magazine. All rights reserved.</p>
            <span style={{ color: "#DDD5CC" }}>|</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 700, color: "#101722" }}>
              <ShieldCheck size={13} style={{ color: "#059669" }} />
              ISSN 2839-1029 Global Edition
            </span>
          </div>

          <div className="footer-legal-links">
            <Link href="/about">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/about">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/contact">Editorial Code of Ethics</Link>

            <button type="button" onClick={scrollToTop} className="footer-back-to-top" aria-label="Back to top">
              <span>Back to Top</span>
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
