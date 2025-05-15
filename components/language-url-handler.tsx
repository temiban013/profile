// components/language-url-handler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/contexts/language-context";

export default function LanguageUrlHandler(): null {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Get the lang parameter
    const langParam = searchParams.get("lang");

    if (!langParam) return;

    // Clean the parameter by removing quotes if they exist
    const cleanLangParam = langParam.replace(/^["']|["']$/g, "");

    if (cleanLangParam === "en" || cleanLangParam === "es") {
      // Set language from URL parameter
      setLanguage(cleanLangParam as "en" | "es");

      // Update HTML lang attribute
      document.documentElement.lang = cleanLangParam;

      // Create a new URLSearchParams object with all current parameters
      const newParams = new URLSearchParams(searchParams.toString());

      // Remove lang parameter
      newParams.delete("lang");

      // Create new URL without the lang parameter
      const newUrl =
        pathname + (newParams.toString() ? `?${newParams.toString()}` : "");

      // Use replace to avoid adding to history stack
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router, setLanguage]);

  return null;
}
