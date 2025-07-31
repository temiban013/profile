// components/navbar/scroll-progress.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
}

export const ScrollProgress = ({
  className,
  showPercentage = false,
}: ScrollProgressProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Progress bar at top of navbar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary",
          "transition-all duration-300 ease-out",
          "rounded-full",
          className
        )}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Optional percentage indicator */}
      {showPercentage && isVisible && (
        <div
          className={cn(
            "fixed top-20 right-4 z-50",
            "bg-background/80 backdrop-blur-sm border border-border/50",
            "rounded-full px-3 py-1.5 text-xs font-medium",
            "professional-shadow glass-effect",
            "transition-all duration-300",
            "animate-in fade-in slide-in-from-right-2",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="text-primary font-semibold">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </>
  );
};

// Alternative circular progress indicator
export const CircularScrollProgress = ({
  className,
}: {
  className?: string;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
      setIsVisible(scrollTop > 200);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-12 h-12 cursor-pointer",
        "transition-all duration-300 hover:scale-110",
        "animate-in fade-in slide-in-from-bottom-2",
        className
      )}
    >
      <div className="relative w-full h-full">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="stroke-border/30"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress circle */}
          <path
            className="stroke-primary transition-all duration-300 ease-out"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">
            {Math.round(scrollProgress)}
          </span>
        </div>

        {/* Glass effect background */}
        <div className="absolute inset-0 glass-effect rounded-full -z-10" />
      </div>
    </div>
  );
};
