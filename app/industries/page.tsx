import type { Metadata } from "next";
import { DirectoryCard } from "@/components/editorial/DirectoryCard";
import { PageIntro } from "@/components/editorial/PageIntro";
import { industryService } from "@/services/industryService";

export const metadata: Metadata = {
  title: "Industries | Momentum Magazine",
  description: "A premium directory of industries shaping business momentum.",
};

export default function IndustriesPage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Industries" intro="Sector intelligence across technology, finance, healthcare, real estate, energy, media and more." eyebrow="Market Directory" />
      <section className="directory-grid">
        {industryService.all().map((industry) => (
          <DirectoryCard
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            image={industry.image}
            alt={industry.imageAlt}
            eyebrow={industry.descriptor}
            title={industry.name}
            description={industry.overview}
          />
        ))}
      </section>
    </main>
  );
}
