import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  LanguageProvider,
  useLanguage,
  type LanguageKey,
} from "@/lib/contexts/language-context";

function Consumer() {
  const { language } = useLanguage();
  return <span data-testid="language">{language}</span>;
}

function renderProvider(initialLanguage: LanguageKey) {
  return render(
    <LanguageProvider initialLanguage={initialLanguage}>
      <Consumer />
    </LanguageProvider>
  );
}

function readLangCookie() {
  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
  return match ? match[1] : null;
}

describe("LanguageProvider initial language", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "lang=;path=/;max-age=0";
    document.documentElement.removeAttribute("lang");
  });

  it("keeps the server-resolved language when localStorage is empty", () => {
    document.documentElement.lang = "en";

    renderProvider("en");

    expect(screen.getByTestId("language").textContent).toBe("en");
    expect(localStorage.getItem("language")).toBe("en");
    expect(readLangCookie()).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("lets a stored language win over the server-resolved one and updates <html lang>", () => {
    localStorage.setItem("language", "en");
    document.documentElement.lang = "es";

    renderProvider("es");

    expect(screen.getByTestId("language").textContent).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("language")).toBe("en");
    expect(readLangCookie()).toBe("en");
  });

  it("stays on the default es when nothing is stored", () => {
    document.documentElement.lang = "es";

    renderProvider("es");

    expect(screen.getByTestId("language").textContent).toBe("es");
    expect(localStorage.getItem("language")).toBe("es");
    expect(readLangCookie()).toBe("es");
    expect(document.documentElement.lang).toBe("es");
  });

  it("ignores an invalid stored value and falls back to the server-resolved language", () => {
    localStorage.setItem("language", "fr");

    renderProvider("en");

    expect(screen.getByTestId("language").textContent).toBe("en");
    expect(localStorage.getItem("language")).toBe("en");
    expect(readLangCookie()).toBe("en");
  });
});
