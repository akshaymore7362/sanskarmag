"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { MagazineCover } from "@/components/editorial/MagazineCover";
import { magazineService } from "@/services/magazineService";

export function FooterMagazineRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const issues = magazineService.all();

  const scroll = (direction: "prev" | "next") => {
    railRef.current?.scrollBy({
      left: direction === "next" ? 260 : -260,
      behavior: "smooth",
    });
  };

  return (
    <section className="footer-magazine-rail" aria-label="Magazine issues">
      <div className="footer-rail-heading">
        <div>
          <p className="gold-label">Magazine Archive</p>
          <h2>Read The Latest Issues</h2>
        </div>
        <div>
          <button type="button" aria-label="Previous issue" onClick={() => scroll("prev")}><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next issue" onClick={() => scroll("next")}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="footer-issue-strip" ref={railRef}>
        {issues.slice(0, 6).map((issue, index) => (
          <Link href={`/magazine/${issue.slug}`} key={issue.slug} className={index === 0 ? "footer-issue-card current" : "footer-issue-card"}>
            <MagazineCover issue={issue} compact decorative />
            <span>{issue.date}</span>
            <strong>{issue.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
