// components/language-switcher.tsx
"use client";

import { useLanguage } from "@/lib/contexts/language-context";
import { Button } from "@/components/ui/button";
import { USFlagIcon, PRFlagIcon } from "@/components/icons";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);

    // Update HTML lang attribute (for client-side changes)
    document.documentElement.lang = newLanguage;

    // Update URL with the language parameter
    const newUrl = `${pathname}?lang=${newLanguage}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full shadow-none"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Cambiar a Español" : "Switch to English"}
      title={language === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      {language === "es" ? <PRFlagIcon /> : <USFlagIcon />}
      <span className="sr-only">
        {language === "en" ? "Cambiar a Español" : "Switch to English"}
      </span>
    </Button>
  );
}
