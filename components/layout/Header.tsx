"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X, ArrowUpRight, Sparkles, Clock, Award } from "lucide-react";
import { useState, useRef, useEffect, useMemo, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
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
          <mark key={i} style={{ background: "#102A43", color: "#FFFFFF", padding: "0 3px", borderRadius: "3px", fontWeight: 800 }}>
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
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(96);
  // Portals need `document`, which doesn't exist during SSR — render the
  // portal only once mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Track the real rendered header height so the mobile menu panel can sit
  // flush beneath it at any breakpoint, without hardcoding per-breakpoint
  // pixel values that can drift out of sync with the CSS.
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;
    const update = () => setHeaderHeight(headerRef.current?.offsetHeight || 96);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Safety: never leave the page scroll-locked if the header unmounts while a
  // drawer or the search overlay is still open (e.g. a route change).
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, []);

  // Toggling the menu only ever changes `overflow` — never scroll position —
  // so the page stays exactly where the user was when they tapped the icon.
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
    if (!searchOpen || allArticles.length > 0) return;
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setAllArticles(items);
      }
    });
  }, [searchOpen, allArticles.length]);

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
    const handleWindowClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleWindowClick);
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
    <header ref={headerRef} className="header tsw-in-header" suppressHydrationWarning style={{ background: "#102A43", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
      {/* Main Navigation Bar */}
      <nav className="mainnav" aria-label="Main Navigation">
        {/* Brand Logo & Title Stacked (Executive Logo) */}
        <Link href="/" className="nav-logo" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0, padding: "3px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand-wordmark.svg"
            alt="The Success World"
            style={{ width: "clamp(210px, 22vw, 290px)", height: "auto", objectFit: "contain", flexShrink: 0 }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navlinks">
          {nav.map((item) => {
            const isDirectMatch = pathname === item.href || (item.href !== "/" && item.href !== "#" && pathname.startsWith(item.href));
            const isSubItemMatch = Boolean(
              item.subItems?.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"))
            );
            const isActive = isDirectMatch || isSubItemMatch;
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
                    />
                  )}
                  {isActive && (
                    <div style={{ position: "absolute", bottom: "0", left: 0, right: 0, height: "3px", background: "#6F8498", borderRadius: "2px", boxShadow: "0 0 8px rgba(111, 132, 152, 0.45)" }} />
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
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={`dropdown-item ${isSubActive ? "active" : ""}`}
                              onClick={() => setActiveDropdown(null)}
                              style={isSubActive ? { borderColor: "var(--nav-gold-dim)", background: "var(--nav-gold-bg-hover)" } : undefined}
                            >
                              <div className="dropdown-item-header">
                                <span className="dropdown-item-title" style={isSubActive ? { color: "#AFC0CB" } : undefined}>
                                  {sub.label}
                                </span>
                                <ArrowUpRight size={13} className="dropdown-icon" />
                              </div>
                              {sub.desc && <p className="dropdown-item-desc">{sub.desc}</p>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Search Trigger Icon-Only Button */}
          <button
            type="button"
            className="search-btn"
            aria-label="Open search dialog"
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 10px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "6px",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <Search size={18} />
          </button>

          {/* Nominate Now Button */}
          <button
            type="button"
            onClick={() => setNominateOpen(true)}
            className="btn btn-nominate"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Award size={14} />
            <span>Nominate Now</span>
          </button>

          {/* Subscribe Button */}
          <Link
            href="/subscribe"
            className="btn btn-subscribe"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <span>Subscribe</span>
          </Link>

          {/* Mobile Hamburger Trigger — stays put in the fixed navbar, icon morphs ☰ ↔ ✕ */}
          <button
            type="button"
            className="mobile-trigger"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => toggleMenu(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* 3. Instant Live Search Overlay Dialog */}
      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px", maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
            <form onSubmit={handleSearchSubmit} className="search-modal-header">
              <div className="search-input-wrap">
                <Search size={20} className="search-modal-icon" style={{ color: "#AFC0CB" }} />
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
                    <button type="button" onClick={handleSearchSubmit} style={{ color: "#AFC0CB", fontWeight: 700, fontSize: "11px", background: "none", border: "none", cursor: "pointer" }}>
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
                            <div style={{ fontSize: "10px", fontWeight: 800, color: "#AFC0CB", textTransform: "uppercase" }}>
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

      {/* 4. Mobile Navigation — opens as a dropdown panel directly beneath the
          fixed navbar, at whatever scroll position the user is already at.
          Never touches window.scrollTo / scroll position.
          Rendered through a portal straight into <body>: position:fixed only
          tracks the true viewport when nothing between it and <body> sets a
          transform/filter/perspective. Keeping it inside <header> risked
          exactly that (the header used backdrop-filter), which is what made
          the menu appear to "jump" — it was fixed to the header box, not the
          viewport. Portaling removes that ancestor chain entirely. */}
      {mounted && menuOpen && createPortal(
        <>
          <div className="mobile-menu-backdrop" style={{ top: headerHeight }} onClick={() => toggleMenu(false)} />
          <div className="mobile-menu-panel" style={{ top: headerHeight, maxHeight: `calc(100dvh - ${headerHeight}px)` }}>
            <div className="mobile-menu-list">
              {nav.map((item) => {
                const isDirectMatch = pathname === item.href || (item.href !== "/" && item.href !== "#" && pathname.startsWith(item.href));
                const isSubItemMatch = Boolean(item.subItems?.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")));
                const isActive = isDirectMatch || isSubItemMatch;

                if (item.dropdown && item.subItems) {
                  return (
                    <div key={item.label} className="mobile-menu-group">
                      <span className="mobile-menu-group-label">{item.label}</span>
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
                        return (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={`mobile-menu-link ${isSubActive ? "active" : ""}`}
                            onClick={() => toggleMenu(false)}
                          >
                            <span>{sub.label}</span>
                            <ArrowUpRight size={15} />
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`mobile-menu-link ${isActive ? "active" : ""}`}
                    onClick={() => toggleMenu(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                );
              })}
            </div>

            <div className="mobile-menu-footer">
              <Link href="/subscribe" className="btn btn-subscribe w-full text-center" onClick={() => toggleMenu(false)}>
                <Sparkles size={16} /> Subscribe to Magazine
              </Link>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* 5. Executive Nominate Modal Dialog */}
      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </header>
  );
}
