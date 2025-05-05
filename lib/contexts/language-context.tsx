// lib/contexts/language-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type LanguageKey = "en" | "es";

interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
  isClient: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to Spanish
  const [language, setLanguage] = useState<LanguageKey>("es");
  // Track if we're client side
  const [isClient, setIsClient] = useState(false);

  // On mount, check if the user has a language preference stored
  useEffect(() => {
    setIsClient(true);
    const storedLanguage = localStorage.getItem("language") as LanguageKey;
    if (
      storedLanguage &&
      (storedLanguage === "en" || storedLanguage === "es")
    ) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language);
    }
  }, [language, isClient]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isClient }}>
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
