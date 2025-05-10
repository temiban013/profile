// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for your site
  const baseUrl = "https://www.mariorafaelayala.com";

  // These would be your static pages or routes
  const routes = ["", "/#about", "/#projects", "/#experience"];

  // Generate sitemap entries for each route
  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Return the sitemap data
  return routeEntries;
}
