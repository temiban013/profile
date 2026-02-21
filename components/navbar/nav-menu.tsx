// components/navbar/nav-menu.tsx
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
import { usePathname, useRouter } from "next/navigation";
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
 * Smart Navigation Component
 *
 * This component implements a hybrid navigation pattern that elegantly handles
 * both single-page section scrolling and multi-page routing. The key insight
 * is that we need to detect the current page context and route accordingly:
 *
 * 1. If we're on the home page (/): Use smooth scrolling to sections
 * 2. If we're on another page (/blog): Navigate to home page with hash fragment
 * 3. If navigating to /blog: Use standard Next.js routing
 */
const NavMenuItem = ({
  href,
  children,
  isActive,
  onClick,
  isExternal = false,
}: NavMenuItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    onClick?.();

    // Handle external links (like /blog) with standard Next.js navigation
    if (isExternal) {
      return; // Let the Link component handle this
    }

    // For internal sections, we need smart routing logic
    e.preventDefault();
    const sectionId = href.replace("#", "");

    if (pathname === "/") {
      // We're on the home page - use smooth scrolling
      scrollToSection(sectionId);
    } else {
      // We're on a different page - navigate to home page with hash
      router.push(`/${href}`);

      // After navigation completes, scroll to the section
      // We use a small delay to ensure the page has loaded
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
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
      <NavigationMenuLink asChild>
        {isExternal ? (
          <Link href={href}>{linkContent}</Link>
        ) : (
          <a
            href={`/${href}`}
            onClick={handleClick}
          >
            {linkContent}
          </a>
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

  // Intelligent active state detection
  const isOnBlogPage = pathname.startsWith("/blog");
  const isOnHomePage = pathname === "/";

  return (
    <NavigationMenu
      className={cn("data-[orientation=vertical]:items-start", className)}
      {...props}
    >
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavMenuItem
          href="#about"
          isActive={isOnHomePage && activeSection === "about"}
        >
          {t.about}
        </NavMenuItem>
        <NavMenuItem
          href="#experience"
          isActive={isOnHomePage && activeSection === "experience"}
        >
          {t.experience}
        </NavMenuItem>
        <NavMenuItem
          href="#projects"
          isActive={isOnHomePage && activeSection === "projects"}
        >
          {t.projects}
        </NavMenuItem>
        <NavMenuItem href="/blog" isActive={isOnBlogPage} isExternal={true}>
          {t.blog || "Blog"}
        </NavMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
