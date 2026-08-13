import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial/PageIntro";

export const metadata: Metadata = {
  title: "About | Momentum Magazine",
  description: "Learn about Momentum Magazine's mission and editorial philosophy.",
};

export default function AboutPage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="About Momentum" intro="Momentum Magazine is a premium digital business and leadership publication for ambitious operators, founders and global executives." eyebrow="Publication Story" dark />
      <section className="content-bands">
        <div><h2>Mission</h2><p>We publish sharp, useful editorial work about the people, ideas and systems shaping modern business.</p></div>
        <div><h2>Editorial Philosophy</h2><p>Our work favors clarity over noise, field reporting over recycled opinion and practical intelligence over empty trend language.</p></div>
        <div><h2>Global Reach</h2><p>Momentum follows companies, markets and leaders across major business regions with a global editorial lens.</p></div>
        <div><h2>Values</h2><p>Independence, accuracy, ambition, depth and respect for reader time guide every story we publish.</p></div>
      </section>
    </main>
  );
}
