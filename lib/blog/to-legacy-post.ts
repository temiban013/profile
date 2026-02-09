import type { Post, PostMeta } from "@/lib/blog/content";
import type { BlogPost } from "@/types/blog";

/**
 * Convert PostMeta (no body/raw) to legacy BlogPost format for listings
 */
export function postMetaToLegacyPost(meta: PostMeta): BlogPost {
  return {
    id: meta.slug,
    title: meta.title,
    slug: meta.slug,
    excerpt: meta.description,
    content: "",
    publishedAt: new Date(meta.date),
    updatedAt: meta.updated ? new Date(meta.updated) : undefined,
    tags: meta.tags,
    category: meta.category,
    readingTime: meta.readingTime,
    featured: meta.featured,
    language: meta.locale,
  };
}

/**
 * Convert full Post to legacy BlogPost format for detail pages
 */
export function postToLegacyPost(post: Post): BlogPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.description,
    content: post.raw,
    publishedAt: new Date(post.date),
    updatedAt: post.updated ? new Date(post.updated) : undefined,
    tags: post.tags,
    category: post.category,
    readingTime: post.readingTime,
    featured: post.featured,
    language: post.locale,
    image: post.image,
  };
}
