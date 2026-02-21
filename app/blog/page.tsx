// app/blog/page.tsx
import { cookies } from "next/headers";
import { getAllPostsMeta, getPostStatsMeta } from "@/lib/blog/content";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getTranslation } from "@/lib/i18n";
import { BlogSectionStructuredData } from "@/components/seo/structured-data";
import { SubjectFilterTabs } from "@/components/blog/subject-filter-tabs";
import { getActiveSubjects, getSubjectCounts, getSubject } from "@/lib/blog/subjects";
import type { BlogPost } from "@/types/blog";
import { postMetaToLegacyPost } from "@/lib/blog/to-legacy-post";
import { BlogLanguageSync } from "@/components/blog/blog-language-sync";

/**
 * Blog Listing Page Component (Server Component)
 *
 * Now using Velite-powered MDX content with server-side rendering.
 * Filters blog posts based on the current language from cookies.
 * Supports URL-based subject filtering via ?subject= param.
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  // Read language from cookie (default to "es")
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as "en" | "es") || "es";

  // Read subject from searchParams
  const params = await searchParams;
  const activeSubject = params.subject || null;

  // Get posts from Velite content (server-side)
  const allPostsMeta = getAllPostsMeta({ locale });
  const allPosts = allPostsMeta.map(postMetaToLegacyPost);
  const featuredPosts = getAllPostsMeta({ locale, featured: true }).map(postMetaToLegacyPost);
  const recentPosts = getAllPostsMeta({ locale, featured: false }).map(postMetaToLegacyPost);
  const stats = getPostStatsMeta(locale);

  // Get subject data
  const subjects = getActiveSubjects(locale).map((s) => s.slug);
  const subjectCounts = Object.fromEntries(getSubjectCounts(locale));

  // Filter posts when subject is active
  let filteredPosts: BlogPost[] = [];
  if (activeSubject) {
    filteredPosts = allPostsMeta
      .filter((p) => p.subject === activeSubject)
      .map(postMetaToLegacyPost);
  }

  // Determine if we're showing filtered view or default view
  const isFiltered = activeSubject !== null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogLanguageSync />
      {/* Structured Data for SEO */}
      <BlogSectionStructuredData posts={allPosts} language={locale} />

      {/* Hero section for the blog */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto pt-25 px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">{getTranslation("blogTitle", locale)}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl text-center mx-auto">
            {getTranslation("blogSubtitle", locale)}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Subject Filter Tabs */}
        <SubjectFilterTabs
          activeSubject={activeSubject}
          availableSubjects={subjects}
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
                    ? getTranslation("article", locale)
                    : getTranslation("articles", locale)}
                </p>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} variant="default" language={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {getTranslation("noArticlesInCategory", locale)}
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
                  {getTranslation("featuredArticles", locale)}
                </h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} variant="featured" language={locale} />
                  ))}
                </div>
              </section>
            )}

            {/* Default view: Recent posts section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {getTranslation("recentArticles", locale)}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} variant="default" language={locale} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Blog statistics */}
        <section className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation("blogStats", locale)}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalPosts}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("totalArticles", locale)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.avgReadingTime}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("avgReadingTime", locale)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.uniqueTags}</div>
              <div className="text-gray-600 dark:text-gray-300">{getTranslation("uniqueTopics", locale)}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
