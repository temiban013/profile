// lib/blog/subjects.ts
import { posts } from "#site/content";
import { blogSubjects, type BlogSubject } from "@/config/blog-subjects";

export type { BlogSubject };

/**
 * Get all subjects that have at least one published post
 */
export function getActiveSubjects(locale?: "en" | "es"): BlogSubject[] {
  const publishedPosts = posts.filter((p) => !p.draft);
  const activeSubjectSlugs = new Set(
    publishedPosts
      .filter((p) => !locale || p.locale === locale)
      .map((p) => p.subject)
  );

  return blogSubjects
    .filter((s) => activeSubjectSlugs.has(s.slug))
    .sort((a, b) => a.order - b.order);
}

/**
 * Get posts by subject
 */
export function getPostsBySubject(subjectSlug: string, locale?: "en" | "es") {
  return posts
    .filter((p) => !p.draft)
    .filter((p) => p.subject === subjectSlug)
    .filter((p) => !locale || p.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get post count per subject
 */
export function getSubjectCounts(locale?: "en" | "es"): Map<string, number> {
  const counts = new Map<string, number>();

  posts
    .filter((p) => !p.draft)
    .filter((p) => !locale || p.locale === locale)
    .forEach((p) => {
      counts.set(p.subject, (counts.get(p.subject) || 0) + 1);
    });

  return counts;
}

export { getSubject, getSubjectName } from "@/config/blog-subjects";
