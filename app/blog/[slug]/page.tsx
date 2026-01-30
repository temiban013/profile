// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts, getPostTranslation } from "@/lib/blog/content";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/blog/mdx-content";
import { SubjectBadge } from "@/components/blog/subject-badge";
import { PostLanguageSync } from "@/components/blog/post-language-sync";
import { BlogPostStructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data";
import type { BlogPost } from "@/types/blog";

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Convert Velite Post to legacy BlogPost format for structured data
 */
function toLegacyPost(post: NonNullable<ReturnType<typeof getPostBySlug>>): BlogPost {
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

/**
 * Generate metadata for individual blog posts
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const translation = getPostTranslation(post);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mariorafaelayala.com";

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    keywords: post.tags,
    other: {
      "Content-Language": post.locale,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
      languages: translation
        ? {
            [post.locale === "en" ? "es" : "en"]: `${baseUrl}/blog/${translation.slug}`,
            [post.locale]: `${baseUrl}/blog/${post.slug}`,
          }
        : undefined,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Mario Rafael Ayala"],
      tags: post.tags,
      url: `/blog/${post.slug}`,
      locale: post.locale === "en" ? "en_US" : "es_ES",
      siteName: "Mario Rafael Ayala - Software Engineer",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@marioayala",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate static params for all blog posts
 */
export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Individual Blog Post Page Component
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 2);
  const translation = getPostTranslation(post);
  const legacyPost = toLegacyPost(post);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Language sync - redirects to translation when user changes language */}
      <PostLanguageSync
        currentLocale={post.locale}
        translationSlug={translation?.slug ?? null}
      />

      {/* Structured Data for SEO */}
      <BlogPostStructuredData post={legacyPost} translationSlug={translation?.slug} />
      <BreadcrumbStructuredData
        postTitle={post.title}
        postSlug={post.slug}
        language={post.locale}
      />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto pt-30 px-4 py-3 max-w-4xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {post.locale === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {post.title.length > 50 ? `${post.title.slice(0, 50)}...` : post.title}
            </span>
          </div>
        </div>
      </nav>

      {/* Blog post header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Category badge */}
          <div className="mb-4 flex flex-wrap gap-2">
            <SubjectBadge subject={post.subject} locale={post.locale} />
            {post.featured && (
              <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                {post.locale === "es" ? "Destacado" : "Featured"}
              </span>
            )}
            {translation && (
              <Link
                href={`/blog/${translation.slug}`}
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {post.locale === "es" ? "Read in English" : "Leer en Español"}
              </Link>
            )}
          </div>

          {/* Post metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
            <span>•</span>
            <span>
              {post.readingTime} {post.locale === "es" ? "min de lectura" : "min read"}
            </span>
            <span>•</span>
            <span className="capitalize">{post.locale === "es" ? "Español" : "English"}</span>
            {post.updated && (
              <>
                <span>•</span>
                <span>
                  {post.locale === "es" ? "Actualizado" : "Updated"}: {formatDate(new Date(post.updated))}
                </span>
              </>
            )}
          </div>

          {/* Post title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Post excerpt */}
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{post.description}</p>

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

      {/* Blog post content - MDX rendered with syntax highlighting */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert max-w-none prose-pre:bg-[#24292e] prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none">
          <MdxContent code={post.body} />
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mario Rafael Ayala</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.locale === "es"
                    ? "Ingeniero de Software Senior con 25+ años de experiencia. Especialista en desarrollo web full-stack, transformación digital y educación tecnológica. Actualmente enfocado en Next.js, TypeScript y soluciones para pequeños negocios."
                    : "Senior Software Engineer with 25+ years of experience. Specialist in full-stack web development, digital transformation, and technology education. Currently focused on Next.js, TypeScript, and solutions for small businesses."}
                </p>
                <div className="flex space-x-4 mt-4">
                  <Link href="/#sobre-mi" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {post.locale === "es" ? "Más sobre Mario" : "About Mario"}
                  </Link>
                  <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {post.locale === "es" ? "Ver todos los artículos" : "All articles"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {post.locale === "es" ? "Artículos Relacionados" : "Related Articles"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
