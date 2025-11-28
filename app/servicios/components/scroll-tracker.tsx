"use client";

import { useEffect, useRef } from "react";
import { analytics } from "./analytics";

export function ScrollTracker() {
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = Math.round(
        (scrollTop / scrollableHeight) * 100
      );

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedMilestones.current.has(milestone)
        ) {
          trackedMilestones.current.add(milestone);
          analytics.scrollDepth(milestone);
        }
      });
    };

    // Throttle scroll events to avoid performance issues
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
}
