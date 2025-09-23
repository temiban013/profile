// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";
import { parseMarkdownContent } from "@/lib/content-parser";
import { BlogPostStructuredData } from "@/components/seo/structured-data";

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

  // Find the corresponding post in the other language for hreflang
  const allPosts = getAllBlogPosts();
  const otherLanguagePost = allPosts.find(p =>
    p.language !== post.language &&
    (p.id.includes(post.id.split('-').slice(0, -1).join('-')) ||
     post.id.includes(p.id.split('-').slice(0, -1).join('-')))
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mariorafaelayala.com';

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: Array.from(post.tags),

    // Language and region targeting
    other: {
      'Content-Language': post.language,
    },

    // Canonical URL
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
      languages: otherLanguagePost ? {
        [post.language === 'en' ? 'es' : 'en']: `${baseUrl}/blog/${otherLanguagePost.slug}`,
        [post.language]: `${baseUrl}/blog/${post.slug}`,
      } : undefined,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Mario Rafael Ayala"],
      tags: Array.from(post.tags),
      url: `/blog/${post.slug}`,
      locale: post.language === 'en' ? 'en_US' : 'es_ES',
      siteName: 'Mario Rafael Ayala - Software Engineer',
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: '@marioayala', // Add your Twitter handle if you have one
    },

    // Additional metadata for better SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
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

  // Handle 404 for non-existent posts
  if (!post) {
    notFound();
  }

  // Parse the markdown content to HTML
  const parsedContent = parseMarkdownContent(post.content);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Structured Data for SEO */}
      <BlogPostStructuredData post={post} />
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto pt-30 px-4 py-3 max-w-4xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {post.title.length > 50
                ? `${post.title.slice(0, 50)}...`
                : post.title}
            </span>
          </div>
        </div>
      </nav>

      {/* Blog post header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.featured && (
              <span className="ml-2 inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </span>
            )}
          </div>

          {/* Post metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{post.readingTime} min de lectura</span>
            <span>•</span>
            <span className="capitalize">
              {post.language === "es" ? "Español" : "English"}
            </span>
            {post.updatedAt && (
              <>
                <span>•</span>
                <span>Actualizado: {formatDate(post.updatedAt)}</span>
              </>
            )}
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
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
            Use our enhanced content parser instead of the basic regex approach
            This provides much better formatting for paragraphs, code blocks, lists, etc.
          */}
          <div
            className="content-area"
            dangerouslySetInnerHTML={{
              __html: parsedContent,
            }}
          />
        </article>

        {/* Author bio section */}
        <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MA</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Mario Rafael Ayala
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ingeniero de Software Senior con 25+ años de experiencia.
                  Especialista en desarrollo web full-stack, transformación
                  digital y educación tecnológica. Actualmente enfocado en
                  Next.js, TypeScript y soluciones para pequeños negocios.
                </p>
                <div className="flex space-x-4 mt-4">
                  <Link
                    href="/#sobre-mi"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Más sobre Mario
                  </Link>
                  <Link
                    href="/blog"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Ver todos los artículos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Artículos Relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Get related posts by category, excluding current post */}
            {getAllBlogPosts({
              category: post.category,
              language: post.language,
            })
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {relatedPost.category} • {relatedPost.readingTime} min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
