import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { MagazineCover } from "@/components/editorial/MagazineCover";
import { articleService } from "@/services/articleService";
import { magazineService } from "@/services/magazineService";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const issues = await magazineService.fetchSanityMagazines();
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issues = await magazineService.fetchSanityMagazines();
  const issue = issues.find((item) => item.slug === slug);
  if (!issue) return {};
  return { title: `${issue.title} | The Success World`, description: issue.description };
}

export default async function IssueDetailPage({ params }: Props) {
  const { slug } = await params;
  const issues = await magazineService.fetchSanityMagazines();
  const issue = issues.find((item) => item.slug === slug);
  if (!issue) notFound();
  const storySlugs = new Set((issue.stories || []).map((story) => story.articleSlug));
  const allArticles = storySlugs.size > 0 ? await articleService.fetchSanityArticles() : [];
  const issueArticles = allArticles.filter((article) => storySlugs.has(article.slug));

  return (
    <main className="site-shell inner-shell">
      <section className="issue-detail">
        <div className="issue-detail-cover">
          <MagazineCover issue={issue} decorative />
        </div>
        <div>
          <p className="gold-label">{issue.issue} | {issue.date}</p>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          <div className="issue-detail-actions">
            <Link href={`/magazines/${issue.slug}`}>Read Online</Link>
            {issue.pdfUrl ? (
              <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
            ) : (
              <Link href={`/magazines/${issue.slug}`}>View Magazine</Link>
            )}
          </div>
          <h2>Table of Contents</h2>
          <div className="toc-list">
            {issue.stories.map((story) => (
              <Link href={`/articles/${story.articleSlug}`} key={story.id}>
                <span>{String(story.page).padStart(2, "0")}</span>
                <strong>{story.title}</strong>
                <small>{story.category} | {story.author}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="related-section">
        <h2>Featured Stories In This Issue</h2>
        <div className="article-grid article-grid-four">
          {issueArticles.map((article) => <ArticleCard article={article} compact key={article.slug} />)}
        </div>
      </section>
    </main>
  );
}
