import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial/PageIntro";
import { eventService } from "@/services/eventService";

export const metadata: Metadata = {
  title: "Events | Momentum Magazine",
  description: "Summits, forums and briefings for business leaders.",
};

export default function EventsPage() {
  const featured = eventService.featured();
  const events = eventService.all();

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Events" intro="Premium summits, briefings and editorial gatherings for leaders and builders." eyebrow="Calendar" dark />
      <section className="event-list-feature">
        <Image src={featured.image} alt={featured.imageAlt} fill className="object-cover" />
        <div>
          <time>{featured.day}<span>{featured.month}</span></time>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <Link href={`/events/${featured.slug}`}>Register Now</Link>
        </div>
      </section>
      <section className="event-directory">
        {events.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <time>{event.day}<span>{event.month}</span></time>
            <div><h3>{event.title}</h3><p>{event.location} | {event.date}</p><small>{event.description}</small></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
