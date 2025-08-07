// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for individual blog posts
 * This function runs at build time for static generation
 * and at request time for dynamic routes
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: Array.from(post.tags),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Mario Rafael Ayala"],
      tags: Array.from(post.tags),
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Generate static params for all blog posts
 * This enables static generation at build time for better performance
 */
export function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Individual Blog Post Page Component
 *
 * This component renders a full blog post with proper semantic HTML,
 * structured data for SEO, and navigation elements.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  // Handle case where blog post doesn't exist
  if (!post) {
    notFound();
  }

  // Calculate related posts (same category, excluding current post)
  const relatedPosts = getAllBlogPosts({
    category: post.category,
    limit: 3,
  }).filter((relatedPost) => relatedPost.id !== post.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Blog post header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li className="text-gray-900 dark:text-white font-medium">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Post metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <time dateTime={post.publishedAt.toISOString()}>
              Published {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt && (
              <time dateTime={post.updatedAt.toISOString()}>
                Updated {formatDate(post.updatedAt)}
              </time>
            )}
            <span>{post.readingTime} min read</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
              {post.category}
            </span>
          </div>

          {/* Post title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Post excerpt */}
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Blog post content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* 
            Convert markdown-style content to HTML
            In a real implementation, you'd use a markdown parser like remark
            For now, we'll render the content with basic formatting
          */}
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^# /gm, '<h1 class="text-3xl font-bold mt-8 mb-4">')
                .replace(/^## /gm, '<h2 class="text-2xl font-bold mt-6 mb-3">')
                .replace(/^### /gm, '<h3 class="text-xl font-bold mt-4 mb-2">')
                .replace(
                  /```typescript\n([\s\S]*?)```/g,
                  '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-typescript">$1</code></pre>'
                )
                .replace(
                  /```\n([\s\S]*?)```/g,
                  '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>'
                )
                .replace(
                  /`([^`]+)`/g,
                  '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>'
                )
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^(?!<[h|p|c])/gm, '<p class="mb-4">')
                .replace(/<p class="mb-4">(<h[1-6])/g, "$1")
                .replace(/(<\/h[1-6]>)<\/p>/g, "$1"),
            }}
          />
        </article>

        {/* Related posts section */}
        {relatedPosts.length > 0 && (
          <aside className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold mb-2">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(relatedPost.publishedAt)} •{" "}
                    {relatedPost.readingTime} min read
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Navigation back to blog */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all articles
          </Link>
        </div>
      </main>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: "Mario Rafael Ayala",
            },
            publisher: {
              "@type": "Person",
              name: "Mario Rafael Ayala",
            },
            datePublished: post.publishedAt.toISOString(),
            dateModified:
              post.updatedAt?.toISOString() || post.publishedAt.toISOString(),
            keywords: post.tags.join(", "),
            articleSection: post.category,
            wordCount: post.content.split(" ").length,
            timeRequired: `PT${post.readingTime}M`,
            url: `/blog/${post.slug}`,
          }),
        }}
      />
    </div>
  );
}
