import Link from "next/link";
import type { MagazineIssue } from "@/types";
import { MagazineCover } from "@/components/editorial/MagazineCover";

export function IssueCard({ issue }: { issue: MagazineIssue }) {
  return (
    <article className="issue-card">
      <Link href={`/magazine/${issue.slug}`} className="issue-card-cover">
        <MagazineCover issue={issue} decorative />
      </Link>
      <p>{issue.issue} | {issue.date}</p>
      <h3><Link href={`/magazine/${issue.slug}`}>{issue.title}</Link></h3>
      <small>{issue.subtitle}</small>
      <div>
        <Link href={`/magazines/${issue.slug}`}>Read Issue</Link>
        {issue.pdfUrl ? (
          <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        ) : (
          <Link href={`/magazines/${issue.slug}`}>View Magazine</Link>
        )}
      </div>
    </article>
  );
}
