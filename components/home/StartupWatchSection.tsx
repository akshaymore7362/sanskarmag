"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { startupService } from "@/services/startupService";
import type { Startup } from "@/types";

export function StartupWatchSection() {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    startupService.fetchSanityStartups().then((items) => {
      if (items && items.length > 0) {
        setStartups(items.slice(0, 4));
      } else {
        setStartups(startupService.all().slice(0, 4));
      }
    });
  }, []);

  if (startups.length === 0) return null;

  return (
    <section className="section section-bg">
      <div className="section-label">Startup Watch</div>
      <div className="startup-grid">
        {startups.map((startup, idx) => (
          <div key={startup.slug || String(idx)} className="mag-card">
            <div className="mag-card-cover" style={{ height: "200px", position: "relative" }}>
              {startup.image ? (
                <Image
                  src={startup.image}
                  alt={startup.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div style={{ height: "100%", background: "#0B0B0B", display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--serif)" }}>
                  {startup.name}
                </div>
              )}
            </div>
            <div className="mag-card-body">
              <span className="tag tag-startups" style={{ marginBottom: "8px" }}>{startup.stage || "Seed"}</span>
              <h3 className="mag-card-title">
                <Link href="/startups">{startup.name}</Link>
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-grey)", lineHeight: 1.5, marginBottom: "12px" }}>
                {startup.summary}
              </p>
              <div className="mag-card-count">
                {startup.sector} · {startup.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
