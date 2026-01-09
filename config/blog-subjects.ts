// config/blog-subjects.ts
// Central taxonomy definition for blog subjects

export interface BlogSubject {
  /** URL-safe identifier */
  slug: string;
  /** Display names by locale */
  name: {
    en: string;
    es: string;
  };
  /** SEO descriptions by locale */
  description: {
    en: string;
    es: string;
  };
  /** Tailwind color class for badges */
  color: string;
  /** Lucide icon name */
  icon: string;
  /** Display order (lower = first) */
  order: number;
}

export const blogSubjects: BlogSubject[] = [
  {
    slug: "web-development",
    name: {
      en: "Web Development",
      es: "Desarrollo Web",
    },
    description: {
      en: "Modern web development techniques, frameworks, and best practices",
      es: "Tecnicas modernas de desarrollo web, frameworks y mejores practicas",
    },
    color: "bg-blue-500",
    icon: "Code",
    order: 1,
  },
  {
    slug: "ai-tools",
    name: {
      en: "AI Tools",
      es: "Herramientas de IA",
    },
    description: {
      en: "Artificial intelligence tools and workflows for developers",
      es: "Herramientas de inteligencia artificial y flujos de trabajo para desarrolladores",
    },
    color: "bg-purple-500",
    icon: "Brain",
    order: 2,
  },
  {
    slug: "business",
    name: {
      en: "Business & Strategy",
      es: "Negocios y Estrategia",
    },
    description: {
      en: "Business development, consulting, and digital transformation",
      es: "Desarrollo de negocios, consultoria y transformacion digital",
    },
    color: "bg-emerald-500",
    icon: "TrendingUp",
    order: 3,
  },
] as const;

/** Get all subject slugs for validation */
export const subjectSlugs = blogSubjects.map((s) => s.slug) as [string, ...string[]];

/** Get subject by slug */
export function getSubject(slug: string): BlogSubject | undefined {
  return blogSubjects.find((s) => s.slug === slug);
}

/** Get localized subject name */
export function getSubjectName(slug: string, locale: "en" | "es"): string {
  return getSubject(slug)?.name[locale] ?? slug;
}
