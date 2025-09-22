// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mariorafaelayala.com';

  return {
    rules: [
      {
        userAgent: "*",
        // Explicitly allow PDFs for employer discovery
        allow: ["/", "/*.pdf"],
      },
      {
        // Special rules for job search crawlers and recruiting bots
        userAgent: ["LinkedInBot", "facebookexternalhit", "Twitterbot", "WhatsApp"],
        allow: ["/", "/*.pdf"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Add additional host information for better crawling
    host: baseUrl,
  };
}
