"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSanityQuery } from "@/lib/sanity.client";
import { Building2 } from "lucide-react";

interface BrandItem {
  _id: string;
  title: string;
  imageUrl?: string;
}

export function PartnerBrandsSection() {
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    fetchSanityQuery(`*[_type in ["brand", "brandlogo"]]{ _id, title, "imageUrl": image.asset->url }`).then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map((b: any, idx: number) => ({
          _id: b._id || String(idx + 1),
          title: b.title || "Partner Brand",
          imageUrl: b.imageUrl || "",
        }));
        setBrands(mapped);
      }
    });
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="tsw-section">
      <div className="tsw-head">
        <div>
          <span className="tsw-kicker">Strategic Alliances</span>
          <h2 className="tsw-title">Our Partner Brands</h2>
        </div>
      </div>

      <div className="tsw-partners-grid">
        {brands.map((brand) => (
          <div key={brand._id} className="tsw-partner">
            {brand.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={brand.imageUrl} alt={brand.title} />
            ) : (
              <div className="tsw-partner-fallback">
                <Building2 size={20} />
                <span>{brand.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
