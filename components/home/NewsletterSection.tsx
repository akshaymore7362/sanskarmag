"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section newsletter-section" aria-label="Weekly Newsletter Subscription">
      <div className="newsletter-card-purple">
        <div className="newsletter-content">
          <span className="newsletter-eyebrow">
            <Sparkles size={13} /> EXECUTIVE BRIEFING
          </span>
          
          <h2 className="newsletter-headline font-serif">
            Stories Worth Your Time, <br />Every Week
          </h2>
          
          <p className="newsletter-desc">
            Join 450,000+ business leaders getting premium editorial briefings, market intelligence, and technological analysis delivered directly to their inbox.
          </p>

          {submitted ? (
            <div className="newsletter-success-badge">
              <CheckCircle2 size={18} />
              <span>Thank you! You are now subscribed to The Success World weekly briefing.</span>
            </div>
          ) : (
            <form
              className="newsletter-form-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                className="newsletter-input"
                type="email"
                required
                placeholder="Enter your corporate email address..."
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-gold-gradient newsletter-submit-btn">
                Subscribe
              </button>
            </form>
          )}

          <div className="newsletter-fine-print">
            No spam. Unsubscribe at any time with one click.
          </div>
        </div>
      </div>
    </section>
  );
}
