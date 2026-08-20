"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ArrowRight, Clock, Calendar, Sparkles, BarChart3, Activity } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MarketNewsSection() {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticlesByIndustry("technology").then((items) => {
      if (items && items.length > 0) {
        setNews(items.slice(0, 4));
      } else {
        articleService.fetchSanityArticles().then((all) => {
          if (all && all.length > 0) setNews(all.slice(4, 8));
        });
      }
    });
  }, []);

  if (news.length === 0) return null;

  const heroItem = news[0];
  const sideItems = news.slice(1, 4);

  return (
    <section className="section market-news-section" aria-label="Market News & Economic Dynamics">
      <div className="market-news-header-row">
        <div>
          <div className="market-live-indicator">
            <span className="live-pulse-dot" />
            <Activity size={12} />
            <span>BUSINESS INTELLIGENCE</span>
          </div>
          <h2 className="section-title font-serif">Market News & Economic Dynamics</h2>
        </div>

        <Link href="/blogs" className="section-viewall-link">
          <span>View All News</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="market-news-panel">
        {/* LEFT: Chart / Featured Market Visual */}
        {heroItem && (
          <div className="market-chart-hero-card">
            {/* SVG Interactive Market Chart Overlay Graphic */}
            <div className="market-chart-graphic">
              <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="chart-svg">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0 160 Q 80 140 140 90 T 280 110 T 420 40 L 500 20 V 200 H 0 Z" fill="url(#chartGradient)" />
                <path d="M0 160 Q 80 140 140 90 T 280 110 T 420 40 L 500 20" stroke="#F5B942" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="140" cy="90" r="5" fill="#F5B942" />
                <circle cx="280" cy="110" r="5" fill="#7C3AED" />
                <circle cx="420" cy="40" r="5" fill="#F5B942" />
              </svg>
            </div>

            <div className="market-hero-content-wrap">
              <div className="market-hero-meta">
                <span className="gold-pill-sm">ECONOMIC ANALYSIS</span>
                <span className="market-date"><Calendar size={12} /> {heroItem.date}</span>
              </div>

              <h3 className="market-hero-headline font-serif">
                <Link href={`/blogs/${heroItem.slug}`}>{heroItem.title}</Link>
              </h3>

              <p className="market-hero-excerpt">{heroItem.description}</p>

              <div className="market-hero-footer">
                <Link href={`/blogs/${heroItem.slug}`} className="read-coverage-btn">
                  <span>Read Market Coverage</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT: 3 Stacked Market News Stories */}
        <div className="market-news-side-feed">
          {sideItems.map((item, idx) => (
            <article className="market-side-item" key={item.slug || String(idx)}>
              {item.image && (
                <div className="market-side-thumb-wrap">
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="market-side-content">
                <span className="market-side-tag">MARKETS</span>
                <h4 className="market-side-title font-serif">
                  <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                </h4>
                <div className="market-side-meta">
                  <Clock size={11} />
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
