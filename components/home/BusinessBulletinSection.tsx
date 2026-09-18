"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function BusinessBulletinSection() {
  const [stories, setStories] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    articleService
      .fetchSanityArticles()
      .then((items) => {
        if (items && items.length > 0) {
          setStories(items.slice(0, 5));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading && stories.length === 0) {
    return (
      <section className="tsw-section">
        <div className="tsw-head">
          <div>
            <span className="tsw-kicker">Business Bulletin</span>
            <h2 className="tsw-title">Enterprise &amp; Market Intelligence</h2>
          </div>
        </div>
        <div className="tsw-bulletin-grid grid-sidebar-layout">
          <div className="skeleton-pulse" style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: 8 }} />
          <div className="tsw-bulletin-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div className="skeleton-pulse" style={{ width: 95, height: 78, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-pulse" style={{ width: "60%", height: 12, marginBottom: 8 }} />
                  <div className="skeleton-pulse" style={{ width: "90%", height: 14, marginBottom: 6 }} />
                  <div className="skeleton-pulse" style={{ width: "40%", height: 10 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  const lead = stories[0];
  const sideList = stories.slice(1, 5);

  return (
    <section className="tsw-section">
      <div className="tsw-head">
        <div>
          <span className="tsw-kicker">Business Bulletin</span>
          <h2 className="tsw-title">Enterprise &amp; Market Intelligence</h2>
        </div>
        <Link href="/blogs" className="tsw-link">
          View all stories <ArrowRight size={14} />
        </Link>
      </div>

      <div className="tsw-bulletin-grid grid-sidebar-layout">
        {/* LEFT — lead feature */}
        {lead && (
          <article className="tsw-card tsw-bulletin-lead">
            <Link href={`/blogs/${lead.slug}`} className="tsw-bulletin-lead-img">
              {lead.image && (
                <Image src={lead.image} alt={lead.title} fill className="object-cover" unoptimized priority />
              )}
              <span className="tsw-tag">{lead.category || "Legal"}</span>
            </Link>
            <div className="tsw-bulletin-lead-body">
              <h3 className="font-serif">
                <Link href={`/blogs/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p>{lead.description}</p>
              <div className="tsw-byline">
                <span>By {lead.author || "Editorial Board"}</span>
                <span className="tsw-byline-time"><Clock size={13} /> {lead.readTime || "5 min read"}</span>
              </div>
            </div>
          </article>
        )}

        {/* RIGHT — stacked list */}
        <div className="tsw-bulletin-list">
          {sideList.map((item, idx) => (
            <Link key={item.slug || String(idx)} href={`/blogs/${item.slug}`} className="tsw-bulletin-row">
              <div className="tsw-bulletin-row-thumb">
                {item.image && (
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                )}
              </div>
              <div className="tsw-bulletin-row-body">
                <span className="tsw-eyebrow-sm">{item.category || "Business"}</span>
                <h4 className="font-serif">{item.title}</h4>
                <span className="tsw-byline-time"><Clock size={12} /> {item.readTime || "5 min read"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
