import type { Metadata } from "next";
import { IssueCard } from "@/components/editorial/IssueCard";
import { PageIntro } from "@/components/editorial/PageIntro";
import { magazineService } from "@/services/magazineService";

export const metadata: Metadata = {
  title: "Magazine Archive | The Success World",
  description: "Browse premium digital issues of The Success World.",
};

export default function MagazinePage() {
  return (
    <main className="magazine-page site-shell inner-shell">
      <PageIntro title="Magazine" intro="Digital issues, cover stories and editorial packages from The Success World." eyebrow="Archive" dark />
      <section className="issue-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px", margin: "32px 0" }}>
        {magazineService.all().map((issue) => <IssueCard issue={issue} key={issue.slug} />)}
      </section>
    </main>
  );
}
