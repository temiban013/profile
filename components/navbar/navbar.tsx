// components/navbar/navbar.tsx
"use client";

import { JSX, useEffect, useState } from "react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SocialMediaSheet } from "./social-media-sheet";
import { SocialMediaDropdown } from "./social-media-dropdown";
import { ScrollProgress, CircularScrollProgress } from "./scroll-progress";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

const Navbar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Performance-optimized scroll detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 
        Logo - Only shown when there's enough space (large screens)
        Hidden on smaller screens where it merges with navbar
      */}
      <div
        className={cn(
          "fixed z-30 hidden xl:block", // Only show on extra large screens
          "top-6 left-6"
        )}
      >
        <Logo 
          variant="header" 
          className={cn(
            isScrolled && [
              "bg-background/90 backdrop-blur-xl",
              "professional-shadow-lg border-primary/30",
              "shadow-xl shadow-primary/20"
            ]
          )}
        />
      </div>

      {/* 
        Desktop Navigation System - Centered navbar for large screens only
        When logo and navbar can coexist separately
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-500 ease-out",
          "hidden xl:flex", // Only show on xl+ screens where there's room for separate logo
          "top-6 left-1/2 transform -translate-x-1/2",
          "w-auto max-w-4xl min-w-fit",
          "rounded-full border dark:border-slate-700/70",
          isScrolled
            ? [
                "bg-background/90 backdrop-blur-xl",
                "professional-shadow-lg border-primary/30",
                "shadow-xl shadow-primary/20",
              ]
            : [
                "bg-background/95 backdrop-blur-lg",
                "border-border/50 professional-shadow",
              ]
        )}
      >
        <div className="h-full flex items-center justify-center px-6">
          <div className="flex items-center justify-center whitespace-nowrap">
            <NavMenu className="mx-auto" />
          </div>
          <div className="right-4 flex items-center gap-3">
            <LanguageSwitcher />
            <SocialMediaDropdown />
          </div>
        </div>
        <ScrollProgress />
      </nav>

      {/* 
        Mobile Navigation - Logo + Sheet controls in one bar
        Used on small screens with sheet-based navigation
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-300",
          "md:hidden", // Only on mobile
          "top-4 left-4 right-4",
          "rounded-full border dark:border-slate-700/70",
          isScrolled
            ? ["bg-background/90 backdrop-blur-xl professional-shadow-lg border-primary/30 shadow-xl shadow-primary/20"]
            : ["bg-background/95 backdrop-blur-lg border-border/50 professional-shadow"]
        )}
      >
        <div className="h-full flex items-center justify-between px-4">
          <Logo variant="mobile" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <SocialMediaSheet />
            <NavigationSheet />
          </div>
        </div>
      </nav>

      {/* 
        Medium/Large Screen Unified Navigation - Logo + Menu items in one bar
        Used when screen isn't wide enough for separate logo and navbar
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-300",
          "hidden md:flex xl:hidden", // Show on md/lg, hide on xl+ where they're separate
          "top-6 left-6 right-6",
          "rounded-full border dark:border-slate-700/70",
          isScrolled
            ? ["bg-background/90 backdrop-blur-xl professional-shadow-lg border-primary/30 shadow-xl shadow-primary/20"]
            : ["bg-background/95 backdrop-blur-lg border-border/50 professional-shadow"]
        )}
      >
        <div className="h-full flex items-center justify-between px-6">
          <Logo variant="mobile" />
          <div className="flex-1 flex items-center justify-center">
            <NavMenu className="mx-4" />
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <SocialMediaDropdown />
          </div>
        </div>
        <ScrollProgress />
      </nav>

      <CircularScrollProgress />
    </>
  );
};

export default Navbar;
