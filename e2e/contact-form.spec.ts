import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/servicios");
  });

  test("form is visible and has required fields", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Check all required fields are present
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#phone")).toBeVisible();
    await expect(page.locator("#businessType")).toBeVisible();
    await expect(page.locator("#goals")).toBeVisible();
  });

  test("shows validation errors for empty form submission", async ({
    page,
  }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();

    // Wait for validation errors to appear
    await expect(page.locator("text=El nombre debe tener")).toBeVisible({
      timeout: 5000,
    });
  });

  test("validates email format", async ({ page }) => {
    // Fill name first to get past that validation
    await page.fill("#name", "Test User");

    // Fill invalid email
    await page.fill("#email", "not-an-email");
    await page.fill("#phone", "7871234567");
    await page.selectOption("#businessType", "restaurant");
    await page.locator('input[value="no"]').click();
    await page.fill("#goals", "This is my test goal for the form");

    // Submit
    await page.locator('button[type="submit"]').click();

    // Check for email validation error
    await expect(page.locator("text=Email inválido")).toBeVisible({
      timeout: 5000,
    });
  });

  test("allows valid form submission", async ({ page }) => {
    // Fill all fields with valid data
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#phone", "7871234567");
    await page.selectOption("#businessType", "restaurant");
    await page.locator('input[value="no"]').click();
    await page.fill("#goals", "I want to create a beautiful website for my restaurant");

    // Mock the API response to avoid actually sending emails during tests
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Wait for success message
    await expect(page.locator("text=¡Gracias!")).toBeVisible({
      timeout: 10000,
    });
  });

  test("handles rate limiting gracefully", async ({ page }) => {
    // Fill valid form data
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#phone", "7871234567");
    await page.selectOption("#businessType", "restaurant");
    await page.locator('input[value="no"]').click();
    await page.fill("#goals", "I want to create a website for my restaurant");

    // Mock rate limit response
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.",
          retryAfter: 60,
        }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Check for rate limit error message
    await expect(page.locator("text=Demasiadas solicitudes")).toBeVisible({
      timeout: 10000,
    });
  });
});
