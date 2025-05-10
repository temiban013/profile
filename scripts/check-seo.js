// scripts/check-seo.js
// This is a simple script you can run manually in development

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkHeadingHierarchy() {
  console.log("Checking heading hierarchy...");

  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let lastLevel = 0;
  const headingsByLevel = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
  };

  for (const heading of headings) {
    const level = Number.parseInt(heading.tagName.substring(1));
    const text = heading.textContent?.trim() || "";

    // Add to collection by level
    headingsByLevel[`h${level}`].push(text);

    // Check for skipped levels
    if (level > lastLevel + 1 && lastLevel !== 0) {
      console.warn(
        `⚠️ Heading level skipped from H${lastLevel} to H${level} for: "${text}"`
      );
    }

    lastLevel = level;
  }

  // Check if there's more than one H1
  if (headingsByLevel.h1.length > 1) {
    console.warn(
      `⚠️ Multiple H1 headings found (${headingsByLevel.h1.length}):`,
      headingsByLevel.h1
    );
  } else if (headingsByLevel.h1.length === 0) {
    console.warn("⚠️ No H1 heading found on the page!");
  } else {
    console.log("✅ One H1 heading found:", headingsByLevel.h1[0]);
  }

  // Log heading structure
  console.log("Heading structure:");
  for (const [level, texts] of Object.entries(headingsByLevel)) {
    if (texts.length > 0) {
      console.log(`${level.toUpperCase()}: ${texts.length} headings`);
    }
  }

  // Check alt text
  console.log("\nChecking image alt text...");
  const images = document.querySelectorAll("img");
  let missingAltCount = 0;

  for (const img of images) {
    if (!img.alt) {
      missingAltCount++;
      console.warn("⚠️ Image missing alt text:", img.src);
    }
  }

  if (missingAltCount === 0) {
    console.log(`✅ All ${images.length} images have alt text`);
  } else {
    console.warn(
      `⚠️ ${missingAltCount} of ${images.length} images missing alt text`
    );
  }

  // Check external links
  console.log("\nChecking external links...");
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  let missingRelCount = 0;

  for (const link of externalLinks) {
    const rel = link.getAttribute("rel");
    if (!rel || !rel.includes("noopener")) {
      missingRelCount++;
      console.warn(
        `⚠️ External link missing rel="noopener noreferrer":`,
        link.href
      );
    }
  }

  if (missingRelCount === 0) {
    console.log(
      `✅ All ${externalLinks.length} external links have proper rel attributes`
    );
  } else {
    console.warn(
      `⚠️ ${missingRelCount} of ${externalLinks.length} external links missing proper rel attributes`
    );
  }
}

// In development, you can run this in the browser console
// This is not part of the build, just a helpful utility
console.log(
  "SEO Check script loaded. Run checkHeadingHierarchy() in the console to perform an audit."
);
