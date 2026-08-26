"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
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
    <section className="tsw-section">
      <div className="tsw-head">
        <div>
          <span className="tsw-kicker">Print &amp; Digital Editions</span>
          <h2 className="tsw-title">Latest Magazine Issues</h2>
        </div>
        <Link href="/magazines" className="tsw-link">
          View all issues <ArrowRight size={14} />
        </Link>
      </div>

      <div className="tsw-mag-grid">
        {issues.map((issue, idx) => {
          const targetUrl = issue.pdfUrl ? issue.pdfUrl : `/magazines/${issue.slug}`;
          const isExternalPdf = Boolean(issue.pdfUrl && (issue.pdfUrl.startsWith("http://") || issue.pdfUrl.startsWith("https://")));
          const coverInner = issue.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={issue.cover} alt={issue.title} />
          ) : (
            <div className="tsw-mag-cover-ph">{issue.title}</div>
          );

          return (
            <article key={issue.id || issue.slug || String(idx)} className="tsw-mag-card">
              {isExternalPdf ? (
                <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="tsw-mag-cover">{coverInner}</a>
              ) : (
                <Link href={targetUrl} className="tsw-mag-cover">{coverInner}</Link>
              )}

              <div className="tsw-mag-edition">
                {issue.issue || `Edition ${idx + 1}`} · {issue.date || "2026"}
              </div>

              <h4>
                {isExternalPdf ? (
                  <a href={targetUrl} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                ) : (
                  <Link href={targetUrl}>{issue.title}</Link>
                )}
              </h4>

              {isExternalPdf ? (
                <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="tsw-mag-btn">
                  <BookOpen size={13} /> Read Edition <ExternalLink size={11} />
                </a>
              ) : (
                <Link href={targetUrl} className="tsw-mag-btn">
                  <BookOpen size={13} /> Read Edition
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
