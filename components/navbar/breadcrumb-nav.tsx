// components/navbar/breadcrumb-nav.tsx
"use client";

import { useActiveSection } from "@/lib/hooks/use-active-section";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

const SECTION_IDS = ["hero", "about", "experience", "projects"];

interface BreadcrumbItem {
  id: string;
  label: string;
  isActive: boolean;
}

export const BreadcrumbNav = ({ className }: { className?: string }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      id: "home",
      label: "Portfolio",
      isActive: activeSection === "hero" || activeSection === "",
    },
    {
      id: "about",
      label: t.about,
      isActive: activeSection === "about",
    },
    {
      id: "experience",
      label: t.experience,
      isActive: activeSection === "experience",
    },
    {
      id: "projects",
      label: t.projects,
      isActive: activeSection === "projects",
    },
  ];

  const currentItemIndex = breadcrumbItems.findIndex((item) => item.isActive);
  const visibleItems =
    currentItemIndex >= 0
      ? breadcrumbItems.slice(0, currentItemIndex + 1)
      : [breadcrumbItems[0]]; // Show only home if no active section

  if (visibleItems.length <= 1) return null; // Don't show breadcrumbs on hero section

  return (
    <nav
      className={cn(
        "fixed top-24 left-4 right-4 z-40",
        "max-w-screen-md mx-auto",
        "animate-in fade-in slide-in-from-top-2 duration-300",
        className
      )}
      aria-label="Breadcrumb navigation"
    >
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-2",
          "bg-background/80 backdrop-blur-sm border border-border/50",
          "rounded-full professional-shadow",
          "text-sm font-medium"
        )}
      >
        <Home className="h-3 w-3 text-muted-foreground" />

        {visibleItems.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}

            <span
              className={cn(
                "transition-colors duration-200",
                item.isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {index === 0 ? (
                <span className="flex items-center gap-1">{item.label}</span>
              ) : (
                item.label
              )}
            </span>

            {item.isActive && (
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse-glow ml-1" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

// Alternative mini breadcrumb for space-constrained layouts
export const MiniBreadcrumb = ({ className }: { className?: string }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });

  const getSectionLabel = (section: string): string => {
    switch (section) {
      case "about":
        return t.about;
      case "experience":
        return t.experience;
      case "projects":
        return t.projects;
      case "hero":
      default:
        return "Portfolio";
    }
  };

  const sectionLabel = getSectionLabel(activeSection);

  if (!activeSection || activeSection === "hero") return null;

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-40",
        "animate-in fade-in slide-in-from-right-2 duration-300",
        className
      )}
    >
      <div
        className={cn(
          "px-3 py-1.5 text-xs font-medium",
          "bg-primary/10 border border-primary/20 text-primary",
          "rounded-full professional-shadow glass-effect",
          "backdrop-blur-sm"
        )}
      >
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
          {sectionLabel}
        </span>
      </div>
    </div>
  );
};
