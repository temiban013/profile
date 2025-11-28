// app/blog/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllPosts, getPostStats, type Post } from "@/lib/blog/content";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useLanguage } from "@/lib/contexts/language-context";
import { getTranslation } from "@/lib/i18n";
import { BlogSectionStructuredData } from "@/components/seo/structured-data";
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
 */
export default function BlogPage() {
  const { language } = useLanguage();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({ totalPosts: 0, avgReadingTime: 0, uniqueTags: 0 });

  useEffect(() => {
    // Get posts from Velite content
    const locale = language as "en" | "es";
    const all = getAllPosts({ locale }).map(tolegacyPost);
    const featured = getAllPosts({ locale, featured: true }).map(tolegacyPost);
    const recent = getAllPosts({ locale, featured: false }).map(tolegacyPost);
    const postStats = getPostStats(locale);

    setAllPosts(all);
    setFeaturedPosts(featured);
    setRecentPosts(recent);
    setStats(postStats);
  }, [language]);

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
        {/* Featured posts section */}
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

        {/* Recent posts section */}
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
