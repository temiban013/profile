// lib/hooks/use-active-section.ts
"use client";

import { useEffect, useState } from "react";

interface UseActiveSectionOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

export function useActiveSection({
  sectionIds,
  rootMargin = "-20% 0px -80% 0px",
  threshold = 0.3,
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the most visible section
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const mostVisibleSection = visibleSections[0];
        setActiveSection(mostVisibleSection.target.id);
      }
    }, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}

// Smooth scroll utility function
export const scrollToSection = (sectionId: string): void => {
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
  }
};
