import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { articleService } from "@/services/articleService";
import { leaderService } from "@/services/leaderService";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return leaderService.all().map((leader) => ({ slug: leader.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leader = leaderService.bySlug(slug);
  if (!leader) return {};
  return { title: `${leader.name} | Momentum Magazine`, description: leader.bio };
}

export default async function LeaderProfilePage({ params }: Props) {
  const { slug } = await params;
  const leader = leaderService.bySlug(slug);
  if (!leader) notFound();
  const related = articleService.byIndustry(leader.industrySlug).slice(0, 4);

  return (
    <main className="site-shell inner-shell">
      <section className="leader-profile">
        <Image src={leader.image} alt={leader.imageAlt} width={360} height={492} />
        <div>
          <p className="gold-label">Leader Profile</p>
          <h1>{leader.name}</h1>
          <p>{leader.role} | {leader.company}</p>
          <blockquote>{leader.quote}</blockquote>
          <small>{leader.bio}</small>
          <div className="profile-actions"><Link href="#">LinkedIn</Link><Link href="/contact">Interview Request</Link></div>
        </div>
      </section>
      <section className="profile-highlights">
        <h2>Career Highlights</h2>
        {leader.highlights.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}
      </section>
      <section className="related-section">
        <h2>Related Stories</h2>
        <div className="article-grid article-grid-four">
          {(related.length ? related : articleService.latest().slice(0, 4)).map((article) => <ArticleCard article={article} compact key={article.slug} />)}
        </div>
      </section>
    </main>
  );
}
