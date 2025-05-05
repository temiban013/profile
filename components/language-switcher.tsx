// components/language-switcher.tsx
"use client";

import { useLanguage } from "@/lib/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage, isClient } = useLanguage();

  // If not client-side yet, render a placeholder to avoid hydration mismatch
  if (!isClient) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-none"
        disabled
      >
        <Globe className="h-5 w-5" />
        <span className="sr-only">Loading...</span>
      </Button>
    );
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
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
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {language === "en" ? "Cambiar a Español" : "Switch to English"}
      </span>
    </Button>
  );
}
