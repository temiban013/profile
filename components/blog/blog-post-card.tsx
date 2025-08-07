// components/blog/blog-post-card.tsx
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostCardProps {
  readonly post: BlogPost;
  readonly variant?: "default" | "featured" | "compact";
}

/**
 * BlogPostCard Component
 *
 * A reusable component for displaying blog post summaries in various layouts.
 * The component follows the principle of composition, allowing different
 * visual presentations through the variant prop while maintaining the same
 * underlying data structure.
 */
export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  // Determine styling based on variant - this pattern allows for easy extension
  const cardClasses = {
    default:
      "bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
    featured:
      "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-200 dark:border-gray-600",
    compact:
      "bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700",
  }[variant];

  const paddingClasses = {
    default: "p-6",
    featured: "p-8",
    compact: "p-4",
  }[variant];

  return (
    <article className={cardClasses}>
      <div className={paddingClasses}>
        {/* Post metadata - publication date and reading time */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
          <span>{post.readingTime} min read</span>
        </div>

        {/* Post title - using semantic heading hierarchy */}
        <h3
          className={`font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
            variant === "featured"
              ? "text-2xl"
              : variant === "compact"
                ? "text-lg"
                : "text-xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Post excerpt - truncated description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Category and tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Read full article
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
