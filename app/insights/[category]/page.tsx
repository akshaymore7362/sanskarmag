import type { Metadata } from "next";
import { InsightsView } from "@/components/editorial/InsightsView";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${formattedCategory} Insights | The Success World`,
    description: `Browse ${formattedCategory} insights, essays and research from The Success World.`,
  };
}

export default async function InsightCategoryPage({ params }: Props) {
  const { category } = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return <InsightsView initialCategory={formattedCategory} />;
}
