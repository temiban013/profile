// components/blog/subject-filter-tabs.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { blogSubjects } from "@/config/blog-subjects";
import { Code, Brain, TrendingUp } from "lucide-react";

const iconMap = {
  Code,
  Brain,
  TrendingUp,
} as const;

interface SubjectFilterTabsProps {
  /** Currently active subject slug, or null for "all" */
  activeSubject: string | null;
  /** Subjects that have posts (hide empty subjects) */
  availableSubjects: string[];
  /** Locale for display names */
  locale: "en" | "es";
  /** Post counts per subject */
  counts: Record<string, number>;
  /** Total post count (for "All" tab) */
  totalCount: number;
}

export function SubjectFilterTabs({
  activeSubject,
  availableSubjects,
  locale,
  counts,
  totalCount,
}: SubjectFilterTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (subject: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (subject) {
        params.set("subject", subject);
      } else {
        params.delete("subject");
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = (subject: string | null) => {
    const queryString = createQueryString(subject);
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });
  };

  // Filter to only show subjects with posts
  const visibleSubjects = blogSubjects.filter((s) =>
    availableSubjects.includes(s.slug)
  );

  return (
    <div
      className="flex flex-wrap gap-2 mb-8"
      role="tablist"
      aria-label={locale === "en" ? "Filter by subject" : "Filtrar por tema"}
    >
      {/* "All" tab */}
      <FilterTab
        label={locale === "en" ? "All" : "Todos"}
        count={totalCount}
        isActive={activeSubject === null}
        onClick={() => handleFilter(null)}
      />

      {/* Subject tabs */}
      {visibleSubjects.map((subject) => {
        const Icon = iconMap[subject.icon as keyof typeof iconMap];

        return (
          <FilterTab
            key={subject.slug}
            label={subject.name[locale]}
            count={counts[subject.slug] || 0}
            isActive={activeSubject === subject.slug}
            onClick={() => handleFilter(subject.slug)}
            color={subject.color}
            icon={Icon}
          />
        );
      })}
    </div>
  );
}

interface FilterTabProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function FilterTab({
  label,
  count,
  isActive,
  onClick,
  color,
  icon: Icon,
}: FilterTabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-full
        text-sm font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${
          isActive
            ? `${color || "bg-slate-600"} text-white shadow-md`
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      <span
        className={`
        text-xs px-1.5 py-0.5 rounded-full
        ${isActive ? "bg-white/20" : "bg-slate-200 dark:bg-slate-700"}
      `}
      >
        {count}
      </span>
    </button>
  );
}
