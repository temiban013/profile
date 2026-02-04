import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Mario/i);
  });

  test("services page loads correctly", async ({ page }) => {
    await page.goto("/servicios");
    await expect(page.locator("h1")).toBeVisible();
    // Check CTA form is present
    await expect(page.locator("form")).toBeVisible();
  });

  test("blog page loads correctly", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toBeVisible();
    // Check blog posts are listed
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("resume page loads correctly", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigation between pages works", async ({ page }) => {
    await page.goto("/");

    // Navigate to blog via nav
    const blogLink = page.locator('nav a[href="/blog"]');
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await expect(page).toHaveURL(/\/blog/);
    }
  });
});
