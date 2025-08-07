// lib/blog-data.ts
import { BlogPost } from "@/types/blog";

/**
 * Sample blog posts data
 * In a real-world scenario, this would come from a CMS, database, or markdown files
 * We're starting simple to establish the data flow patterns
 */
export const sampleBlogPosts: readonly BlogPost[] = [
  {
    id: "next-js-app-router-guide",
    title:
      "Mastering Next.js App Router: A Complete Guide for Modern Web Development",
    slug: "next-js-app-router-guide",
    excerpt:
      "Explore the power of Next.js App Router and how it revolutionizes React development with server components, improved performance, and streamlined routing patterns.",
    content: `
# Introduction to Next.js App Router

The App Router represents a significant evolution in Next.js architecture, introducing server components and a new paradigm for building React applications.

## Key Benefits

Server components allow us to render components on the server, reducing client-side JavaScript and improving performance. This is particularly beneficial for content-heavy applications like blogs.

## Implementation Patterns

When building with App Router, we organize our routes using the file-system based routing, where each folder represents a route segment.

\`\`\`typescript
// Example of a server component
export default async function BlogPost() {
  const post = await fetchBlogPost();
  return <article>{post.content}</article>;
}
\`\`\`

The beauty of this approach lies in its simplicity and performance characteristics.
    `,
    publishedAt: new Date("2024-12-15"),
    updatedAt: new Date("2025-01-15"),
    tags: ["Next.js", "React", "Web Development", "App Router"] as const,
    category: "Web Development",
    readingTime: 8,
    featured: true,
    language: "en",
  },
  {
    id: "typescript-strict-mode",
    title:
      "Why TypeScript Strict Mode is Essential for Professional Development",
    slug: "typescript-strict-mode",
    excerpt:
      "Learn how TypeScript strict mode catches errors early, improves code quality, and creates more maintainable applications in enterprise environments.",
    content: `
# The Power of TypeScript Strict Mode

TypeScript's strict mode is not just a configuration option—it's a commitment to code quality and maintainability.

## What Strict Mode Enables

Strict mode activates several compiler options that catch common programming errors:
- \`noImplicitAny\`: Prevents implicit any types
- \`strictNullChecks\`: Requires explicit handling of null and undefined
- \`strictFunctionTypes\`: Ensures function type safety

## Real-World Impact

In my experience migrating legacy JavaScript codebases to TypeScript, enabling strict mode often reveals dozens of potential runtime errors that would otherwise go unnoticed until production.

\`\`\`typescript
// Without strict mode, this compiles but may fail at runtime
function processUser(user) {
  return user.name.toUpperCase(); // What if user is null?
}

// With strict mode, we must handle the null case
function processUser(user: User | null): string {
  return user?.name?.toUpperCase() ?? 'Unknown User';
}
\`\`\`

This proactive error catching is invaluable in professional development environments.
    `,
    publishedAt: new Date("2024-11-20"),
    tags: ["TypeScript", "Code Quality", "Best Practices"] as const,
    category: "Programming",
    readingTime: 6,
    featured: false,
    language: "en",
  },
  {
    id: "enterprise-software-lessons",
    title: "Lessons from 25 Years in Enterprise Software Development",
    slug: "enterprise-software-lessons",
    excerpt:
      "Insights gained from building software for major corporations including Disney Parks and Office Depot, focusing on scalability, maintainability, and team collaboration.",
    content: `
# A Quarter Century of Enterprise Development

After 25 years in software development, working with companies like Disney Parks and Office Depot, I've learned that technology is only part of the equation.

## The Human Element

The most successful projects I've been involved with shared common characteristics:
- Clear communication between stakeholders
- Well-defined requirements with room for iteration  
- Teams that valued both innovation and stability

## Technical Lessons

From a technical perspective, the systems that stood the test of time focused on:
- Modularity over monolithic architecture
- Documentation as a first-class citizen
- Testing strategies that provided confidence without brittleness

## Evolution of Practices

The transition from waterfall to agile, from monoliths to microservices, from server-side rendering to SPAs and back to SSR—each paradigm shift taught valuable lessons about adapting to change while maintaining core principles.

The key insight: technology serves the business, not the other way around.
    `,
    publishedAt: new Date("2024-10-10"),
    tags: [
      "Career",
      "Enterprise",
      "Software Architecture",
      "Leadership",
    ] as const,
    category: "Career Insights",
    readingTime: 12,
    featured: true,
    language: "en",
  },
] as const;

/**
 * Helper function to get a blog post by slug
 * This simulates what would typically be a database query or CMS API call
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return sampleBlogPosts.find((post) => post.slug === slug);
}

/**
 * Helper function to get all blog posts with optional filtering
 * Sorted by publication date (newest first)
 */
export function getAllBlogPosts(options?: {
  limit?: number;
  featured?: boolean;
  category?: string;
  language?: "en" | "es";
}): readonly BlogPost[] {
  let posts = [...sampleBlogPosts];

  // Apply filters
  if (options?.featured !== undefined) {
    posts = posts.filter((post) => post.featured === options.featured);
  }

  if (options?.category) {
    posts = posts.filter((post) => post.category === options.category);
  }

  if (options?.language) {
    posts = posts.filter((post) => post.language === options.language);
  }

  // Sort by publication date (newest first)
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  // Apply limit if specified
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}
