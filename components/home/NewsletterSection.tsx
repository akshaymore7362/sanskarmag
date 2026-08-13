"use client";

import Image from "next/image";
import { useState } from "react";
import { magazineService } from "@/services/magazineService";

export function NewsletterSection() {
  const [done, setDone] = useState(false);
  const issue = magazineService.current();
  return (
    <section className="newsletter">
      <div>
        <h2>The Magazine In Your Inbox</h2>
        <p>Get editor notes, issue drops, sharp business reads and event briefings straight to your inbox.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <input type="email" required placeholder="Enter your email address" />
        <button>{done ? "Subscribed" : "Subscribe Now"}</button>
      </form>
      <Image src={issue.cover} alt={issue.coverAlt} fill className="object-cover" />
    </section>
  );
}
