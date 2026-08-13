import Link from "next/link";
import { Send } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/ui/SocialIcons";

const columns = {
  Explore: [
    ["Stories", "/articles"],
    ["Magazine", "/magazine"],
    ["Leaders", "/leaders"],
    ["Events", "/events"],
  ],
  Company: [
    ["About Us", "/about"],
    ["Advertise", "/advertise"],
    ["Contact", "/contact"],
  ],
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">M</span>
            <span>Momentum<br />Magazine</span>
          </Link>
          <p>Independent business journalism for leaders, builders and investors.</p>
        </div>
        <form className="footer-newsletter">
          <label htmlFor="footer-email">The Magazine In Your Inbox</label>
          <div>
            <input id="footer-email" placeholder="Enter your email" />
            <button type="button" aria-label="Subscribe"><Send size={15} /></button>
          </div>
        </form>
      </div>
      <div className="footer-grid">
        {Object.entries(columns).map(([title, links]) => (
          <div className="footer-col" key={title}>
            <h3>{title}</h3>
            {links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
        ))}
        <div className="footer-col footer-card">
          <h3>Work With Us</h3>
          <Link href="/contact">Share a Story</Link>
          <Link href="/advertise">Partner With Us</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>(c) 2026 Momentum Magazine. All rights reserved.</p>
        <div className="footer-socials"><Linkedin size={15} /><span>X</span><Facebook size={14} /><Instagram size={14} /><Youtube size={15} /></div>
      </div>
    </footer>
  );
}
