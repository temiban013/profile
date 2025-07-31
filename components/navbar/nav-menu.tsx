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
}

const NavMenuItem = ({
  href,
  children,
  isActive,
  onClick,
}: NavMenuItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    onClick?.();
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        onClick={handleClick}
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
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const NavMenu = ({ className, ...props }: NavigationMenuProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS });

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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
