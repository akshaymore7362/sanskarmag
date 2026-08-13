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
      <Image src={issue.cover} alt={decorative ? "" : issue.coverAlt} fill className="object-cover" />
      <div className="magazine-cover-shade" />
      <div className="magazine-cover-top">
        <strong>Momentum</strong>
        <span>Magazine</span>
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
