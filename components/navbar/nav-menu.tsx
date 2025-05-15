"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

export const NavMenu = ({ className, ...props }: NavigationMenuProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <NavigationMenu
      className={cn("data-[orientation=vertical]:items-start", className)}
      {...props}
    >
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#about">{t.about}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#experience">{t.experience}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#projects">{t.projects}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
