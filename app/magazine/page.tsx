import type { Metadata } from "next";
import { IssueCard } from "@/components/editorial/IssueCard";
import { PageIntro } from "@/components/editorial/PageIntro";
import { magazineService } from "@/services/magazineService";

export const metadata: Metadata = {
  title: "Magazine Archive | Momentum Magazine",
  description: "Browse premium digital issues of Momentum Magazine.",
};

export default function MagazinePage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Magazine" intro="Digital issues, cover stories and editorial packages from Momentum Magazine." eyebrow="Archive" dark />
      <section className="issue-grid">
        {magazineService.all().map((issue) => <IssueCard issue={issue} key={issue.slug} />)}
      </section>
    </main>
  );
}
