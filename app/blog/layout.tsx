// app/blog/layout.tsx
import { Metadata } from "next";

/**
 * Blog layout with bilingual SEO metadata
 * This provides proper metadata for the blog section
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mariorafaelayala.com';

  const baseMetadata = {
    title: "Blog | Software Engineering Insights",
    description:
      "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience. Available in English and Spanish. | Explora perspectivas de ingeniería de software, tutoriales y lecciones profesionales de 25+ años de experiencia en desarrollo.",
    keywords: [
      "software engineering",
      "programming",
      "web development",
      "Next.js",
      "TypeScript",
      "career insights",
      "tech blog",
      "ingeniería de software",
      "programación",
      "desarrollo web",
      "perspectivas profesionales",
      "blog técnico",
      "Mario Rafael Ayala",
      "Puerto Rico developer",
      "desarrollador Puerto Rico",
    ],

    // Canonical URL
    alternates: {
      canonical: `${baseUrl}/blog`,
      languages: {
        'en-US': `${baseUrl}/blog?lang=en`,
        'es-ES': `${baseUrl}/blog?lang=es`,
        'en': `${baseUrl}/blog?lang=en`,
        'es': `${baseUrl}/blog?lang=es`,
      },
    },

    openGraph: {
      title: "Blog | Software Engineering Insights",
      description:
        "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
      type: "website",
      url: `${baseUrl}/blog`,
      siteName: 'Mario Rafael Ayala - Software Engineer',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/og-blog-image.jpg`, // You may want to create this
          width: 1200,
          height: 630,
          alt: 'Mario Rafael Ayala Blog - Software Engineering Insights',
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Blog | Software Engineering Insights",
      description:
        "Explore software engineering insights, tutorials, and career lessons from 25+ years of professional development experience.",
      creator: '@marioayala', // Add your Twitter handle if you have one
      images: [`${baseUrl}/og-blog-image.jpg`],
    },

    // Additional SEO enhancements
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },

    // Content language
    other: {
      'Content-Language': 'en,es',
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