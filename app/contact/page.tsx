import type { Metadata } from "next";
import { PageIntro } from "@/components/editorial/PageIntro";

export const metadata: Metadata = {
  title: "Contact | Momentum Magazine",
  description: "Contact Momentum Magazine editorial, partnerships and advertising teams.",
};

export default function ContactPage() {
  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Contact" intro="Reach our editorial, partnerships and reader teams." eyebrow="Get In Touch" dark />
      <section className="contact-layout">
        <div>
          <h2>Contact Information</h2>
          <p>Editorial: editorial@momentum.example.com</p>
          <p>Advertising: partnerships@momentum.example.com</p>
          <p>Offices: New York, London, Singapore</p>
        </div>
        <form>
          <input placeholder="Name" />
          <input placeholder="Email" type="email" />
          <input placeholder="Company" />
          <textarea placeholder="Message" />
          <button type="button">Send Message</button>
        </form>
      </section>
    </main>
  );
}
