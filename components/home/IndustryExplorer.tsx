import Image from "next/image";
import { Award, BriefcaseBusiness, Building2, Cpu, Factory, GraduationCap, HeartPulse, Landmark, Lightbulb, Zap } from "lucide-react";
import { industryService } from "@/services/industryService";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Cpu, BriefcaseBusiness, Landmark, HeartPulse, Building2, GraduationCap, Zap, Factory, Lightbulb, Award];

export function IndustryExplorer() {
  return (
    <section className="industries section-light">
      <SectionHeading title="Explore By Industry" linkText="View All Industries" />
      <div>
        {industryService.all().map((industry, index) => {
          const Icon = icons[index % icons.length] ?? Cpu;
          return (
            <article key={industry.name}>
              <Image src={industry.image} alt={industry.imageAlt} fill className="object-cover" />
              <div><Icon size={20} /><h3>{industry.name}</h3><p>{industry.descriptor}</p></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
