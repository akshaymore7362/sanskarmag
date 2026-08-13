import Image from "next/image";
import { leaderService } from "@/services/leaderService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Linkedin } from "@/components/ui/SocialIcons";

export function LeadersSection() {
  const leaders = leaderService.all();

  return (
    <section className="leaders section-light">
      <SectionHeading title="Leaders Making An Impact" linkText="View All Leaders" />
      <div>
        {leaders.map((leader) => (
          <article key={leader.id}>
            <Image src={leader.image} alt={leader.imageAlt} width={130} height={178} />
            <h3>{leader.name}</h3>
            <p>{leader.role}<br />{leader.company}</p>
            <Linkedin size={15} />
          </article>
        ))}
      </div>
      <div className="dots"><span /><span className="active" /><span /></div>
    </section>
  );
}
