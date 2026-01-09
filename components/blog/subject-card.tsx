import Link from "next/link";
import { Code, Brain, TrendingUp } from "lucide-react";
import type { BlogSubject } from "@/config/blog-subjects";

const iconMap = {
  Code,
  Brain,
  TrendingUp,
} as const;

interface SubjectCardProps {
  subject: BlogSubject;
  postCount: number;
  locale: "en" | "es";
}

export function SubjectCard({ subject, postCount, locale }: SubjectCardProps) {
  const Icon = iconMap[subject.icon as keyof typeof iconMap];

  return (
    <Link
      href={`/blog/subjects/${subject.slug}`}
      className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${subject.color}`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {subject.name[locale]}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {subject.description[locale]}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {postCount} {locale === "es" ? "articulos" : "articles"}
      </p>
    </Link>
  );
}
