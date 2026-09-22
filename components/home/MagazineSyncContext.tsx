"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

const AUTOPLAY_MS = 3500;

interface MagazineSyncValue {
  /** The full issue list — fetched ONCE, here, and shared. Both the Hero
   * cover and the Web Profile render from this same list, keyed by id. */
  issues: MagazineIssue[];
  /** Single source of truth: the id of the currently selected issue — not an
   * array index, so cover/profile can never drift apart due to the two
   * arrays being in different orders or having different lengths. */
  selectedIssueId: string | null;
  /** issues.find(i => i.id === selectedIssueId) — the one object every
   * consumer (cover, web profile, issue number, year) renders from. */
  selectedIssue: MagazineIssue | null;
  selectedIndex: number;
  direction: number;
  goToId: (id: string) => void;
  goToNext: () => void;
  goToPrev: () => void;
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
}

const MagazineSyncContext = createContext<MagazineSyncValue | null>(null);

export function MagazineSyncProvider({
  children,
  initialIssues,
}: {
  children: ReactNode;
  /** Server-fetched issues (from app/page.tsx) so the first render already
   * has data — skips the client mount → fetch → wait round trip that made
   * the Hero cover and Web Profile spotlight slow to appear. */
  initialIssues?: MagazineIssue[];
}) {
  const [issues, setIssues] = useState<MagazineIssue[]>(initialIssues && initialIssues.length > 0 ? initialIssues.slice(0, 6) : []);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [isPaused, setPaused] = useState(false);

  // Fetch the issue list exactly once, here — HeroSection and
  // WebProfilesSection both read it from context instead of each fetching
  // (and each maintaining) their own copy. Skipped when server-fetched data
  // already seeded the initial state above.
  useEffect(() => {
    if (initialIssues && initialIssues.length > 0) return;
    let cancelled = false;
    magazineService.fetchSanityMagazines().then((data) => {
      if (!cancelled && data && data.length > 0) {
        setIssues(data.slice(0, 6));
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Seed the initial selection once issues load (and re-seed if the
  // previously-selected id ever disappears from the list).
  useEffect(() => {
    if (issues.length === 0) return;
    setSelectedIssueId((prev) => (prev && issues.some((i) => i.id === prev) ? prev : issues[0].id ?? null));
  }, [issues]);

  const selectedIndex = useMemo(
    () => (selectedIssueId ? issues.findIndex((i) => i.id === selectedIssueId) : -1),
    [issues, selectedIssueId]
  );
  const selectedIssue = selectedIndex >= 0 ? issues[selectedIndex] : null;

  const goToId = (id: string) => {
    const targetIndex = issues.findIndex((i) => i.id === id);
    if (targetIndex === -1) return;
    setDirection(targetIndex > selectedIndex || (selectedIndex === issues.length - 1 && targetIndex === 0) ? 1 : -1);
    setSelectedIssueId(id);
  };

  // Next/Previous buttons, dots, swipe, and autoplay all funnel through
  // these two functions — one navigation path, never a separate one for
  // autoplay vs manual interaction.
  const goToNext = () => {
    if (issues.length === 0) return;
    setDirection(1);
    setSelectedIssueId((prev) => {
      const idx = prev ? issues.findIndex((i) => i.id === prev) : -1;
      const nextIdx = idx === -1 ? 0 : (idx + 1) % issues.length;
      return issues[nextIdx].id ?? null;
    });
  };

  const goToPrev = () => {
    if (issues.length === 0) return;
    setDirection(-1);
    setSelectedIssueId((prev) => {
      const idx = prev ? issues.findIndex((i) => i.id === prev) : -1;
      const prevIdx = idx === -1 ? 0 : (idx - 1 + issues.length) % issues.length;
      return issues[prevIdx].id ?? null;
    });
  };

  // The ONLY autoplay timer for this slider. Recreated only when the issue
  // count or pause state changes — never stacks a second interval on top.
  useEffect(() => {
    if (issues.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setSelectedIssueId((prev) => {
        const idx = prev ? issues.findIndex((i) => i.id === prev) : -1;
        const nextIdx = idx === -1 ? 0 : (idx + 1) % issues.length;
        return issues[nextIdx].id ?? null;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [issues, isPaused]);

  const value = useMemo(
    () => ({
      issues,
      selectedIssueId,
      selectedIssue,
      selectedIndex,
      direction,
      goToId,
      goToNext,
      goToPrev,
      isPaused,
      setPaused,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [issues, selectedIssueId, selectedIssue, selectedIndex, direction, isPaused]
  );

  return <MagazineSyncContext.Provider value={value}>{children}</MagazineSyncContext.Provider>;
}

export function useMagazineSync(): MagazineSyncValue {
  const ctx = useContext(MagazineSyncContext);
  if (!ctx) {
    throw new Error("useMagazineSync must be used inside <MagazineSyncProvider>");
  }
  return ctx;
}

/** Derives a display-ready "web profile" directly from a magazine issue's
 * own fields (title, cover, description) — never from a separate leaders
 * array. Because it's built from the exact same issue object as the cover,
 * the two can never mismatch: there's only one object, not two indexes into
 * two different lists. Magazine titles are written as
 * "NAME - story headline" (e.g. "Dr. Desiree Bartlett - Wellness Leader
 * Transforming Women's Fitness Journeys"). */
export function deriveWebProfile(issue: MagazineIssue) {
  const rawTitle = (issue.title || "").trim();
  const parts = rawTitle.split(/\s[-–—|]\s/);
  const name = (parts[0] || rawTitle).trim() || "Featured Executive";
  const headline = parts.length > 1 ? parts.slice(1).join(" - ").trim() : "";
  return {
    name,
    headline: headline || issue.subtitle || "Executive Leader",
    bio: issue.description || issue.subtitle || "",
    avatar: issue.cover || "",
  };
}
