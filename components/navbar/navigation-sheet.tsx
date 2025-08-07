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
import { Menu, X } from "lucide-react";
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
  isActive?: boolean;
  delay: number;
  onNavigate: () => void;
  isExternal?: boolean;
}

const MobileNavItem = ({
  href,
  children,
  isActive,
  delay,
  onNavigate,
  isExternal = false,
}: MobileNavItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (): void => {
    // Close the sheet first
    onNavigate();

    // Handle navigation based on context
    if (href.startsWith("#")) {
      // Hash navigation - scroll to section
      if (pathname !== "/") {
        // If not on home page, navigate to home first, then scroll
        router.push(`/${href}`);
      } else {
        // Already on home page, just scroll
        scrollToSection(href.substring(1));
      }
    } else if (isExternal) {
      // External link
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // Internal page navigation
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "animate-in slide-in-from-right-4 fade-in duration-300",
        "w-full p-4 rounded-xl text-left",
        "transition-all duration-200",
        "hover:bg-accent/50 hover:scale-[1.02]",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "hover:bg-accent/30"
      )}
      style={{ animationDelay: `${delay}ms` }}
      type="button"
    >
      <div className="flex items-center gap-3">
        <div className="text-base font-medium">{children}</div>
      </div>
    </button>
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
        <Button variant="ghost" size="icon" className="relative" type="button">
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
                type="button"
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

          {/* Blog Navigation Item - NEW */}
          <MobileNavItem
            href="/blog"
            isActive={pathname.startsWith("/blog")}
            delay={500}
            onNavigate={handleNavigate}
          >
            Blog
          </MobileNavItem>
        </nav>

        {/* Footer info */}
        <div
          className={cn(
            "absolute bottom-6 left-6 right-6",
            "animate-in slide-in-from-bottom-4 fade-in duration-300 delay-600",
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
