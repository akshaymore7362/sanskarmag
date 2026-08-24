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
    <section className="py-12 lg:py-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 lg:mb-12 gap-4 text-center md:text-left">
        <div className="text-[#775a19] text-xs font-bold tracking-widest uppercase">
          STRATEGIC ALLIANCES
        </div>
        <h2 className="font-serif text-lg md:text-2xl font-bold text-gray-900">
          OUR PARTNER BRANDS
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border border-gray-200 rounded-lg p-4 lg:p-8 flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow h-24 lg:h-32"
          >
            {brand.imageUrl ? (
              <div className="relative w-full h-12 lg:h-16 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.imageUrl}
                  alt={brand.title}
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <Building2 size={20} className="text-[#775a19]" />
                <span className="font-serif font-bold text-sm text-gray-900">{brand.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
