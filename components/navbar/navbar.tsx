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
        Mobile Navigation - Logo + Sheet controls in one bar
        Used on small screens with sheet-based navigation
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-300",
          "md:hidden", // Only on mobile
          "top-4 left-2 right-2 sm:left-4 sm:right-4",
          "rounded-full border dark:border-slate-700/70 overflow-hidden",
          isScrolled
            ? ["bg-background/90 backdrop-blur-xl professional-shadow-lg border-primary/30 shadow-xl shadow-primary/20"]
            : ["bg-background/95 backdrop-blur-lg border-border/50 professional-shadow"]
        )}
      >
        <div className="h-full flex items-center justify-between px-2 sm:px-4">
          <Logo variant="mobile" />
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            <SocialMediaSheet />
            <NavigationSheet />
          </div>
        </div>
      </nav>

      {/*
        Desktop Unified Navigation - Logo + Menu items + actions in one bar
        Used on all md+ screens
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-300",
          "hidden md:flex",
          "top-6 left-6 right-6",
          "rounded-full border dark:border-slate-700/70",
          isScrolled
            ? ["bg-background/90 backdrop-blur-xl professional-shadow-lg border-primary/30 shadow-xl shadow-primary/20"]
            : ["bg-background/95 backdrop-blur-lg border-border/50 professional-shadow"]
        )}
      >
        <div className="h-full w-full flex items-center justify-between px-6">
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
