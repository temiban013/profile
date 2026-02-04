import { describe, it, expect } from "vitest";
import { cn, formatDate } from "../utils";

describe("cn (className utility)", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
  });

  it("handles false/undefined conditions", () => {
    const isActive = false;
    expect(cn("base", isActive && "active")).toBe("base");
  });

  it("merges Tailwind classes correctly (last wins)", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles arrays of classes", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("handles objects for conditional classes", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });
});

describe("formatDate", () => {
  // Create dates with explicit time to avoid timezone issues
  // Using noon UTC ensures the date won't shift to previous/next day in any timezone
  const createDate = (year: number, month: number, day: number) =>
    new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  it("formats date in English (default)", () => {
    const testDate = createDate(2024, 3, 15);
    const result = formatDate(testDate);
    expect(result).toBe("March 15, 2024");
  });

  it("formats date in English explicitly", () => {
    const testDate = createDate(2024, 3, 15);
    const result = formatDate(testDate, "en-US");
    expect(result).toBe("March 15, 2024");
  });

  it("formats date in Spanish", () => {
    const testDate = createDate(2024, 3, 15);
    const result = formatDate(testDate, "es-ES");
    // Spanish format: "15 de marzo de 2024"
    expect(result).toMatch(/15.*marzo.*2024/i);
  });

  it("handles different dates correctly", () => {
    const date = createDate(2023, 12, 25);
    expect(formatDate(date)).toBe("December 25, 2023");
  });

  it("handles first day of month", () => {
    const date = createDate(2024, 1, 1);
    expect(formatDate(date)).toBe("January 1, 2024");
  });

  it("handles last day of month", () => {
    const date = createDate(2024, 2, 29); // Leap year
    expect(formatDate(date)).toBe("February 29, 2024");
  });
});
