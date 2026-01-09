import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsBySubject, getSubject, getActiveSubjects } from "@/lib/blog/subjects";
import { SubjectBadge } from "@/components/blog/subject-badge";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import type { Post } from "@/lib/blog/content";
import type { BlogPost } from "@/types/blog";

/**
 * Convert Velite Post to legacy BlogPost format for existing components
 */
function toLegacyPost(post: Post): BlogPost {
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

interface Props {
  params: Promise<{ subject: string }>;
}

export async function generateStaticParams() {
  const subjects = getActiveSubjects();
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) return {};

  return {
    title: `${subject.name.en} Articles | Mario Ayala`,
    description: subject.description.en,
  };
}

export default async function SubjectPage({ params }: Props) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) notFound();

  const posts = getPostsBySubject(subjectSlug, "en");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">
              Blog
            </Link>
            <span>/</span>
            <Link href="/blog/subjects" className="hover:text-gray-900 dark:hover:text-white">
              Subjects
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {subject.name.en}
            </span>
          </div>
        </nav>

        <header className="mb-12">
          <SubjectBadge subject={subjectSlug} locale="en" linkable={false} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            {subject.name.en}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {subject.description.en}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={toLegacyPost(post)} />
          ))}
        </div>
      </div>
    </main>
  );
}
