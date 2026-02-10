// components/seo/structured-data.tsx
import { BlogPost } from "@/types/blog";

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BlogPostStructuredDataProps {
  post: BlogPost;
  translationSlug?: string | null;
  baseUrl?: string;
}

export function BlogPostStructuredData({
  post,
  translationSlug,
  baseUrl = "https://www.mariorafaelayala.com"
}: BlogPostStructuredDataProps) {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || `${baseUrl}/portfolio-preview.png`,
    "author": {
      "@type": "Person",
      "name": "Mario Rafael Ayala",
      "url": baseUrl,
      "sameAs": [
        "https://github.com/MarioRayala",
        "https://linkedin.com/in/mariorafaelayala",
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nitaíno Digital",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/mra-logo-sq.png`
      }
    },
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": (post.updatedAt || post.publishedAt).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "url": `${baseUrl}/blog/${post.slug}`,
    "inLanguage": post.language === 'en' ? 'en-US' : 'es-ES',
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "timeRequired": `PT${post.readingTime}M`,
    "wordCount": Math.round(post.readingTime * 200),
    "articleBody": post.excerpt,
  };

  // Add translation reference for SEO (Schema.org workTranslation property)
  if (translationSlug) {
    structuredData["workTranslation"] = {
      "@type": "BlogPosting",
      "url": `${baseUrl}/blog/${translationSlug}`,
      "inLanguage": post.language === 'en' ? 'es-ES' : 'en-US',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BlogSectionStructuredDataProps {
  posts: readonly BlogPost[];
  language: 'en' | 'es';
  baseUrl?: string;
}

export function BlogSectionStructuredData({
  posts,
  language,
  baseUrl = "https://www.mariorafaelayala.com"
}: BlogSectionStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": language === 'en'
      ? "Mario Rafael Ayala - Software Engineering Insights"
      : "Mario Rafael Ayala - Perspectivas de Ingeniería de Software",
    "description": language === 'en'
      ? "Software engineering insights, tutorials, and career lessons from 25+ years of professional development experience."
      : "Perspectivas de ingeniería de software, tutoriales y lecciones profesionales de 25+ años de experiencia en desarrollo.",
    "url": `${baseUrl}/blog`,
    "inLanguage": language === 'en' ? 'en-US' : 'es-ES',
    "author": {
      "@type": "Person",
      "name": "Mario Rafael Ayala",
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nitaíno Digital",
      "url": baseUrl,
    },
    "blogPost": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${baseUrl}/blog/${post.slug}`,
      "datePublished": post.publishedAt.toISOString(),
      "author": {
        "@type": "Person",
        "name": "Mario Rafael Ayala"
      },
      "keywords": post.tags.join(", "),
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  postTitle: string;
  postSlug: string;
  language: 'en' | 'es';
  baseUrl?: string;
}

export function BreadcrumbStructuredData({
  postTitle,
  postSlug,
  language,
  baseUrl = "https://www.mariorafaelayala.com"
}: BreadcrumbStructuredDataProps) {
  const homeLabel = language === 'en' ? 'Home' : 'Inicio';
  const blogLabel = language === 'en' ? 'Blog' : 'Blog';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": blogLabel,
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": postTitle,
        "item": `${baseUrl}/blog/${postSlug}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}