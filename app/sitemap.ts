// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for your site
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mariorafaelayala.com'}`;

  // Main site pages and sections
  const routes = ["", "/#about", "/#projects", "/#experience", "/#contact", "/resume"];

  // Generate sitemap entries for each route
  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add resume PDFs for employer discovery and search indexing
  const resumeEntries = [
    {
      url: `${baseUrl}/Mario-R-Ayala-Resume-EN.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9, // High priority for resume
    },
    {
      url: `${baseUrl}/Mario-R-Ayala-Resume-ES.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9, // High priority for resume
    }
  ];

  // Blog main page
  const blogMainEntry = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  // Individual blog post entries for SEO
  const allPosts = getAllBlogPosts();
  const blogPostEntries = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  // Language-specific entries for better international SEO
  const languageEntries = [
    {
      url: `${baseUrl}/?lang=en`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/?lang=es`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }
  ];

  // Combine all entries
  return [
    ...routeEntries,
    ...resumeEntries,
    blogMainEntry,
    ...blogPostEntries,
    ...languageEntries
  ];
}
