// lib/contexts/language-context.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type LanguageKey = "en" | "es";

interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageKey>("es");
  const isInitializedRef = useRef(false);

  const setLanguage = useCallback((newLanguage: LanguageKey) => {
    if (newLanguage === "en" || newLanguage === "es") {
      setLanguageState(newLanguage);
      if (isInitializedRef.current && typeof window !== "undefined") {
        localStorage.setItem("language", newLanguage);
        document.cookie = `lang=${newLanguage};path=/;max-age=31536000;SameSite=Lax`;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language") as LanguageKey;
      const resolvedLang = storedLanguage && (storedLanguage === "en" || storedLanguage === "es")
        ? storedLanguage
        : "es";

      setLanguageState(resolvedLang);
      document.cookie = `lang=${resolvedLang};path=/;max-age=31536000;SameSite=Lax`;
      isInitializedRef.current = true;
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
