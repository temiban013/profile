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
  // Default to Spanish, but prevent hydration mismatch with useState
  const [language, setLanguageState] = useState<LanguageKey>("es");
  const [isInitialized, setIsInitialized] = useState(false);

  const setLanguage = (newLanguage: LanguageKey) => {
    setLanguageState(newLanguage);
    if (isInitialized) {
      localStorage.setItem("language", newLanguage);
    }
  };

  // Effect to handle initialization from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as LanguageKey;
    if (
      storedLanguage &&
      (storedLanguage === "en" || storedLanguage === "es")
    ) {
      setLanguageState(storedLanguage);
    }
    setIsInitialized(true);
  }, []);

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
