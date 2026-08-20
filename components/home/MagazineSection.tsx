"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function MagazineSection() {
  const [issues, setIssues] = useState<MagazineIssue[]>([]);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) {
        setIssues(data.slice(0, 4));
      } else {
        setIssues(magazineService.all().slice(0, 4));
      }
    });
  }, []);

  if (issues.length === 0) return null;

  return (
    <section className="section magazine-archive-section" aria-label="Latest Magazine Issues">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">PRINT & DIGITAL EDITIONS</span>
          <h2 className="section-title font-serif">Latest Magazine Issues</h2>
        </div>
        <Link href="/magazines" className="section-viewall-link">
          <span>View All Issues</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="magazine-archive-grid">
        {issues.map((issue, idx) => (
          <div key={issue.id || issue.slug || String(idx)} className="magazine-issue-card">
            <Link href="/magazines" className="magazine-cover-link">
              <div className="magazine-cover-wrap" style={{ borderRadius: "8px", overflow: "hidden" }}>
                {issue.cover ? (
                  <Image
                    src={issue.cover}
                    alt={issue.title}
                    fill
                    className="magazine-cover-img object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="magazine-placeholder-cover">
                    <div className="placeholder-brand font-serif">The Success World</div>
                    <div className="placeholder-edition">{issue.issue}</div>
                  </div>
                )}
              </div>
            </Link>

            <div className="magazine-card-details">
              <div className="magazine-edition-tag" style={{ color: "#50071C", fontWeight: 800 }}>
                {issue.issue} · {issue.date}
              </div>
              <h3 className="magazine-card-title font-serif">
                <Link href="/magazines" style={{ color: "#17151C", textDecoration: "none" }}>
                  {issue.title}
                </Link>
              </h3>
              <div className="magazine-article-count">14 Articles Included</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
