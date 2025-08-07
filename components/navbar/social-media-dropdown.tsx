// components/navbar/social-media-dropdown.tsx
"use client";

import { useState, useRef, useEffect, JSX } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2, ChevronDown } from "lucide-react";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "../icons";
import { getFormattedSocialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";

/*
  Social Media Dropdown Component
  
  This component solves the horizontal space competition problem by consolidating
  multiple social media icons into a single dropdown interface. The design follows
  several key principles:
  
  1. Progressive Disclosure: Show essential info first, reveal details on demand
  2. Space Efficiency: Use minimal horizontal space while preserving all functionality
  3. Visual Clarity: Clear visual hierarchy and interaction feedback
  4. Accessibility: Proper keyboard navigation and screen reader support
*/

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  delay: number;
}

const SocialLink = ({
  href,
  icon,
  label,
  delay,
}: SocialLinkProps): JSX.Element => {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        // Staggered entrance animation creates polished reveal effect
        "animate-in slide-in-from-top-2 fade-in duration-300",
        // Touch-friendly sizing for good mobile experience
        "flex items-center gap-3 p-3 rounded-lg",
        // Interactive feedback that feels responsive
        "hover:bg-accent/50 active:bg-accent/70",
        "transition-all duration-200 ease-out",
        // Visual hierarchy that makes scanning easy
        "border border-transparent hover:border-border/30",
        // Smooth scaling provides satisfying click feedback
        "hover:scale-[1.02] active:scale-[0.98]"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8",
          "text-muted-foreground hover:text-primary",
          "transition-colors duration-200"
        )}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </Link>
  );
};

export const SocialMediaDropdown = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const socialLinks = getFormattedSocialLinks();

  /*
    Click-outside detection for dropdown closure
    This creates intuitive interaction behavior where clicking anywhere else
    closes the dropdown, matching user expectations from other web applications
  */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Only add listener when dropdown is open for performance
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  /*
    Keyboard navigation support for accessibility
    Escape key closes dropdown, matching standard web app behavior
  */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 
        Dropdown Trigger Button
        Uses universal "share" iconography that users recognize across platforms
      */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full shadow-none transition-all duration-300",
          "hover:scale-110 hover:bg-primary/10 hover:border-primary/30",
          // Active state provides clear visual feedback
          isOpen && "bg-primary/10 border-primary/30 scale-105"
        )}
        aria-label="Social Media Links"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          {/* 
            Chevron rotation provides clear visual indication of dropdown state
            This helps users understand the interaction model immediately
          */}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </Button>

      {/* 
        Dropdown Content Panel
        Positioned to avoid viewport edge conflicts and provide smooth reveal animation
      */}
      {isOpen && (
        <div
          className={cn(
            // Absolute positioning relative to trigger button
            "absolute top-full right-0 mt-2 z-50",
            // Responsive sizing that adapts to content
            "w-56 p-2",
            // Professional visual styling with depth and clarity
            "bg-background/95 backdrop-blur-xl",
            "border border-border/50 rounded-2xl",
            "shadow-xl shadow-black/10 dark:shadow-black/20",
            // Smooth entrance animation
            "animate-in slide-in-from-top-4 fade-in duration-300"
          )}
        >
          {/* 
            Dropdown Header
            Provides context about what these links represent
          */}
          <div className="px-3 py-2 border-b border-border/30 mb-2">
            <h3 className="text-sm font-semibold text-foreground">
              Connect With Me
            </h3>
            <p className="text-xs text-muted-foreground">
              Professional & Social Profiles
            </p>
          </div>

          {/* 
            Social Media Links
            Organized with staggered animations for polished presentation
          */}
          <div className="space-y-1">
            <SocialLink
              href={socialLinks.linkedin}
              icon={<LinkedInLogo />}
              label="LinkedIn Profile"
              delay={100}
            />
            <SocialLink
              href={socialLinks.github}
              icon={<GithubLogo className="h-4 w-4" />}
              label="GitHub Projects"
              delay={150}
            />
            <SocialLink
              href={socialLinks.whatsapp}
              icon={<WhatsappLogo />}
              label="WhatsApp Contact"
              delay={200}
            />
            <SocialLink
              href={socialLinks.youtube}
              icon={<YoutubeLogo />}
              label="YouTube Channel"
              delay={250}
            />
            <SocialLink
              href={socialLinks.gmail}
              icon={<GmailLogo />}
              label="Email Contact"
              delay={300}
            />
          </div>

          {/* 
            Call-to-Action Footer
            Encourages engagement while maintaining professional tone
          */}
          <div
            className={cn(
              "mt-3 pt-2 border-t border-border/30",
              "text-center animate-in slide-in-from-bottom-2 fade-in duration-300 delay-400"
            )}
          >
            <p className="text-xs text-muted-foreground">
              Let's discuss your next project
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
