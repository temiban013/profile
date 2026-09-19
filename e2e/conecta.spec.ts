import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.describe("/conecta landing page", () => {
  test("renders a single visible h1 at mobile viewport", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/conecta");

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
  });

  test("has a noindex, follow robots meta tag", async ({ page }) => {
    await page.goto("/conecta");

    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/);
    await expect(robotsMeta).toHaveAttribute("content", /follow/);
  });

  test("both WhatsApp buttons point at the right numbers", async ({
    page,
  }) => {
    await page.goto("/conecta");

    // Scoped to <main>: the site-wide Footer also renders a WhatsApp icon
    // (NEXT_PUBLIC_SOCIAL_WHATSAPP, currently the cell number) outside
    // <main>, which would otherwise double-match the cell selector.
    const main = page.locator("main");
    const officeLink = main.locator('a[href*="wa.me/17874585702"]');
    const cellLink = main.locator('a[href*="wa.me/14074767353"]');

    await expect(officeLink).toHaveCount(1);
    await expect(cellLink).toHaveCount(1);
  });

  test("renders normally with a utm_source query string", async ({
    page,
  }) => {
    await page.goto("/conecta?utm_source=qr");

    await expect(page).toHaveURL(/\/conecta\?utm_source=qr/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("/connect redirects to /conecta preserving the query string", async ({
    page,
  }) => {
    await page.goto("/connect?utm_source=qr");

    await expect(page).toHaveURL(/\/conecta\?utm_source=qr/);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("/conecta/mario.vcf download", () => {
  test("returns a vCard file starting with BEGIN:VCARD", async ({
    request,
  }) => {
    const response = await request.get("/conecta/mario.vcf");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/vcard");
    expect(response.headers()["content-disposition"]).toContain(
      "mario-ayala.vcf"
    );

    const body = await response.text();
    expect(body.startsWith("BEGIN:VCARD")).toBe(true);
    expect(body).toContain("TEL;TYPE=WORK,VOICE:+17874585702");
    expect(body).toContain("TEL;TYPE=CELL,VOICE:+14074767353");
  });
});

test.describe("/conecta save-contact share path", () => {
  const ANDROID_UA =
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";

  test("Android with file sharing hands the .vcf to navigator.share", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      userAgent: ANDROID_UA,
      viewport: MOBILE_VIEWPORT,
    });
    const page = await context.newPage();
    // Headless browsers have no share sheet; stub it and record the call.
    await page.addInitScript(() => {
      const w = window as unknown as { __shared: string[] | null };
      w.__shared = null;
      navigator.canShare = () => true;
      navigator.share = async (data?: ShareData) => {
        w.__shared = (data?.files ?? []).map((f) => `${f.name}|${f.type}`);
      };
    });

    const vcardFetched = page.waitForResponse((res) =>
      res.url().endsWith("/conecta/mario.vcf")
    );
    await page.goto("/conecta");
    await vcardFetched;

    const saveLink = page.locator('main a[href="/conecta/mario.vcf"]');
    await expect(async () => {
      await saveLink.click();
      const shared = await page.evaluate(
        () => (window as unknown as { __shared: string[] | null }).__shared
      );
      expect(shared).toEqual(["mario-ayala.vcf|text/vcard"]);
    }).toPass({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/conecta$/);

    await context.close();
  });

  test("non-Android browsers keep the plain link download", async ({
    page,
    userAgent,
  }) => {
    // The Mobile Chrome project emulates an Android device, where the share
    // path is the expected behaviour (covered by the test above).
    test.skip(/Android/i.test(userAgent ?? ""), "Android uses the share path");

    await page.addInitScript(() => {
      const w = window as unknown as { __shareCalled: boolean };
      w.__shareCalled = false;
      navigator.canShare = () => true;
      navigator.share = async () => {
        w.__shareCalled = true;
      };
    });
    await page.goto("/conecta");

    const download = page.waitForEvent("download");
    await page.locator('main a[href="/conecta/mario.vcf"]').click();
    expect((await download).suggestedFilename()).toBe("mario-ayala.vcf");
    expect(
      await page.evaluate(
        () => (window as unknown as { __shareCalled: boolean }).__shareCalled
      )
    ).toBe(false);
  });
});
