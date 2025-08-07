// app/blog/page.tsx
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog-data";
import { BlogPostCard } from "@/components/blog/blog-post-card";

/**
 * SEO metadata for the blog listing page
 * This demonstrates how Next.js App Router handles metadata generation
 */
export const metadata: Metadata = {
  title: "Blog | Software Engineering Insights",
  description:
    "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
  keywords: [
    "software engineering",
    "programming",
    "web development",
    "Next.js",
    "TypeScript",
    "career insights",
  ],
  openGraph: {
    title: "Blog | Software Engineering Insights",
    description:
      "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Software Engineering Insights",
    description:
      "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
  },
};

/**
 * Blog Listing Page Component
 *
 * This is a Server Component that fetches blog posts and renders them.
 * In Next.js App Router, components are Server Components by default,
 * which means they run on the server and can directly access data sources.
 */
export default function BlogPage() {
  // Fetch all blog posts - in a real application, this might include pagination
  const allPosts = getAllBlogPosts();
  const featuredPosts = getAllBlogPosts({ featured: true });
  const recentPosts = getAllBlogPosts({ limit: 6, featured: false });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section for the blog */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto pt-25 px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Software Engineering Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Sharing knowledge gained from 25+ years of professional software
            development, covering everything from enterprise architecture to
            modern web technologies.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Featured posts section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Articles
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
            Recent Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        </section>

        {/* Blog statistics - demonstrates data processing */}
        <section className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Statistics
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {allPosts.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total Articles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {Math.round(
                  allPosts.reduce((sum, post) => sum + post.readingTime, 0) /
                    allPosts.length
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Avg. Reading Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(allPosts.flatMap((post) => post.tags)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Unique Topics
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
