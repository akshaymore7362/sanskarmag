import Image from "next/image";
import type { MagazineIssue } from "@/types";

type Props = {
  issue: MagazineIssue;
  compact?: boolean;
  decorative?: boolean;
};

export function MagazineCover({ issue, compact = false, decorative = false }: Props) {
  return (
    <div className={compact ? "magazine-cover magazine-cover-compact" : "magazine-cover"}>
      {issue.cover ? (
        <Image src={issue.cover} alt={decorative ? "" : (issue.coverAlt || issue.title || "Magazine Cover")} fill className="object-cover" unoptimized />
      ) : null}
      <div className="magazine-cover-shade" />
      <div className="magazine-cover-top">
        <strong>The Success</strong>
        <span>World</span>
      </div>
      <div className="magazine-cover-lines">
        <span>Leadership</span>
        <span>Technology</span>
        <span>Strategy</span>
      </div>
      <div className="magazine-cover-title">
        <small>{issue.date}</small>
        <h3>{issue.title}</h3>
      </div>
      <div className="barcode" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
