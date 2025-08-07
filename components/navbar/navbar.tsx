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
        Independent Logo Positioning
        Maintains brand visibility without competing for navigation space
      */}
      <div
        className={cn(
          "fixed z-30 transition-all duration-500 ease-out",
          "top-6 left-6",
          "sm:top-6 sm:left-6 top-4 left-4",
          isScrolled && [
            "backdrop-blur-lg bg-background/20 rounded-2xl p-3",
            "shadow-lg shadow-primary/10",
          ]
        )}
      >
        <Logo variant="header" />
      </div>

      {/* 
        Desktop Navigation System with Optimized Space Usage
        
        Key improvement: The social media dropdown replaces multiple individual icons,
        freeing horizontal space for navigation menu items to display properly
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-500 ease-out",
          "hidden md:flex",
          "top-6 left-1/2 transform -translate-x-1/2",
          // Increased max-width to accommodate navigation items properly
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
          {/* 
            Navigation Menu - Now has adequate space to display all items
            The removal of individual social media icons eliminates horizontal competition
          */}
          <div className="flex items-center justify-center whitespace-nowrap">
            <NavMenu className="mx-auto" />
          </div>

          {/* 
            Compact Actions Panel
            
            Strategic space optimization: Instead of 5 individual social media buttons
            taking up ~250px of space, we now use just ~150px for essential controls:
            - Language switcher (essential for bilingual portfolio)
            - Social media dropdown (space-efficient access to all platforms)
          */}
          <div className="right-4 flex items-center gap-3">
            <LanguageSwitcher />

            {/* 
              Social Media Dropdown - Replaces 5 individual icons with 1 compact dropdown
              This is the key innovation that solves the space competition problem
            */}
            <SocialMediaDropdown />
          </div>
        </div>

        <ScrollProgress />
      </nav>

      {/* 
        Mobile Navigation System
        Maintains separate, touch-optimized experience for mobile devices
      */}
      <nav
        className={cn(
          "fixed z-20 h-14 transition-all duration-300",
          "md:hidden", // Only visible on mobile
          "top-4 right-4 left-24", // Provides space for visible logo
          "rounded-full border dark:border-slate-700/70",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl professional-shadow-lg"
            : "bg-background/95 border-border/50"
        )}
      >
        <div className="h-full flex items-center justify-end px-3 gap-2">
          <LanguageSwitcher />

          {/* 
            Mobile uses sheet-based interactions for optimal touch experience
            Social media sheet provides full-screen access to social platforms
            Navigation sheet provides full-screen access to portfolio sections
          */}
          <SocialMediaSheet />
          <NavigationSheet />
        </div>
      </nav>

      <CircularScrollProgress />
    </>
  );
};

export default Navbar;
