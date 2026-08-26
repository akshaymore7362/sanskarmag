"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Globe, Award, CheckCircle, BookOpen, ShieldCheck, ExternalLink } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import { NominateModal } from "@/components/modals/NominateModal";
import type { MagazineIssue, Leader } from "@/types";

export function HeroSection() {
  const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nominateOpen, setNominateOpen] = useState(false);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((issues) => {
      if (issues && issues.length > 0) {
        // Take latest 6 magazines
        setMagazines(issues.slice(0, 6));
      }
    });

    leaderService.fetchSanityLeaders().then((itemLeaders) => {
      if (itemLeaders && itemLeaders.length > 0) {
        setLeaders(itemLeaders);
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles latest 6 magazines every 2.5s)
  useEffect(() => {
    if (magazines.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % magazines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [magazines.length]);

  const activeIssue = magazines.length > 0 ? magazines[currentIndex % magazines.length] : null;
  const activeLeader = leaders.length > 0 ? leaders[currentIndex % leaders.length] : null;

  const heroTitle = activeIssue?.title || "International Magazine Edition & Global Market Leadership 2026";
  const heroDesc = activeIssue?.description || "Exploring the visionary strategies driving global enterprise adoption and market transformation.";
  const heroCover = activeIssue?.cover || "";
  const issueTag = activeIssue?.issue || `EDITION ${currentIndex + 1}`;
  const issueDate = activeIssue?.date || "2026";

  const targetPdfUrl = activeIssue?.pdfUrl ? activeIssue.pdfUrl : `/magazines/${activeIssue?.slug || ""}`;
  const isExternalPdf = Boolean(activeIssue?.pdfUrl && (activeIssue.pdfUrl.startsWith("http://") || activeIssue.pdfUrl.startsWith("https://")));

  return (
    <section className="tsw-hero">
      <div className="tsw-hero-inner">
        {/* LEFT — editorial cover */}
        <div className="tsw-hero-cover-col">
          <div className="tsw-hero-cover-frame">
            <span className="tsw-hero-edition">
              <Star size={11} fill="currentColor" /> {issueTag}
            </span>
            {isExternalPdf ? (
              <a href={targetPdfUrl} target="_blank" rel="noopener noreferrer" className="tsw-hero-cover-link">
                {heroCover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroCover} alt={heroTitle} />
                ) : (
                  <div className="tsw-hero-cover-ph">The Success World</div>
                )}
              </a>
            ) : (
              <Link href={targetPdfUrl} className="tsw-hero-cover-link">
                {heroCover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroCover} alt={heroTitle} />
                ) : (
                  <div className="tsw-hero-cover-ph">The Success World</div>
                )}
              </Link>
            )}
          </div>

          {magazines.length > 1 && (
            <div className="tsw-hero-dots">
              {magazines.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={idx === currentIndex ? "is-active" : ""}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — editorial content */}
        <div className="tsw-hero-body">
          <div className="tsw-hero-meta">
            <span><Globe size={13} /> International Magazine Edition</span>
            <span className="tsw-hero-dot-sep">/</span>
            <span>{issueDate}</span>
          </div>

          <h1 className="tsw-hero-title font-serif">{heroTitle}</h1>

          <p className="tsw-hero-desc">{heroDesc}</p>

          <div className="tsw-hero-exec">
            <div className="tsw-hero-exec-avatar">
              {activeLeader?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={activeLeader.image} alt={activeLeader.name} />
              ) : (
                <span>{activeLeader?.name ? activeLeader.name.charAt(0) : "SW"}</span>
              )}
            </div>
            <div className="tsw-hero-exec-info">
              <span className="tsw-eyebrow-sm"><Award size={11} /> Cover Featured Executive</span>
              <strong className="font-serif">{activeLeader?.name || "Executive Profile"}</strong>
              <span className="tsw-hero-exec-role">
                {activeLeader?.role || "Executive Leader"}{activeLeader?.company ? ` · ${activeLeader.company}` : ""}
              </span>
            </div>
          </div>

          <div className="tsw-hero-topics">
            {["Enterprise AI", "Capital Markets", "Global Scale"].map((topic) => (
              <span key={topic}><CheckCircle size={12} /> {topic}</span>
            ))}
          </div>

          <div className="tsw-hero-actions">
            {isExternalPdf ? (
              <a href={targetPdfUrl} target="_blank" rel="noopener noreferrer" className="tsw-btn tsw-btn-primary">
                <BookOpen size={15} /> Read Digital Magazine <ExternalLink size={13} />
              </a>
            ) : (
              <Link href={targetPdfUrl} className="tsw-btn tsw-btn-primary">
                <BookOpen size={15} /> Read Digital Magazine
              </Link>
            )}
            <button type="button" onClick={() => setNominateOpen(true)} className="tsw-btn tsw-btn-ghost">
              <ShieldCheck size={15} /> Nominate Now
            </button>
          </div>
        </div>
      </div>

      <NominateModal isOpen={nominateOpen} onClose={() => setNominateOpen(false)} />
    </section>
  );
}
