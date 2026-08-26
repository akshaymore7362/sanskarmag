import Link from "next/link";
import { SuccessWorldMagazineBook } from "@/components/layout/SuccessWorldMagazineBook";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark" aria-label="Global Footer">
      <div className="footer-container site-shell">
        <div className="footer-top-grid">
          {/* Brand Info & Tagline Column */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none", marginBottom: "12px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="The Success World Executive Magazine Logo"
                style={{ height: "46px", width: "auto", objectFit: "contain", borderRadius: "50%" }}
              />
              <span className="logo-title font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#FFFFFF" }}>
                The <span className="logo-highlight" style={{ color: "#8B1029" }}>Success World</span>
              </span>
            </Link>
            <div className="footer-tagline">INSPIRED. INFORMED. EMPOWERED.</div>
            <p className="footer-desc">
              The Success World is a premier international publication delivering executive briefings, technological breakthroughs, and economic insights for operators and global business leaders.
            </p>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">𝕏</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            </div>
          </div>

          {/* Column 1: QUICK LINKS */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/magazines">Magazines</Link></li>
              <li><Link href="/blogs">Blogs &amp; Articles</Link></li>
              <li><Link href="/industries">Industries Directory</Link></li>
              <li><Link href="/leaders">Executive Leaders</Link></li>
              <li><Link href="/startups">Startups Watch</Link></li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Newsroom</Link></li>
              <li><Link href="/advertise">Advertise With Us</Link></li>
              <li><Link href="/media-kit">Media Kit</Link></li>
              <li><Link href="/subscribe">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Column 3: KEY INDUSTRIES */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">KEY INDUSTRIES</h4>
            <ul>
              <li><Link href="/industries/tech-ai">Tech &amp; AI</Link></li>
              <li><Link href="/industries/healthcare">Healthcare &amp; Biotech</Link></li>
              <li><Link href="/industries/finance">Finance &amp; Fintech</Link></li>
              <li><Link href="/industries/real-estate">Real Estate &amp; PropTech</Link></li>
              <li><Link href="/industries/energy">Energy &amp; Climate</Link></li>
              <li><Link href="/industries/transportation">Transportation &amp; EV</Link></li>
            </ul>
          </div>

          {/* Column 4: 3D SUCCESS WORLD MAGAZINE BOOK SHOWCASE */}
          <div className="footer-links-col" style={{ minWidth: "320px" }}>
            <h4 className="footer-col-title font-serif" style={{ color: "#8B1029", letterSpacing: "1.5px" }}>
              3D MAGAZINE SHOWCASE
            </h4>

            {/* Premium 3D Physical Hardcover Magazine Book with Realistic Page Flip */}
            <SuccessWorldMagazineBook />
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {currentYear} The Success World. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/about">Privacy Policy</Link>
            <span>•</span>
            <Link href="/about">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact">Editorial Code of Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
