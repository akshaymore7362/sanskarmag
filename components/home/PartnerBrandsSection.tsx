"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSanityQuery } from "@/lib/sanity.client";
import { Building2, Cpu, ShieldCheck, Zap, Activity, Globe2, Award, Sparkles } from "lucide-react";

interface BrandItem {
  _id: string;
  title: string;
  imageUrl?: string;
  tagline?: string;
  icon?: any;
}

const defaultBrands: BrandItem[] = [
  { _id: "b1", title: "Google", tagline: "Cloud & AI", icon: Globe2 },
  { _id: "b2", title: "Microsoft", tagline: "Enterprise Tech", icon: Cpu },
  { _id: "b3", title: "AWS", tagline: "Cloud Infrastructure", icon: Zap },
  { _id: "b4", title: "Deloitte", tagline: "Strategy & Advisory", icon: ShieldCheck },
  { _id: "b5", title: "PwC", tagline: "Financial Consulting", icon: Building2 },
  { _id: "b6", title: "IBM", tagline: "Quantum & Systems", icon: Activity },
  { _id: "b7", title: "Oracle", tagline: "Enterprise Data", icon: Award },
  { _id: "b8", title: "SAP", tagline: "ERP & Operations", icon: Sparkles },
];

export function PartnerBrandsSection() {
  const [brands, setBrands] = useState<BrandItem[]>(defaultBrands);

  useEffect(() => {
    fetchSanityQuery(`*[_type == "brand"]{ _id, title, "imageUrl": image.asset->url }`).then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map((b: any, idx: number) => {
          const fallback = defaultBrands[idx % defaultBrands.length];
          return {
            _id: b._id || String(idx + 1),
            title: b.title || fallback.title,
            imageUrl: b.imageUrl,
            tagline: fallback.tagline,
            icon: fallback.icon,
          };
        });
        setBrands(mapped);
      }
    });
  }, []);

  return (
    <section className="section partner-brands-section" aria-label="Partner Brands">
      <div className="section-header-row compact">
        <span className="section-eyebrow">STRATEGIC ALLIANCES</span>
        <h2 className="section-title font-serif">OUR PARTNER BRANDS</h2>
      </div>

      <div className="partner-brands-grid">
        {brands.map((brand) => {
          const IconComp = brand.icon || Building2;
          return (
            <div key={brand._id} className="partner-brand-card">
              {brand.imageUrl ? (
                <div className="partner-logo-wrap">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="partner-brand-content">
                  <IconComp size={18} className="partner-icon" />
                  <span className="partner-name font-serif">{brand.title}</span>
                  {brand.tagline && <span className="partner-tagline">{brand.tagline}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
