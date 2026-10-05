import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date for display in blog posts
 * Uses Intl.DateTimeFormat for proper localization support.
 * Formats in UTC: frontmatter dates are calendar dates parsed as UTC midnight,
 * so the server's time zone must not shift them to the previous day.
 */
export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
