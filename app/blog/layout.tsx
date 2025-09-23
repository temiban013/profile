// app/blog/layout.tsx
import { Metadata } from "next";

/**
 * Blog layout with bilingual SEO metadata
 * This provides proper metadata for the blog section
 */
export async function generateMetadata(): Promise<Metadata> {
  // Default to English for SEO, but the client component will handle language switching
  const baseMetadata = {
    title: "Blog | Software Engineering Insights",
    description:
      "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience. Available in English and Spanish.",
    keywords: [
      "software engineering",
      "programming",
      "web development",
      "Next.js",
      "TypeScript",
      "career insights",
      "ingeniería de software",
      "programación",
      "desarrollo web",
      "perspectivas profesionales",
    ],
    openGraph: {
      title: "Blog | Software Engineering Insights",
      description:
        "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
      type: "website",
      url: "/blog",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Software Engineering Insights",
      description:
        "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
    },
    alternates: {
      languages: {
        'en': '/blog?lang=en',
        'es': '/blog?lang=es',
      },
    },
  };

  return baseMetadata;
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}