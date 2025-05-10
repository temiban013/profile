// docs/seo-readme.md

# SEO Best Practices for Portfolio Site

This document outlines the SEO strategies implemented in this project and provides guidelines for maintaining high SEO standards.

## Implemented SEO Features

1. **Next.js Metadata API**

   - Root metadata in `app/layout.tsx`
   - Per-page metadata using `generateMetadata` function
   - Proper Open Graph and Twitter Card metadata

2. **Structured Data (Schema.org)**

   - JSON-LD implementation via `StructuredData` component
   - Person, WebSite, and WebPage schemas

3. **Technical SEO**

   - Sitemap.xml generation (`app/sitemap.ts`)
   - Robots.txt configuration (`app/robots.ts`)
   - Web App Manifest (`app/manifest.ts`)

4. **Accessibility & SEO Components**
   - `ExternalLink` - Properly secured external links
   - `AccessibleImage` - Enforces alt text best practices
   - `SEO` heading components - Ensures proper heading hierarchy

## SEO Checklist for New Pages

- [ ] Page has meaningful title and description
- [ ] Page has exactly one H1 heading
- [ ] Heading hierarchy is logical (no skipping levels)
- [ ] All images have descriptive alt text
- [ ] External links use rel="noopener noreferrer"
- [ ] Include appropriate structured data

## SEO Audit Tools

We've included a simple SEO checker utility in `lib/seo-checker.ts` that can be used during development.

### How to Use the SEO Checker

Open your browser console on any page of the site and run:

```javascript
// Import the utility (already available in global scope during development)
import { runSEOAudit } from "@/lib/seo-checker";

// Run the full audit
runSEOAudit();

// Or run individual checks
checkImageAltText();
checkExternalLinks();
checkHeadingHierarchy();
```
