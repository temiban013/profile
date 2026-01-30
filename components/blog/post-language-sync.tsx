// components/blog/post-language-sync.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, type LanguageKey } from "@/lib/contexts/language-context";

interface PostLanguageSyncProps {
  currentLocale: LanguageKey;
  translationSlug: string | null;
}

/**
 * Syncs the user's language preference with blog post navigation.
 * When user switches language via the header, automatically navigates
 * to the translated version of the current post if available.
 */
export function PostLanguageSync({ currentLocale, translationSlug }: PostLanguageSyncProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Skip initial render to avoid redirect on page load
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // If user's preferred language differs from post locale
    // and a translation exists, navigate to it
    if (language !== currentLocale && translationSlug) {
      router.push(`/blog/${translationSlug}`);
    }
  }, [language, currentLocale, translationSlug, router]);

  return null; // This component only handles side effects
}
