"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/ui/SocialIcons";

const nav = [
  { label: "Stories", href: "/articles", dropdown: true },
  { label: "Magazine", href: "/magazine", dropdown: true },
  { label: "Industries", href: "/industries", dropdown: true },
  { label: "Leaders", href: "/leaders", dropdown: false },
  { label: "Startups", href: "/startups", dropdown: false },
  { label: "Insights", href: "/insights", dropdown: false },
  { label: "Events", href: "/events", dropdown: false },
  { label: "More", href: "/about", dropdown: true },
];

const utilityLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Advertise", href: "/advertise" },
  { label: "Newsletter", href: "/newsletter" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="header">
      <div className="utility">
        <p>Monday, May 20, 2026</p>
        <div>
          {utilityLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
          <Linkedin size={15} />
          <span className="social-x">X</span>
          <Facebook size={14} />
          <Instagram size={14} />
          <Youtube size={15} />
        </div>
      </div>
      <nav className="mainnav">
        <Link href="/" className="brand">
          <span className="brand-mark">M</span>
          <span>Momentum<br />Magazine</span>
        </Link>
        <div className="navlinks">
          {nav.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
              {item.dropdown && <ChevronDown size={12} />}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={20} /></button>
          <span />
          <Link href="/newsletter">Sign In</Link>
          <Link href="/newsletter" className="subscribe">Subscribe</Link>
          <button className="mobile-trigger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </nav>
      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <form className="search-modal" action="/search" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18} /></button>
            <input name="q" autoFocus placeholder="Search stories, leaders, industries..." />
          </form>
        </div>
      )}
      {menuOpen && (
        <div className="mobile-menu">
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={22} /></button>
          {nav.map((item) => <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          <Link href="/newsletter" className="subscribe">Subscribe</Link>
        </div>
      )}
    </header>
  );
}
