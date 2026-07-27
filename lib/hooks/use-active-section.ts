// lib/hooks/use-active-section.ts
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface UseActiveSectionOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

// Default detection band: a horizontal stripe between 25% and ~45% from the
// viewport top. threshold 0 means "any part of the section touching the band
// activates it" — a >=30% visibility requirement (the previous default) can
// never be met by sections taller than the band, which left section links
// permanently inactive while page links (pathname-based) highlighted fine.
//
// The observer re-binds on every route change: sections only exist on the
// home page, and navigating away destroys the DOM nodes a previous binding
// observed. Without the re-bind, activeSection froze at a stale value after
// any away-and-back navigation. Off the home page the state is cleared so
// stale section highlights can never combine with pathname-based ones.
export function useActiveSection({
  sectionIds,
  rootMargin = "-25% 0px -55% 0px",
  threshold = 0,
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin, threshold }
    );

    // Home sections are dynamic imports that mount after hydration, so a
    // single bind pass can run before they exist — retry briefly.
    const observed = new Set<string>();
    const bind = () => {
      sectionIds.forEach((id) => {
        if (observed.has(id)) return;
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
          observed.add(id);
        }
      });
    };
    bind();
    const timers = [300, 1000, 2500].map((ms) => setTimeout(bind, ms));

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [pathname, sectionIds, rootMargin, threshold]);

  return activeSection;
}

// Smooth scroll utility. Retries until the target section exists — needed
// right after navigating to the home page, whose sections mount lazily.
export const scrollToSection = (sectionId: string): void => {
  const attempt = (remaining: number): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      return;
    }
    if (remaining > 0) {
      setTimeout(() => attempt(remaining - 1), 100);
    }
  };
  attempt(30);
};
