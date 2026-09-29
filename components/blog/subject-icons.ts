// components/blog/subject-icons.ts
// Shared icon map for blog subject components
import { Code, Brain, TrendingUp, Accessibility, HandHeart } from "lucide-react";

/**
 * Maps Lucide icon names (from blog-subjects config) to their React components.
 * Used by SubjectBadge, SubjectCard, and SubjectFilterTabs.
 */
export const subjectIconMap = {
  Code,
  Brain,
  TrendingUp,
  Accessibility,
  HandHeart,
} as const;

export type SubjectIconName = keyof typeof subjectIconMap;
