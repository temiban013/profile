// components/navbar/navbar.tsx - Mobile Responsive Version
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

  // Add scroll effect for navbar background
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Independent Logo positioned at top-left */}
      <div
        className={cn(
          "fixed z-20 transition-all duration-300",
          // Desktop positioning
          "top-6 left-6",
          // Mobile positioning - smaller and adjusted
          "sm:top-6 sm:left-6 top-4 left-4",
          // Add backdrop blur when scrolled for better visibility
          isScrolled && "backdrop-blur-sm"
        )}
      >
        <div className="transform sm:scale-100 scale-90">
          <Logo />
        </div>
      </div>

      {/* Main Navigation - responsive positioning */}
      <nav
        className={cn(
          "fixed z-10 h-14 transition-all duration-300",
          // Desktop positioning - top-right with proper spacing
          "sm:top-6 sm:right-4 sm:left-auto",
          // Mobile positioning - centered but avoid logo
          "top-4 right-4 left-20", // left-20 provides space for logo
          "rounded-full",
          "border dark:border-slate-700/70",
          // Dynamic background based on scroll
          isScrolled
            ? "bg-background/80 backdrop-blur-xl professional-shadow-lg"
            : "bg-background border"
        )}
      >
        <div className="h-full flex items-center justify-between mx-auto px-3">
          {/* Desktop Menu - now has more space */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />

            {/* Social Media Links - Desktop only to preserve space */}
            <Button
              variant="outline"
              className="hidden lg:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden lg:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden lg:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
              size="icon"
            >
              <Link href={socialLinks.gmail} aria-label="Send Email">
                <GmailLogo />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="hidden lg:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden lg:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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

            {/* Mobile Menus - adjusted for better spacing */}
            <div className="lg:hidden">
              <SocialMediaSheet />
            </div>
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <ScrollProgress />
      </nav>

      {/* Circular Scroll Progress (Bottom Right) */}
      <CircularScrollProgress />
    </>
  );
};

export default Navbar;
