"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X, ArrowUpRight, Sparkles, Clock, Award } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { MarketTicker } from "@/components/layout/MarketTicker";
import { NominateModal } from "@/components/modals/NominateModal";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

interface NavSubItem {
  label: string;
  href: string;
  desc?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: boolean;
  subItems?: NavSubItem[];
}

const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Magazines", href: "/magazines" },
  { label: "Blogs", href: "/blogs" },
  { label: "Industries", href: "/industries" },
  { label: "Leaders", href: "/leaders" },
  { label: "Startups", href: "/startups" },
  { label: "Insights", href: "/insights" },
  { label: "Events", href: "/events" },
  {
    label: "More",
    href: "#",
    dropdown: true,
    subItems: [
      { label: "Contact Us", href: "/contact", desc: "Reach our newsroom, press office & commercial desk" },
      { label: "Advertise With Us", href: "/advertise", desc: "Enterprise brand partnerships & executive campaigns" },
      { label: "Media Kit", href: "/media-kit", desc: "Audience demographic reports & media specifications" },
      { label: "About Us", href: "/about", desc: "Publication story, editorial mission & leadership board" },
    ],
  },
];

const popularSearches = ["AI Agents", "Global Economy", "Biotech Innovation", "Venture Capital", "Real Estate Trends", "Magazine Issues"];

