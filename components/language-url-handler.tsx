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
    const langParam = searchParams.get("lang");

    if (langParam && (langParam === "en" || langParam === "es")) {
      // Set language from URL parameter
      setLanguage(langParam as "en" | "es");

      // Remove lang parameter from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("lang");

      // Create new URL without the lang parameter
      const newUrl =
        pathname + (params.toString() ? `?${params.toString()}` : "");

      // Use replace to avoid adding to history stack
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router, setLanguage]);

  // This component doesn't render anything
  return null;
}
