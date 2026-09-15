"use client";

import { useEffect } from "react";

/**
 * Mounted once in the root layout. Watches every element carrying
 * `.tsw-reveal` / `.tsw-reveal-stagger` (see globals.css) and adds
 * `.is-visible` the first time it scrolls into view, then stops
 * observing it — a lightweight, dependency-free scroll-reveal system
 * driven entirely by IntersectionObserver + CSS transitions.
 */
export function ScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".tsw-reveal:not(.is-visible), .tsw-reveal-stagger:not(.is-visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Re-scan for elements added after client-side data fetches (most
    // homepage sections render null until their Sanity fetch resolves).
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