// Helper function to highlight matching search terms in titles & text
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "#D49A24", color: "#080A10", padding: "0 3px", borderRadius: "3px", fontWeight: 800 }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [nominateOpen, setNominateOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Fetch Sanity articles for instant search
  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setAllArticles(items);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    };
  }, []);

  // Filter articles in real-time as user types
  const liveResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allArticles.filter(
      (art) =>
        art.title?.toLowerCase().includes(q) ||
        art.description?.toLowerCase().includes(q) ||
        art.category?.toLowerCase().includes(q) ||
        art.author?.toLowerCase().includes(q)
    );
  }, [allArticles, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="header" style={{ background: "#0A0D16", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
      {/* 1. Live Market Ticker */}
      <MarketTicker />

      {/* 2. Main Navigation Bar */}
      <nav className="mainnav" aria-label="Main Navigation">
        {/* Brand Logo & Slogan Stack */}
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
          <div className="logo-brand-block">
            <div className="logo-title font-serif" style={{ fontSize: "24px", fontWeight: 900, lineHeight: 1.05 }}>
              <span style={{ color: "#FFFFFF" }}>The </span>
              <span style={{ color: "#D49A24" }}>Success</span>
            </div>
            <div className="logo-title font-serif" style={{ fontSize: "24px", fontWeight: 900, color: "#D49A24", lineHeight: 1.05 }}>
              World
            </div>
            <div className="logo-slogan" style={{ fontSize: "7px", fontWeight: 800, letterSpacing: "2.2px", color: "#D49A24", marginTop: "4px" }}>
              INSPIRED. INFORMED. EMPOWERING. EXCELLENCE.
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navlinks">
          {nav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && item.href !== "#" && pathname.startsWith(item.href));
            const isDropdownOpen = activeDropdown === item.label;

            return (
              <div
                key={item.label}
                className={`nav-item-wrapper ${item.dropdown ? "has-dropdown" : ""}`}
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isActive ? "#D49A24" : "#FFFFFF",
                    position: "relative",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span className="nav-label-text">{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown
                      size={13}
                      className={`dropdown-chevron ${isDropdownOpen ? "open" : ""}`}
                      style={{ color: isActive ? "#D49A24" : "rgba(255, 255, 255, 0.6)" }}
                    />
                  )}
                  {isActive && (
                    <div style={{ position: "absolute", bottom: "0", left: 0, right: 0, height: "3px", background: "#D49A24", borderRadius: "2px", boxShadow: "0 0 8px rgba(212, 154, 36, 0.6)" }} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && item.subItems && isDropdownOpen && (
                  <div
                    className="nav-dropdown-menu"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="dropdown-grid">
                      <div className="dropdown-header-bar">
                        <span className="dropdown-header-title">{item.label.toUpperCase()} DIRECTORY</span>
                        <span className="dropdown-header-badge">{item.subItems.length} Categories</span>
                      </div>
                      <div className="dropdown-items-grid">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="dropdown-item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="dropdown-item-header">
                              <span className="dropdown-item-title">{sub.label}</span>
                              <ArrowUpRight size={13} className="dropdown-icon" />
                            </div>
                            {sub.desc && <p className="dropdown-item-desc">{sub.desc}</p>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Search Trigger Input Button */}
          <button
            type="button"
            className="search-btn"
            aria-label="Open search dialog"
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Search size={14} style={{ color: "rgba(255, 255, 255, 0.7)" }} />
            <span>Search</span>
            <kbd style={{ fontSize: "10px", padding: "2px 5px", background: "rgba(255, 255, 255, 0.12)", borderRadius: "4px", color: "#D49A24", fontWeight: 700 }}>⌘K</kbd>
          </button>

          {/* Nominate Now Button */}
          <button
            type="button"
            onClick={() => setNominateOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "rgba(212, 154, 36, 0.15)",
              border: "1px solid rgba(212, 154, 36, 0.4)",
              borderRadius: "8px",
              color: "#D49A24",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            <Award size={14} />
            <span>Nominate Now</span>
          </button>

          {/* Subscribe Button */}
          <Link href="/subscribe" className="btn btn-gold-gradient" style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 800, borderRadius: "8px" }}>
            <Sparkles size={14} />
            <span>Subscribe</span>
          </Link>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            className="mobile-trigger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => toggleMenu(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* 3. Instant Live Search Overlay Dialog */}
      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px", maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
            <form onSubmit={handleSearchSubmit} className="search-modal-header">
              <div className="search-input-wrap">
                <Search size={20} className="search-modal-icon" style={{ color: "#D49A24" }} />
                <input
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  placeholder="Type to instant search articles, insights, leaders..."
                  aria-label="Instant search site content"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="search-modal-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search modal"
              >
                <X size={18} />
              </button>
            </form>

            <div className="search-modal-body" style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
              {/* INSTANT LIVE SEARCH RESULTS WITH TEXT HIGHLIGHTING */}
              {searchQuery.trim() ? (
                <div>
                  <div className="search-modal-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>FOUND {liveResults.length} MATCHING STORIES</span>
                    <button type="button" onClick={handleSearchSubmit} style={{ color: "#D49A24", fontWeight: 700, fontSize: "11px", background: "none", border: "none", cursor: "pointer" }}>
                      View Full Results Page →
                    </button>
                  </div>

                  {liveResults.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                      {liveResults.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/blogs/${item.slug}`}
                          onClick={() => setSearchOpen(false)}
                          style={{
                            display: "flex",
                            gap: "14px",
                            padding: "12px",
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            alignItems: "center",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                          className="search-result-item"
                        >
                          {item.image && (
                            <div style={{ position: "relative", width: "70px", height: "54px", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                              <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", textTransform: "uppercase" }}>
                              {highlightMatch(item.category || "Story", searchQuery)}
                            </div>
                            <h4 className="font-serif" style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {highlightMatch(item.title, searchQuery)}
                            </h4>
                            <div style={{ fontSize: "11px", color: "#94A3B8", display: "flex", alignItems: "center", gap: "6px" }}>
                              <span>{item.author}</span>
                              <span>•</span>
                              <span><Clock size={10} /> {item.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "32px 0", color: "#94A3B8", fontSize: "14px" }}>
                      No published stories found matching "<span style={{ color: "#FFFFFF" }}>{searchQuery}</span>". Try another term.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="search-modal-label">POPULAR EXECUTIVE SEARCHES</div>
                  <div className="search-chips">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        className="search-chip"
                        onClick={() => setSearchQuery(term)}
                        style={{ cursor: "pointer" }}
                      >
                        <span>{term}</span>
                        <ArrowUpRight size={12} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Full-Screen Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => toggleMenu(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo-brand-block">
                <div className="logo-title font-serif">
                  The <span className="logo-highlight">Success World</span>
                </div>
                <div className="logo-slogan">INSPIRED. INFORMED. EMPOWERING. EXCELLENCE.</div>
              </div>

              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => toggleMenu(false)}
                aria-label="Close mobile navigation"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              <div className="mobile-nav-list">
                {nav.map((item) => (
                  <div key={item.label} className="mobile-nav-item">
                    <Link
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={() => toggleMenu(false)}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={16} />
                    </Link>

                    {item.subItems && (
                      <div className="mobile-subnav-list">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="mobile-subnav-link"
                            onClick={() => toggleMenu(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mobile-drawer-footer">
                <Link href="/subscribe" className="btn btn-gold-gradient w-full text-center" onClick={() => toggleMenu(false)}>
                  <Sparkles size={16} /> Subscribe to Magazine
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Executive Nominate Modal Dialog */}
      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </header>
  );
}
