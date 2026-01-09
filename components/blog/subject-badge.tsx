"use client";

import Link from "next/link";
import { Code, Brain, TrendingUp } from "lucide-react";
import { getSubject } from "@/config/blog-subjects";

const iconMap = {
  Code,
  Brain,
  TrendingUp,
} as const;

interface SubjectBadgeProps {
  subject: string;
  locale: "en" | "es";
  size?: "sm" | "md";
  linkable?: boolean;
}

export function SubjectBadge({
  subject,
  locale,
  size = "md",
  linkable = true,
}: SubjectBadgeProps) {
  const subjectData = getSubject(subject);
  if (!subjectData) return null;

  const Icon = iconMap[subjectData.icon as keyof typeof iconMap];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  const content = (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full
        ${subjectData.color} text-white font-medium
        ${sizeClasses[size]}
        ${linkable ? "hover:opacity-90 transition-opacity" : ""}
      `}
    >
      {Icon && <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />}
      {subjectData.name[locale]}
    </span>
  );

  if (linkable) {
    return <Link href={`/blog/subjects/${subject}`}>{content}</Link>;
  }

  return content;
}
