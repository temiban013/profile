import { Metadata } from "next";
import { getActiveSubjects, getSubjectCounts } from "@/lib/blog/subjects";
import { SubjectCard } from "@/components/blog/subject-card";

export const metadata: Metadata = {
  title: "Blog Subjects | Mario Ayala",
  description: "Browse articles by subject - Web Development, AI Tools, and Business Strategy",
};

export default function SubjectsPage() {
  const subjects = getActiveSubjects();
  const counts = getSubjectCounts();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Subject
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore articles organized by topic
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              postCount={counts.get(subject.slug) || 0}
              locale="en"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
