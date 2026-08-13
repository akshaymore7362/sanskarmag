import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FilterPills } from "@/components/editorial/FilterPills";
import { PageIntro } from "@/components/editorial/PageIntro";
import { leaderService } from "@/services/leaderService";

export const metadata: Metadata = {
  title: "Leaders | Momentum Magazine",
  description: "A directory of executives, founders and operators making an impact.",
};

export default function LeadersPage() {
  const [featured, ...leaders] = leaderService.all();

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Leaders" intro="Profiles of business leaders, founders and operators shaping the modern enterprise." eyebrow="People Directory" />
      <div className="search-strip"><input placeholder="Search leaders by name, company or industry" /><button>Search</button></div>
      <FilterPills items={["All", "Technology", "Finance", "Healthcare", "Startups", "Energy", "Leadership"]} />
      <section className="featured-leader">
        <Image src={featured.image} alt={featured.imageAlt} width={260} height={356} />
        <div>
          <p className="gold-label">Featured Leader</p>
          <h2>{featured.name}</h2>
          <p>{featured.role}, {featured.company}</p>
          <small>{featured.bio}</small>
          <Link href={`/leaders/${featured.slug}`}>Read Profile</Link>
        </div>
      </section>
      <section className="leader-directory">
        {leaders.map((leader) => (
          <Link href={`/leaders/${leader.slug}`} key={leader.slug} className="leader-directory-card">
            <Image src={leader.image} alt={leader.imageAlt} width={180} height={246} />
            <h3>{leader.name}</h3>
            <p>{leader.role}<br />{leader.company}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
