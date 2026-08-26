"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="tsw-band tsw-band--dark">
      <section className="tsw-band-inner">
        <div className="tsw-nl">
          <span className="tsw-kicker"><Mail size={13} /> Executive Briefing Newsletter</span>
          <h2>Market Intelligence Delivered Directly To Your Inbox</h2>
          <p>
            Join 450,000+ corporate leaders, investors, and decision-makers getting weekly strategic
            briefings and executive interviews.
          </p>

          {submitted ? (
            <div className="tsw-nl-ok">
              <CheckCircle2 size={18} />
              <span>You are now subscribed to The Success World weekly briefing.</span>
            </div>
          ) : (
            <form
              className="tsw-nl-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input type="email" required placeholder="Enter your corporate email address" />
              <button type="submit">Subscribe <ArrowRight size={14} /></button>
            </form>
          )}

          <p className="tsw-nl-fine">
            <ShieldCheck size={12} /> No spam. Unsubscribe at any time with one click.
          </p>
        </div>
      </section>
    </div>
  );
}
