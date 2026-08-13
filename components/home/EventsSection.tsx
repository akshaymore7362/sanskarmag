import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { eventService } from "@/services/eventService";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EventsSection() {
  const events = eventService.all();
  const [featured, ...rest] = events;
  const visibleRest = rest.slice(0, 7);
  return (
    <section className="events section-light">
      <SectionHeading title="Upcoming Events" linkText="View All Events" />
      <div className="event-panel">
        <Image src={featured.image || ""} alt={featured.imageAlt} fill className="object-cover" />
        <div className="event-feature">
          <time><b>{featured.day}</b><span>{featured.month}</span></time>
          <div>
            <h3>{featured.title}</h3>
            <p><MapPin size={13} /> {featured.location}</p>
            <small>{featured.description}</small>
            <a href="#">Register Now <ArrowRight size={13} /></a>
          </div>
        </div>
        {visibleRest.map((event) => (
          <article key={event.title}>
            <Image src={event.image} alt={event.imageAlt} width={92} height={62} style={{ width: 92, height: 62 }} />
            <time><b>{event.day}</b><span>{event.month}</span></time>
            <div><h3>{event.title}</h3><p>{event.location}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
