import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { startupService } from "@/services/startupService";

export function StartupWatchSection() {
  const startups = startupService.all();

  return (
    <section className="startup-watch section-light">
      <SectionHeading title="Startup Watch" linkText="View Startup Desk" />
      <div>
        {startups.map((startup) => (
          <article key={startup.slug}>
            <Image src={startup.image} alt={startup.imageAlt} fill className="object-cover" />
            <div>
              <p>{startup.stage}</p>
              <h3>{startup.name}</h3>
              <small>{startup.summary}</small>
              <span>{startup.sector} | {startup.location}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
