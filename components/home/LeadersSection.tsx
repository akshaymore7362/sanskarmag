"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserCheck, Award } from "lucide-react";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";

export function LeadersSection() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((items) => {
      if (items && items.length > 0) {
        setLeaders(items);
      }
    });
  }, []);

  if (leaders.length === 0) return null;

  const featured = leaders[0];
  const supporting = leaders.slice(1, 3);

  return (
    <section className="section featured-leaders-section" aria-label="Featured Leaders & Executives">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">EXECUTIVE BOARD</span>
          <h2 className="section-title font-serif">Featured Leaders & Visionaries</h2>
        </div>
        <Link href="/leaders" className="section-viewall-link">
          <span>View All Leaders</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="featured-leaders-grid">
        {/* Main Featured Executive */}
        {featured && (
          <div className="main-featured-leader-card">
            <div className="main-leader-portrait-wrap">
              {featured.image ? (
                <Image src={featured.image} alt={featured.name} fill className="object-cover" unoptimized />
              ) : (
                <div className="leader-portrait-placeholder font-serif">{featured.name}</div>
              )}
            </div>

            <div className="main-leader-info">
              <span className="leader-gold-tag">FEATURED LEADER</span>
              <h3 className="leader-name font-serif">{featured.name}</h3>
              <div className="leader-position">{featured.role}, {featured.company}</div>
              <p className="leader-bio">{featured.bio}</p>
              <Link href={`/leaders/${featured.slug}`} className="btn btn-outline-gold leader-profile-btn">
                <span>View Profile</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Supporting Leaders */}
        <div className="supporting-leaders-column">
          {supporting.map((leader, idx) => (
            <div key={leader.slug || String(idx)} className="supporting-leader-card">
              <div className="supporting-portrait-wrap">
                {leader.image && (
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" unoptimized />
                )}
              </div>
              <div className="supporting-leader-info">
                <span className="supporting-leader-tag">EXECUTIVE</span>
                <h4 className="supporting-name font-serif">
                  <Link href={`/leaders/${leader.slug}`}>{leader.name}</Link>
                </h4>
                <div className="supporting-role">{leader.role}</div>
                <div className="supporting-company">{leader.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
