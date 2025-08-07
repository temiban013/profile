// components/navbar/nav-menu.tsx (replace the existing file)
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  useActiveSection,
  scrollToSection,
} from "@/lib/hooks/use-active-section";

const SECTION_IDS = ["hero", "about", "experience", "projects"];

interface NavMenuItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isExternal?: boolean;
}

/**
 * Enhanced NavMenuItem Component
 *
 * This component intelligently handles two types of navigation:
 * 1. Internal section scrolling (for portfolio sections like #about)
 * 2. External page navigation (for pages like /blog)
 *
 * The key insight is that we need different behaviors:
 * - For sections: prevent default, use custom smooth scrolling
 * - For pages: let Next.js handle the navigation naturally
 */
const NavMenuItem = ({
  href,
  children,
  isActive,
  onClick,
  isExternal = false,
}: NavMenuItemProps) => {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (isExternal) {
      onClick?.();
      return;
    }
    e.preventDefault();
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    onClick?.();
  };

  const linkContent = (
    <span
      className={cn(
        "cursor-pointer transition-all duration-300 relative",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
        "flex flex-col gap-1 rounded-full py-2 px-4 text-sm",
        "focus-visible:ring-4 focus-visible:outline-1",
        // Active state styling
        isActive && [
          "bg-primary/10 text-primary",
          "professional-shadow",
          "before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5",
          "before:bg-gradient-to-r before:from-primary before:to-accent",
          "before:transition-all before:duration-300",
          "before:-translate-x-1/2",
          "before:w-3/4",
        ]
      )}
    >
      {children}
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-glow" />
      )}
    </span>
  );

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild={isExternal}>
        {isExternal ? (
          <Link href={href} onClick={onClick}>
            {linkContent}
          </Link>
        ) : (
          <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(e);
              }
            }}
          >
            {linkContent}
          </div>
        )}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const NavMenu = ({ className, ...props }: NavigationMenuProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });
  const pathname = usePathname();

  // Determine if we're currently on a blog page for active state
  const isOnBlogPage = pathname.startsWith("/blog");

  return (
    <NavigationMenu
      className={cn("data-[orientation=vertical]:items-start", className)}
      {...props}
    >
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavMenuItem href="#about" isActive={activeSection === "about"}>
          {t.about}
        </NavMenuItem>
        <NavMenuItem
          href="#experience"
          isActive={activeSection === "experience"}
        >
          {t.experience}
        </NavMenuItem>
        <NavMenuItem href="#projects" isActive={activeSection === "projects"}>
          {t.projects}
        </NavMenuItem>
        {/* Blog navigation item with external navigation */}
        <NavMenuItem href="/blog" isActive={isOnBlogPage} isExternal={true}>
          {t.blog}
        </NavMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
