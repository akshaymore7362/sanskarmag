"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function BusinessBulletinSection() {
  const [stories, setStories] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setStories(items.length > 1 ? items.slice(1, 5) : items);
      }
    });
  }, []);

  if (stories.length === 0) return null;

  const lead = stories[0];
  const sideList = stories.slice(1, 4);

  return (
    <section className="section business-bulletin-section" aria-label="Business Bulletin">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">BUSINESS BULLETIN</span>
          <h2 className="section-title font-serif">Enterprise & Market Intelligence</h2>
        </div>
        <Link href="/blogs" className="section-viewall-link">
          <span>View All Stories</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="business-bulletin-grid">
        {/* LEFT: Large Featured Story Card */}
        {lead && (
          <article className="bulletin-lead-card">
            {lead.image && (
              <div className="bulletin-lead-img-wrap">
                <Image src={lead.image} alt={lead.title} fill className="object-cover" unoptimized />
                <div className="bulletin-lead-gradient" />
                <span className="bulletin-lead-pill">{lead.category || "Market Insight"}</span>
              </div>
            )}
            <div className="bulletin-lead-body">
              <h3 className="bulletin-lead-title font-serif">
                <Link href={`/blogs/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p className="bulletin-lead-excerpt">{lead.description}</p>
              <div className="bulletin-lead-meta">
                <span>By {lead.author}</span>
                <span className="meta-dot">•</span>
                <span className="read-time-pill"><Clock size={12} /> {lead.readTime}</span>
              </div>
            </div>
          </article>
        )}

        {/* RIGHT: 3 Compact News Stories */}
        <div className="bulletin-side-list">
          {sideList.map((item, idx) => (
            <article key={item.slug || String(idx)} className="bulletin-side-item">
              {item.image && (
                <div className="bulletin-side-thumb-wrap">
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="bulletin-side-content">
                <span className="bulletin-side-tag">{item.category || "Business"}</span>
                <h4 className="bulletin-side-title font-serif">
                  <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                </h4>
                <div className="bulletin-side-meta">
                  <Clock size={12} />
                  <span>{item.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
