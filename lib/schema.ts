// lib/schema.ts (expanded)
import type {
  Person,
  WithContext,
  WebSite,
  WebPage,
  SoftwareApplication,
  Article,
} from "schema-dts";

// Person schema for the portfolio owner
export function generatePersonSchema(
  name: string,
  jobTitle: string,
  url: string,
  image: string,
  description: string,
  sameAs: string[]
): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    image,
    description,
    sameAs,
  };
}

// Website schema for the entire portfolio
export function generateWebsiteSchema(
  name: string,
  url: string,
  description: string,
  author: string
): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    inLanguage: "es",
  };
}

// WebPage schema for specific pages
export function generateWebPageSchema(
  url: string,
  name: string,
  description: string,
  lastReviewed: string,
  author: string
): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    description,
    lastReviewed,
    author: {
      "@type": "Person",
      name: author,
    },
    inLanguage: "es",
  };
}

// Software schema for projects
export function generateSoftwareSchema(
  name: string,
  description: string,
  url: string,
  author: string,
  applicationCategory: string,
  operatingSystem: string,
  screenshot: string
): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    author: {
      "@type": "Person",
      name: author,
    },
    applicationCategory,
    operatingSystem,
    screenshot,
  };
}

// Article schema for blog posts (if needed later)
export function generateArticleSchema(
  headline: string,
  description: string,
  url: string,
  author: string,
  datePublished: string,
  dateModified: string,
  image: string
): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    dateModified,
    image,
    inLanguage: "es",
  };
}
