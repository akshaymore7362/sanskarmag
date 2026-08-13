import { ArrowRight } from "lucide-react";
import { MagazineCover } from "@/components/editorial/MagazineCover";
import { magazineService } from "@/services/magazineService";
import { Button } from "@/components/ui/Button";

export function MagazineSection() {
  const issue = magazineService.current();
  return (
    <section className="magazine-panel">
      <div>
        <h2>The Magazine</h2>
        <p className="issue-meta">Issue 24 <span /> May 2026</p>
        <h3>{issue.title}</h3>
        <p>{issue.subtitle} A deep dive into the forces shaping business, technology and global leadership.</p>
        <div>
          <Button>Read Issue <ArrowRight size={13} /></Button>
          <Button variant="outline">Download PDF</Button>
        </div>
      </div>
      <MagazineCover issue={issue} decorative />
    </section>
  );
}
