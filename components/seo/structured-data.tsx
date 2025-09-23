// components/seo/structured-data.tsx
import { BlogPost } from "@/types/blog";

interface BlogPostStructuredDataProps {
  post: BlogPost;
  baseUrl?: string;
}

export function BlogPostStructuredData({
  post,
  baseUrl = "https://www.mariorafaelayala.com"
}: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Mario Rafael Ayala",
      "url": baseUrl,
      "sameAs": [
        "https://github.com/marioayala", // Update with your actual GitHub
        "https://linkedin.com/in/marioayala", // Update with your actual LinkedIn
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mario Rafael Ayala",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png` // Update with your actual logo
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
    "wordCount": Math.round(post.readingTime * 200), // Estimate based on reading time
    "articleBody": post.excerpt, // You might want to use the full content here
  };

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
      "name": "Mario Rafael Ayala",
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