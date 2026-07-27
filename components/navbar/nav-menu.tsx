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

const SECTION_IDS = ["inicio", "fundador", "experiencia", "casos-de-estudio"];

interface NavMenuItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Smart Navigation Component
 *
 * Every item renders the exact same element (a next/link anchor styled by
 * NavigationMenuLink) so hover/focus/active states are identical across
 * section links and page links. Hash hrefs get smart routing:
 *
 * 1. On the home page (/): smooth-scroll to the section (works on repeat clicks)
 * 2. On another page: navigate home, then scroll to the section
 * 3. Page hrefs (/servicios, /blog): standard Next.js navigation
 */
const NavMenuItem = ({ href, children, isActive, onClick }: NavMenuItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHash = href.startsWith("#");

  const handleClick = (e: React.MouseEvent) => {
    onClick?.();

    if (!isHash) {
      return; // Standard Next.js navigation for page links
    }

    e.preventDefault();
    const sectionId = href.slice(1);

    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      // Navigate hash-less (keeps the URL clean) — scrollToSection retries
      // internally until the lazily-mounted section exists.
      router.push("/");
      scrollToSection(sectionId);
    }
  };

  return (
    <NavigationMenuItem>
      {/* Active styling is applied ONLY via the className below (single source):
          no Radix `active` prop (its data-active bg would stack on ours) and
          lingering mouse-focus is neutralized so a clicked item looks the same
          as one activated by navigation. Keyboard focus-visible ring remains. */}
      <NavigationMenuLink asChild>
        <Link
          href={isHash ? `/${href}` : href}
          onClick={handleClick}
          className={cn(
            "relative cursor-pointer whitespace-nowrap transition-all duration-300",
            "focus:bg-transparent focus:text-inherit",
            isActive && [
              "bg-primary/10 text-primary professional-shadow",
              "focus:bg-primary/10 focus:text-primary",
            ]
          )}
        >
          {children}
          {/* Active indicator dot */}
          {isActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-glow" />
          )}
        </Link>
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
      className={cn("max-w-none data-[orientation=vertical]:items-start", className)}
      {...props}
    >
      <NavigationMenuList className="w-full justify-evenly space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavMenuItem
          href="#fundador"
          isActive={isOnHomePage && activeSection === "fundador"}
        >
          {t.about}
        </NavMenuItem>
        <NavMenuItem
          href="#experiencia"
          isActive={isOnHomePage && activeSection === "experiencia"}
        >
          {t.experience}
        </NavMenuItem>
        <NavMenuItem
          href="#casos-de-estudio"
          isActive={isOnHomePage && activeSection === "casos-de-estudio"}
        >
          {t.projects}
        </NavMenuItem>
        <NavMenuItem
          href="/servicios"
          isActive={pathname.startsWith("/servicios") || pathname.startsWith("/services")}
        >
          {t.services}
        </NavMenuItem>
        <NavMenuItem href="/blog" isActive={isOnBlogPage}>
          {t.blog || "Blog"}
        </NavMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
