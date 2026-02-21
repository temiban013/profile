"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/contexts/language-context";

/**
 * Refreshes the blog listing page when the user switches language.
 * The blog page is a Server Component that reads the `lang` cookie at
 * request time — router.refresh() re-runs it with the updated cookie.
 */
export function BlogLanguageSync() {
  const { language } = useLanguage();
  const router = useRouter();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    router.refresh();
  }, [language, router]);

  return null;
}
