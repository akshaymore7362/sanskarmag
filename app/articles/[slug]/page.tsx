import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { TrendingSidebar } from "@/components/editorial/TrendingSidebar";
import { authors } from "@/data/authors";
import { articleService } from "@/services/articleService";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articleService.all().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleService.bySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Momentum Magazine`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      images: [article.image],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articleService.bySlug(slug);
  if (!article) notFound();
  const author = authors.find((item) => item.id === article.authorId) ?? authors[0];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    image: article.image,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    publisher: { "@type": "Organization", name: "Momentum Magazine" },
  };

  return (
    <main className="site-shell inner-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="article-detail">
        <header className="article-masthead">
          <p className="gold-label">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.subtitle}</p>
          <div className="byline">
            <Image src={author.image} alt={author.name} width={54} height={54} />
            <span>By {article.author}<br /><small>{article.date} | {article.readTime}</small></span>
            <div><Link href="#">Share</Link><Link href="#">Save</Link></div>
          </div>
        </header>
        <div className="article-hero-image">
          <Image src={article.image} alt={article.imageAlt} fill className="object-cover" />
        </div>
        <div className="article-body-layout">
          <div className="article-body">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <blockquote>{article.pullQuote}</blockquote>
            <div className="stats-strip">
              {article.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
            <section className="author-bio">
              <Image src={author.image} alt={author.name} width={82} height={82} />
              <div><h3>{author.name}</h3><p>{author.bio}</p></div>
            </section>
          </div>
          <aside className="article-toc">
            <h2>In This Story</h2>
            {article.body.map((section) => <a href="#" key={section.heading}>{section.heading}</a>)}
            <TrendingSidebar />
          </aside>
        </div>
      </article>
      <section className="related-section">
        <h2>Related Stories</h2>
        <div className="article-grid article-grid-four">
          {articleService.related(article.slug).map((item) => <ArticleCard article={item} compact key={item.slug} />)}
        </div>
      </section>
    </main>
  );
}
