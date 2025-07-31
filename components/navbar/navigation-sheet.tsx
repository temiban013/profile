// components/navbar/navigation-sheet.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "./logo";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import {
  useActiveSection,
  scrollToSection,
} from "@/lib/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SECTION_IDS = ["hero", "about", "experience", "projects"];

interface MobileNavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  delay?: number;
  onNavigate: () => void;
}

const MobileNavItem = ({
  href,
  children,
  isActive,
  delay = 0,
  onNavigate,
}: MobileNavItemProps) => {
  const handleClick = () => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    onNavigate(); // Close the sheet
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full group flex items-center justify-between p-4 rounded-2xl",
        "text-left transition-all duration-300 hover:scale-[1.02]",
        "border border-transparent hover:border-border/50",
        "animate-in slide-in-from-left-4 fade-in",
        // Active state
        isActive && [
          "bg-primary/10 border-primary/20 text-primary",
          "professional-shadow",
        ],
        !isActive && [
          "hover:bg-accent/50 hover:text-accent-foreground",
          "glass-effect",
        ]
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "400ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex flex-col">
        <span
          className={cn(
            "font-medium text-base transition-colors",
            isActive ? "text-primary" : "text-foreground"
          )}
        >
          {children}
        </span>
        {isActive && (
          <span className="text-xs text-primary/70 mt-1">Current section</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isActive && (
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        )}
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            "group-hover:translate-x-1",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        />
      </div>
    </button>
  );
};

export const NavigationSheet = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full transition-all duration-300",
            "hover:scale-110 hover:rotate-90",
            "professional-shadow hover:professional-shadow-lg",
            isOpen && "rotate-90"
          )}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </SheetTrigger>

      <SheetContent
        className={cn(
          "pt-6 px-6 w-80 sm:w-96",
          "bg-background/95 backdrop-blur-xl",
          "border-l border-border/50"
        )}
        side="right"
      >
        {/* Header */}
        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:rotate-90 transition-transform duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-3">
          <div className="animate-in slide-in-from-right-4 fade-in duration-300 delay-100">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 px-4">
              Navigation
            </h3>
          </div>

          <MobileNavItem
            href="#about"
            isActive={activeSection === "about"}
            delay={200}
            onNavigate={handleNavigate}
          >
            {t.about}
          </MobileNavItem>

          <MobileNavItem
            href="#experience"
            isActive={activeSection === "experience"}
            delay={300}
            onNavigate={handleNavigate}
          >
            {t.experience}
          </MobileNavItem>

          <MobileNavItem
            href="#projects"
            isActive={activeSection === "projects"}
            delay={400}
            onNavigate={handleNavigate}
          >
            {t.projects}
          </MobileNavItem>
        </nav>

        {/* Footer info */}
        <div
          className={cn(
            "absolute bottom-6 left-6 right-6",
            "animate-in slide-in-from-bottom-4 fade-in duration-300 delay-500",
            "glass-effect p-4 rounded-2xl text-center"
          )}
        >
          <p className="text-xs text-muted-foreground">25+ Years Experience</p>
          <p className="text-sm font-medium text-primary mt-1">
            Software Engineer
          </p>
        </div>

        {/* Hidden accessibility content */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to different sections of the portfolio
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
