// lib/seo-checker.ts
/**
 * SEO Checker - Utility functions to check for common SEO issues
 * Use these functions in the browser console during development to audit pages
 */

/**
 * Checks all images on the page for proper alt text
 */
export function checkImageAltText(): void {
  if (typeof window === "undefined") return;

  console.group("Image Alt Text Audit");

  const images = document.querySelectorAll("img");
  let missingAlt = 0;
  let emptyAlt = 0;
  let goodAlt = 0;

  for (const img of images) {
    const src = img.getAttribute("src") || "";
    const shortSrc = src.split("/").pop() || src;

    if (!img.hasAttribute("alt")) {
      console.warn(`❌ Missing alt attribute: ${shortSrc}`);
      missingAlt++;
    } else if (img.alt === "") {
      console.info(`ℹ️ Empty alt text (decorative?): ${shortSrc}`);
      emptyAlt++;
    } else {
      console.log(`✅ Has alt text: "${img.alt}"`);
      goodAlt++;
    }
  }

  console.log(`--- Summary: ${images.length} total images ---`);
  console.log(`✅ ${goodAlt} images with descriptive alt text`);
  console.log(
    `ℹ️ ${emptyAlt} images with empty alt text (should be decorative)`
  );
  console.log(`❌ ${missingAlt} images missing alt text`);

  console.groupEnd();
}

/**
 * Checks external links for proper security attributes
 */
export function checkExternalLinks(): void {
  if (typeof window === "undefined") return;

  console.group("External Link Audit");

  const externalLinks = Array.from(
    document.querySelectorAll('a[href^="http"]')
  );
  let compliantLinks = 0;
  let nonCompliantLinks = 0;

  for (const link of externalLinks) {
    const href = link.getAttribute("href") || "";
    const rel = link.getAttribute("rel") || "";
    const text = link.textContent?.trim() || "";

    if (!rel.includes("noopener") || !rel.includes("noreferrer")) {
      console.warn(`❌ Missing rel="noopener noreferrer": ${href}`);
      console.warn(`   Link text: "${text}"`);
      nonCompliantLinks++;
    } else {
      console.log(`✅ Proper rel attributes: ${href}`);
      compliantLinks++;
    }
  }

  console.log(`--- Summary: ${externalLinks.length} external links ---`);
  console.log(`✅ ${compliantLinks} links with proper security attributes`);
  console.log(`❌ ${nonCompliantLinks} links missing security attributes`);

  console.groupEnd();
}

/**
 * Checks heading hierarchy for proper structure
 */
export function checkHeadingHierarchy(): void {
  if (typeof window === "undefined") return;

  console.group("Heading Hierarchy Audit");

  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );
  const h1Count = headings.filter((h) => h.tagName === "H1").length;

  // Check for H1
  if (h1Count === 0) {
    console.warn("❌ No H1 heading found on the page!");
  } else if (h1Count === 1) {
    console.log(
      `✅ One H1 heading: "${
        headings.find((h) => h.tagName === "H1")?.textContent
      }"`
    );
  } else {
    console.warn(`❌ Multiple H1 headings found (${h1Count}):`);
    for (const h of headings.filter((h) => h.tagName === "H1")) {
      console.warn(`   H1: "${h.textContent}"`);
    }
  }

  // Check heading hierarchy
  let previousLevel = 0;
  let skippedLevels = 0;

  for (const heading of headings) {
    const level = Number.parseInt(heading.tagName.substring(1));
    const text = heading.textContent?.trim() || "";

    console.log(`${heading.tagName}: "${text}"`);

    if (previousLevel > 0 && level > previousLevel + 1) {
      console.warn(`❌ Skipped heading level: H${previousLevel} to H${level}`);
      skippedLevels++;
    }

    previousLevel = level;
  }

  console.log(`--- Summary: ${headings.length} headings ---`);
  console.log(
    `${
      h1Count === 1 ? "✅" : "❌"
    } ${h1Count} H1 headings (should be exactly 1)`
  );
  console.log(
    `${
      skippedLevels === 0 ? "✅" : "❌"
    } ${skippedLevels} skipped heading levels`
  );

  console.groupEnd();
}

/**
 * Run all SEO checks
 */
export function runSEOAudit(): void {
  if (typeof window === "undefined") return;

  console.log("====================================");
  console.log("🔍 Starting SEO Audit");
  console.log("====================================");

  checkImageAltText();
  checkExternalLinks();
  checkHeadingHierarchy();

  console.log("====================================");
  console.log("🏁 SEO Audit Complete");
  console.log("====================================");
}
