import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsBySubject, getSubject, getActiveSubjects } from "@/lib/blog/subjects";
import { SubjectBadge } from "@/components/blog/subject-badge";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { postToLegacyPost } from "@/lib/blog/to-legacy-post";
import { getTranslation } from "@/lib/i18n";
import { BlogLanguageSync } from "@/components/blog/blog-language-sync";

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

  // Read language from cookie (default to "es")
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as "en" | "es") || "es";

  const posts = getPostsBySubject(subjectSlug, locale);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <BlogLanguageSync />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
              {locale === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">
              Blog
            </Link>
            <span>/</span>
            <Link href="/blog/subjects" className="hover:text-gray-900 dark:hover:text-white">
              {locale === "es" ? "Temas" : "Subjects"}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {subject.name[locale]}
            </span>
          </div>
        </nav>

        <header className="mb-12">
          <SubjectBadge subject={subjectSlug} locale={locale} linkable={false} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            {subject.name[locale]}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {subject.description[locale]}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {posts.length}{" "}
            {posts.length === 1
              ? getTranslation("article", locale)
              : getTranslation("articles", locale)}
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={postToLegacyPost(post)} language={locale} />
          ))}
        </div>
      </div>
    </main>
  );
}
