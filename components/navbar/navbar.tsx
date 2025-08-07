// components/navbar/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "../icons";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SocialMediaSheet } from "./social-media-sheet";
import { ScrollProgress, CircularScrollProgress } from "./scroll-progress";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getFormattedSocialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";

const Navbar = (): JSX.Element => {
  const socialLinks = getFormattedSocialLinks();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Performance-optimized scroll detection using requestAnimationFrame
  // This technique prevents scroll handler from firing on every scroll event
  // which could cause performance issues on lower-powered devices
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
        Independent Logo Positioning System
        
        Key principle: The logo needs its own positioning context, separate from navigation layout
        This eliminates the competition for space that was causing the compression issue
      */}
      <div
        className={cn(
          "fixed z-30 transition-all duration-500 ease-out",
          // Desktop positioning - top-left with generous spacing
          "top-6 left-6",
          // Mobile positioning - slightly tighter spacing for smaller screens
          "sm:top-6 sm:left-6 top-4 left-4",
          // Enhanced backdrop when scrolled - creates better contrast against page content
          isScrolled && [
            "backdrop-blur-lg bg-background/20 rounded-2xl p-3",
            "shadow-lg shadow-primary/10",
          ]
        )}
      >
        <Logo variant="header" />
      </div>

      {/* 
        Desktop Navigation System - Mathematically Centered
        
        The mathematical centering approach uses transform: translateX(-50%) which positions
        the element's left edge at the 50% viewport mark, then shifts it back by 50% of its own width.
        This creates true centering regardless of content width.
      */}
      <nav
        className={cn(
          "fixed z-20 h-16 transition-all duration-500 ease-out",
          // Hide on mobile screens - mobile gets its own navigation system
          "hidden md:flex",
          // Mathematical centering: left-1/2 positions at 50% of viewport,
          // transform -translate-x-1/2 shifts back by 50% of element width
          "top-6 left-1/2 transform -translate-x-1/2",
          // Responsive width with maximum constraint prevents over-stretching on ultrawide monitors
          "w-auto max-w-5xl min-w-fit",
          // Visual styling that enhances without overwhelming
          "rounded-full border dark:border-slate-700/70",
          // Dynamic background effects based on scroll state
          // Scroll state creates better contrast and draws attention to navigation
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
        <div className="h-full flex items-center justify-center px-8">
          {/* 
            Navigation Menu - Centered within its container
            This creates a nested centering system: 
            1. The nav element is centered in the viewport
            2. The menu content is centered within the nav element
          */}
          <div className="flex items-center justify-center">
            <NavMenu className="mx-auto" />
          </div>

          {/* 
            Social Actions - Absolutely positioned to avoid affecting center alignment
            
            Using absolute positioning removes these elements from the normal document flow,
            which means they don't affect the mathematical centering of the main navigation
          */}
          <div className="absolute right-6 flex items-center gap-2">
            <LanguageSwitcher />

            {/* 
              Social Media Links - Only visible on large screens to prevent overcrowding
              This follows the progressive disclosure principle - show more options as screen space allows
            */}
            <div className="hidden lg:flex items-center gap-1">
              <Button
                variant="outline"
                className={cn(
                  "rounded-full shadow-none transition-all duration-300",
                  "hover:scale-110 hover:bg-primary/10 hover:border-primary/30"
                )}
                size="icon"
              >
                <Link
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact on WhatsApp"
                >
                  <WhatsappLogo />
                </Link>
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "rounded-full shadow-none transition-all duration-300",
                  "hover:scale-110 hover:bg-primary/10 hover:border-primary/30"
                )}
                size="icon"
              >
                <Link
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                >
                  <YoutubeLogo />
                </Link>
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "rounded-full shadow-none transition-all duration-300",
                  "hover:scale-110 hover:bg-primary/10 hover:border-primary/30"
                )}
                size="icon"
              >
                <Link href={socialLinks.gmail} aria-label="Send Email">
                  <GmailLogo />
                </Link>
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "rounded-full shadow-none transition-all duration-300",
                  "hover:scale-110 hover:bg-primary/10 hover:border-primary/30"
                )}
                size="icon"
              >
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInLogo />
                </Link>
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "rounded-full shadow-none transition-all duration-300",
                  "hover:scale-110 hover:bg-primary/10 hover:border-primary/30"
                )}
                size="icon"
              >
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <GithubLogo className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar - Visual feedback for page position */}
        <ScrollProgress />
      </nav>

      {/* 
        Mobile Navigation System - Completely Separate Architecture
        
        Key principle: Mobile users have different needs and interaction patterns
        Rather than trying to adapt desktop navigation, we create a mobile-native experience
      */}
      <nav
        className={cn(
          "fixed z-20 h-14 transition-all duration-300",
          // Only visible on mobile screens - desktop gets its own navigation
          "md:hidden",
          // Mobile positioning - right-aligned to avoid logo conflict
          "top-4 right-4 left-24", // left-24 provides space for the visible logo
          // Mobile-appropriate visual styling
          "rounded-full border dark:border-slate-700/70",
          // Simplified background effects for mobile performance
          isScrolled
            ? "bg-background/90 backdrop-blur-xl professional-shadow-lg"
            : "bg-background/95 border-border/50"
        )}
      >
        <div className="h-full flex items-center justify-end px-3 gap-2">
          <LanguageSwitcher />

          {/* Mobile-specific interaction buttons */}
          <SocialMediaSheet />
          <NavigationSheet />
        </div>
      </nav>

      {/* Circular Scroll Progress - Bottom Right positioning avoids all navigation elements */}
      <CircularScrollProgress />
    </>
  );
};

export default Navbar;
