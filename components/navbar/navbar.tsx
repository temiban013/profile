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
import { useEffect, useState } from "react";

const Navbar = () => {
  const socialLinks = getFormattedSocialLinks();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={cn(
          "fixed z-10 top-6 inset-x-4 h-14 transition-all duration-300",
          "max-w-screen-md mx-auto rounded-full",
          "border dark:border-slate-700/70",
          // Dynamic background based on scroll
          isScrolled
            ? "bg-background/80 backdrop-blur-xl professional-shadow-lg"
            : "bg-background border"
        )}
      >
        <div className="h-full flex items-center justify-between mx-auto px-3">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Social Media Links - Desktop */}
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden sm:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden sm:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
              size="icon"
            >
              <Link href={socialLinks.gmail} aria-label="Send Email">
                <GmailLogo />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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
              className="hidden sm:inline-flex rounded-full shadow-none hover:scale-110 transition-transform duration-300"
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

            {/* Mobile Menus */}
            <div className="sm:hidden">
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
