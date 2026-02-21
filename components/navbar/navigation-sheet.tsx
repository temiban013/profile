// components/navbar/navigation-sheet.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Menu,
  X,
  User,
  Briefcase,
  FolderOpen,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { JSX, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import {
  useActiveSection,
  scrollToSection,
} from "@/lib/hooks/use-active-section";
import { usePathname, useRouter } from "next/navigation";

interface MobileNavItemProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  description?: string;
  isActive?: boolean;
  delay: number;
  onNavigate: () => void;
  isExternal?: boolean;
}

/*
  Mobile Navigation Item Component
  
  This component demonstrates several mobile UX principles:
  1. Touch-friendly sizing (minimum 44px tap targets)
  2. Clear visual hierarchy with icons and descriptions
  3. Immediate visual feedback for interactions
  4. Context-aware navigation handling
*/
const MobileNavItem = ({
  href,
  children,
  icon,
  description,
  isActive,
  delay,
  onNavigate,
  isExternal = false,
}: MobileNavItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    // Provide immediate visual feedback by closing sheet first
    // This creates the perception of instant response while navigation processes
    setTimeout(() => onNavigate(), 150);

    // Context-aware navigation logic
    // Different href patterns require different navigation strategies
    if (href.startsWith("#")) {
      // Hash navigation - scroll to section on current page
      if (pathname !== "/") {
        // Navigate to home page first, then scroll to section
        router.push(`/${href}`);
      } else {
        // Already on home page, just scroll to section
        scrollToSection(href.substring(1));
      }
    } else if (isExternal) {
      // External link - open in new tab with security measures
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // Internal page navigation - use Next.js router
      router.push(href);
    }
  };

  return (
    <a
      href={href.startsWith("#") ? `/${href}` : href}
      onClick={handleClick}
      className={cn(
        // Staggered entrance animation creates professional polish
        "animate-in slide-in-from-right-4 fade-in duration-500",
        // Touch-friendly sizing - minimum 44px height for accessibility
        "block w-full p-5 rounded-2xl text-left group",
        // Smooth interaction feedback
        "transition-all duration-300 ease-out",
        "hover:bg-accent/50 active:scale-[0.98]",
        // Enhanced border system for clear visual definition
        "border-2 border-transparent hover:border-border/30",
        // Active state styling - clear visual indication of current location
        isActive
          ? [
              "bg-primary/15 text-primary border-primary/40",
              "shadow-lg shadow-primary/25",
            ]
          : "hover:bg-accent/20"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* 
          Icon Container - Provides consistent visual anchoring
          The icon serves as a visual memory aid and helps users scan options quickly
        */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
            // Dynamic styling based on active state
            isActive
              ? "bg-primary/25 text-primary shadow-inner"
              : [
                  "bg-muted/60 text-muted-foreground",
                  "group-hover:bg-primary/15 group-hover:text-primary",
                  "group-hover:scale-110",
                ]
          )}
        >
          {icon}
        </div>

        {/* 
          Content Area - Hierarchical text information
          Main navigation label with optional descriptive text
        */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold leading-tight mb-1">
            {children}
          </div>
          {description && (
            <div className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </div>
          )}
        </div>

        {/* Visual Indicators - Reinforce interaction and state */}
        <div className="flex items-center gap-2">
          {/* Active indicator - pulsing dot draws attention to current location */}
          {isActive && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}

          {/* Navigation arrow - indicates interactive element */}
          <ChevronRight
            className={cn(
              "h-5 w-5 transition-all duration-300",
              "text-muted-foreground group-hover:text-primary",
              "group-hover:translate-x-1"
            )}
          />
        </div>
      </div>
    </a>
  );
};

export const NavigationSheet = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = translations[language];
  const SECTION_IDS = ["about", "experience", "projects"];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });
  const pathname = usePathname();

  const handleNavigate = (): void => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className={cn(
            "relative rounded-full transition-all duration-300",
            "hover:bg-primary/15 hover:scale-110",
            "border-2 border-transparent hover:border-primary/30",
            // Enhanced visual feedback for mobile touch interfaces
            "active:scale-95 active:bg-primary/20"
          )}
          type="button"
        >
          <div className="relative">
            {/* Icon with smooth transition between states */}
            <div className="transition-transform duration-300">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>

            {/* Subtle background animation provides additional feedback */}
            <div
              className={cn(
                "absolute -inset-2 rounded-full transition-all duration-300",
                "bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20",
                isOpen ? "opacity-100 scale-110" : "opacity-0 scale-95"
              )}
            />
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        className={cn(
          // Enhanced spacing for mobile comfort
          "pt-10 px-6 w-80 sm:w-96",
          // Superior visual depth and contrast
          "bg-background/96 backdrop-blur-2xl",
          "border-l-2 border-border/50",
          // Professional shadow system
          "shadow-2xl shadow-primary/10"
        )}
        side="right"
      >
        {/* 
          Enhanced Header Section
          Combines branding with clear navigation purpose
        */}
        <div className="animate-in slide-in-from-right-4 fade-in duration-500">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Logo variant="mobile" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Portfolio</h2>
                <p className="text-sm text-muted-foreground">
                  Navigate sections
                </p>
              </div>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full transition-all duration-500",
                  "hover:rotate-90 hover:bg-destructive/15 hover:text-destructive",
                  "hover:scale-110"
                )}
                type="button"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* 
          Navigation Items - Core functionality with enhanced UX
          Each item includes contextual information to help users understand destinations
        */}
        <nav className="space-y-4">
          <MobileNavItem
            href="#about"
            icon={<User className="h-6 w-6" />}
            description="Background, skills, and expertise"
            isActive={activeSection === "about"}
            delay={200}
            onNavigate={handleNavigate}
          >
            {t.about}
          </MobileNavItem>

          <MobileNavItem
            href="#experience"
            icon={<Briefcase className="h-6 w-6" />}
            description="Professional journey and achievements"
            isActive={activeSection === "experience"}
            delay={300}
            onNavigate={handleNavigate}
          >
            {t.experience}
          </MobileNavItem>

          <MobileNavItem
            href="#projects"
            icon={<FolderOpen className="h-6 w-6" />}
            description="Portfolio of development work"
            isActive={activeSection === "projects"}
            delay={400}
            onNavigate={handleNavigate}
          >
            {t.projects}
          </MobileNavItem>

          <MobileNavItem
            href="/blog"
            icon={<BookOpen className="h-6 w-6" />}
            description="Technical insights and articles"
            isActive={pathname.startsWith("/blog")}
            delay={500}
            onNavigate={handleNavigate}
          >
            Blog
          </MobileNavItem>
        </nav>

        {/* 
          Professional Status Footer
          Communicates availability while reinforcing expertise
        */}
        <div
          className={cn(
            "absolute bottom-8 left-6 right-6",
            "animate-in slide-in-from-bottom-4 fade-in duration-500 delay-700",
            // Enhanced visual styling for professional presentation
            "glass-effect p-6 rounded-3xl text-center",
            "border-2 border-border/40 shadow-xl shadow-primary/10"
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
            <p className="text-base font-semibold text-primary">
              Available for Projects
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Nitaíno Digital
          </p>
          <p className="text-xs text-muted-foreground">
            Full-Stack AI Engineer & Agent Developer
          </p>
        </div>

        {/* Accessibility enhancements - Hidden but essential for screen readers */}
        <SheetTitle className="sr-only">Portfolio Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to different sections of Mario Rafael Ayala&apos;s software
          engineering portfolio including about, experience, projects, and blog
          sections
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
