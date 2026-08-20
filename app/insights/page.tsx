import type { Metadata } from "next";
import { InsightsView } from "@/components/editorial/InsightsView";

export const metadata: Metadata = {
  title: "Insights | The Success World",
  description: "Opinion, analysis, strategy, culture and research from The Success World.",
};

export default function InsightsPage() {
  return <InsightsView />;
}
