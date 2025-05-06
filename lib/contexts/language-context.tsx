// lib/contexts/language-context.tsx
"use client";

import {
  createContext,
  useContext,
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
  // Default to Spanish without causing hydration mismatch
  const [language, setLanguage] = useState<LanguageKey>("es");
  // Track whether we've initialized from localStorage
  const [isInitialized, setIsInitialized] = useState(false);

  // On mount, check if the user has a language preference stored
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as LanguageKey;
    if (
      storedLanguage &&
      (storedLanguage === "en" || storedLanguage === "es")
    ) {
      setLanguage(storedLanguage);
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage when language changes, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("language", language);
    }
  }, [language, isInitialized]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
