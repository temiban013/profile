import { Metadata } from "next";
import { cookies } from "next/headers";
import { getActiveSubjects, getSubjectCounts } from "@/lib/blog/subjects";
import { SubjectCard } from "@/components/blog/subject-card";
import { getTranslation } from "@/lib/i18n";
import { BlogLanguageSync } from "@/components/blog/blog-language-sync";

export const metadata: Metadata = {
  title: "Blog Subjects | Mario Ayala",
  description: "Browse articles by subject - Web Development, AI Tools, and Business Strategy",
};

export default async function SubjectsPage() {
  // Read language from cookie (default to "es")
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as "en" | "es") || "es";

  const subjects = getActiveSubjects(locale);
  const counts = getSubjectCounts(locale);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <BlogLanguageSync />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation("blogTitle", locale)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {locale === "es" ? "Explora artículos organizados por tema" : "Explore articles organized by topic"}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              postCount={counts.get(subject.slug) || 0}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
