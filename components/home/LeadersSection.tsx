"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
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
    <section className="py-12 lg:py-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-[#D4B475] pb-4 mb-8 gap-4">
        <div>
          <span className="text-[#B08B45] text-xs font-bold tracking-widest uppercase mb-2 block">
            WEB PROFILES
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-gray-900">
            Featured Executive Leaders
          </h2>
        </div>

        <Link
          href="/leaders"
          className="text-[#B08B45] text-xs font-bold tracking-wider uppercase flex items-center gap-1 hover:text-[#B08B45] transition-colors whitespace-nowrap"
        >
          <span>View All Leaders</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Featured Executive Leader (col-span-7) */}
        {featured && (
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[#0a192f] text-[#D4B475] flex items-center justify-center font-serif text-2xl font-bold">
                  {featured.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[#B08B45] font-bold text-xs tracking-wider uppercase mb-1 flex items-center gap-1">
                <Award size={14} /> COVER FEATURED LEADER
              </span>

              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {featured.name}
              </h3>

              <div className="text-gray-600 text-sm font-semibold mb-3">
                {featured.role} &bull; <span className="text-[#0a192f]">{featured.company}</span>
              </div>

              {featured.bio && (
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4">
                  "{featured.bio}"
                </p>
              )}

              <Link
                href={`/leaders/${featured.slug}`}
                className="text-[#0a192f] font-bold text-xs tracking-wider uppercase hover:text-[#B08B45] flex items-center gap-1 mt-auto"
              >
                <span>View Full Profile</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Supporting Executive Leaders (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {supporting.map((leader, idx) => (
            <div
              key={leader.slug || String(idx)}
              className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                {leader.image && (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[#B08B45] font-bold text-[10px] tracking-wider uppercase mb-1">
                  EXECUTIVE PROFILE
                </span>

                <h4 className="font-serif text-lg font-bold text-gray-900 line-clamp-1">
                  <Link href={`/leaders/${leader.slug}`} className="hover:text-[#B08B45] transition-colors">
                    {leader.name}
                  </Link>
                </h4>

                <div className="text-gray-600 text-xs font-medium line-clamp-1">
                  {leader.role}
                </div>

                <div className="text-gray-400 text-xs font-semibold line-clamp-1">
                  {leader.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
