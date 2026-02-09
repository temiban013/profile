// lib/blog/content.ts
import { posts, authors } from "#site/content";

export type Post = (typeof posts)[number];
export type Author = (typeof authors)[number];

export interface GetPostsOptions {
  locale?: "en" | "es";
  featured?: boolean;
  category?: string;
  tag?: string;
  limit?: number;
  excludeSlug?: string;
}

/**
 * Get all published posts, sorted by date (newest first)
 */
export function getAllPosts(options: GetPostsOptions = {}): Post[] {
  let filteredPosts = posts.filter((post) => !post.draft);

  // Filter by locale
  if (options.locale) {
    filteredPosts = filteredPosts.filter((post) => post.locale === options.locale);
  }

  // Filter by featured
  if (options.featured !== undefined) {
    filteredPosts = filteredPosts.filter((post) => post.featured === options.featured);
  }

  // Filter by category
  if (options.category) {
    filteredPosts = filteredPosts.filter((post) => post.category === options.category);
  }

  // Filter by tag
  if (options.tag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(options.tag!));
  }

  // Exclude specific slug
  if (options.excludeSlug) {
    filteredPosts = filteredPosts.filter((post) => post.slug !== options.excludeSlug);
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Apply limit
  if (options.limit) {
    filteredPosts = filteredPosts.slice(0, options.limit);
  }

  return filteredPosts;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug && !post.draft);
}

/**
 * Get the translation of a post
 */
export function getPostTranslation(post: Post): Post | undefined {
  if (!post.translationSlug) return undefined;
  return posts.find((p) => p.slug === post.translationSlug && !p.draft);
}

/**
 * Get related posts (same category, different post)
 */
export function getRelatedPosts(post: Post, limit: number = 2): Post[] {
  return getAllPosts({
    locale: post.locale,
    category: post.category,
    excludeSlug: post.slug,
    limit,
  });
}

/**
 * Get all unique categories
 */
export function getCategories(locale?: "en" | "es"): string[] {
  const filteredPosts = locale ? posts.filter((p) => p.locale === locale && !p.draft) : posts.filter((p) => !p.draft);

  return [...new Set(filteredPosts.map((post) => post.category))];
}

/**
 * Get all unique tags
 */
export function getTags(locale?: "en" | "es"): string[] {
  const filteredPosts = locale ? posts.filter((p) => p.locale === locale && !p.draft) : posts.filter((p) => !p.draft);

  return [...new Set(filteredPosts.flatMap((post) => post.tags))];
}

/**
 * Get author by slug
 */
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

/**
 * Get post count for statistics
 */
export function getPostStats(locale?: "en" | "es") {
  const filteredPosts = getAllPosts({ locale });

  return {
    totalPosts: filteredPosts.length,
    avgReadingTime: filteredPosts.length > 0 ? Math.round(filteredPosts.reduce((sum, p) => sum + p.readingTime, 0) / filteredPosts.length) : 0,
    uniqueTags: getTags(locale).length,
    categories: getCategories(locale),
  };
}

/**
 * Post metadata type without body and raw content
 */
export type PostMeta = Omit<Post, "body" | "raw">;

/**
 * Get all posts metadata (without body and raw content)
 */
export function getAllPostsMeta(options: GetPostsOptions = {}): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts(options).map(({ body, raw, ...meta }) => meta);
}

/**
 * Get post statistics using metadata only
 */
export function getPostStatsMeta(locale?: "en" | "es") {
  const filteredPosts = getAllPostsMeta({ locale });
  return {
    totalPosts: filteredPosts.length,
    avgReadingTime: filteredPosts.length > 0
      ? Math.round(filteredPosts.reduce((sum, p) => sum + p.readingTime, 0) / filteredPosts.length)
      : 0,
    uniqueTags: getTags(locale).length,
    categories: getCategories(locale),
  };
}
