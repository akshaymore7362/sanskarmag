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
        <Link href={`/magazine/${issue.slug}`}>Read Issue</Link>
        <Link href="#">Download PDF</Link>
      </div>
    </article>
  );
}
