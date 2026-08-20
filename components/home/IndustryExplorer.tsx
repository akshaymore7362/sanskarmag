"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BriefcaseBusiness, Building2, Cpu, Factory, GraduationCap, HeartPulse, Landmark, Lightbulb, Zap } from "lucide-react";
import { industryService } from "@/services/industryService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Industry } from "@/types";

const icons = [Cpu, BriefcaseBusiness, Landmark, HeartPulse, Building2, GraduationCap, Zap, Factory, Lightbulb, Award];

export function IndustryExplorer() {
  const [industries, setIndustries] = useState<Industry[]>(industryService.all());

  useEffect(() => {
    industryService.fetchSanityIndustries().then((items) => {
      if (items && items.length > 0) {
        setIndustries(items);
      }
    });
  }, []);

  return (
    <section className="industries section-light">
      <SectionHeading title="Explore By Industry" linkText="View All Industries" />
      <div>
        {industries.map((industry, index) => {
          const Icon = icons[index % icons.length] ?? Cpu;
          return (
            <article key={industry.slug || industry.name || String(index)}>
              {industry.image && <Image src={industry.image} alt={industry.imageAlt || industry.name || "Industry"} fill className="object-cover" unoptimized />}
              <div><Icon size={20} /><h3>{industry.name}</h3><p>{industry.descriptor}</p></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
