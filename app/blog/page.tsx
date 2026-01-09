// app/blog/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllPosts, getPostStats, type Post } from "@/lib/blog/content";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useLanguage } from "@/lib/contexts/language-context";
import { getTranslation } from "@/lib/i18n";
import { BlogSectionStructuredData } from "@/components/seo/structured-data";
import { SubjectFilterTabs } from "@/components/blog/subject-filter-tabs";
import { getActiveSubjects, getSubjectCounts, getSubject } from "@/lib/blog/subjects";
import type { BlogPost } from "@/types/blog";

/**
 * Convert Velite Post to legacy BlogPost format for existing components
 */
function tolegacyPost(post: Post): BlogPost {
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
  };
}

/**
 * Blog Listing Page Component
 *
 * Now using Velite-powered MDX content.
 * Filters blog posts based on the current language selection.
 * Supports URL-based subject filtering via ?subject= param.
 */
export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageContent />
    </Suspense>
  );
}

function BlogPageContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const activeSubject = searchParams.get("subject");

  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({ totalPosts: 0, avgReadingTime: 0, uniqueTags: 0 });
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [subjectCounts, setSubjectCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Get posts from Velite content
    const locale = language as "en" | "es";
    const all = getAllPosts({ locale }).map(tolegacyPost);
    const featured = getAllPosts({ locale, featured: true }).map(tolegacyPost);
    const recent = getAllPosts({ locale, featured: false }).map(tolegacyPost);
    const postStats = getPostStats(locale);

    // Get subject data
    const subjects = getActiveSubjects(locale).map((s) => s.slug);
    const counts = Object.fromEntries(getSubjectCounts(locale));

    setAllPosts(all);
    setFeaturedPosts(featured);
    setRecentPosts(recent);
    setStats(postStats);
    setAvailableSubjects(subjects);
    setSubjectCounts(counts);
  }, [language]);

  // Filter posts when subject changes
  useEffect(() => {
    if (activeSubject) {
      // When filtering by subject, show all matching posts (ignore featured/recent split)
      const locale = language as "en" | "es";
      const subjectPosts = getAllPosts({ locale })
        .filter((p) => p.subject === activeSubject)
        .map(tolegacyPost);
      setFilteredPosts(subjectPosts);
    } else {
      setFilteredPosts([]);
    }
  }, [activeSubject, language]);

  // Update document title when filtering
  useEffect(() => {
    const baseTitle = "Blog | Mario Ayala";
    if (activeSubject) {
      const subjectData = getSubject(activeSubject);
      const subjectName = subjectData?.name[language as "en" | "es"] || activeSubject;
      document.title = `${subjectName} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
    // Cleanup: restore base title on unmount
    return () => {
      document.title = baseTitle;
    };
  }, [activeSubject, language]);

  // Determine if we're showing filtered view or default view
  const isFiltered = activeSubject !== null;
  const locale = language as "en" | "es";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Structured Data for SEO */}
      <BlogSectionStructuredData posts={allPosts} language={language} />

      {/* Hero section for the blog */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto pt-25 px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">{getTranslation("blogTitle", language)}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl text-center mx-auto">
            {getTranslation("blogSubtitle", language)}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Subject Filter Tabs */}
        <SubjectFilterTabs
          activeSubject={activeSubject}
          availableSubjects={availableSubjects}
          locale={locale}
          counts={subjectCounts}
          totalCount={allPosts.length}
        />

        {/* Filtered view: Show all posts for selected subject */}
        {isFiltered ? (
          <section>
            {/* Results count with subject name */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getSubject(activeSubject)?.name[locale] || activeSubject}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1
                    ? getTranslation("article", language)
                    : getTranslation("articles", language)}
                </p>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} variant="default" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {getTranslation("noArticlesInCategory", language)}
                </p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Default view: Featured posts section */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {getTranslation("featuredArticles", language)}
                </h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} variant="featured" />
                  ))}
                </div>
              </section>
            )}

            {/* Default view: Recent posts section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {getTranslation("recentArticles", language)}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} variant="default" />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Blog statistics */}
        <section className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation("blogStats", language)}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalPosts}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("totalArticles", language)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.avgReadingTime}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("avgReadingTime", language)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.uniqueTags}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("uniqueTopics", language)}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Skeleton loading state for the blog page
 */
function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero skeleton */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto pt-25 px-4 py-16 max-w-4xl">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Filter tabs skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Post cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
