// lib/metadata-i18n.ts
import type { Metadata } from "next";
import type { LanguageKey } from "./contexts/language-context";

export const siteMetadata: Record<LanguageKey, Metadata> = {
  en: {
    title: {
      default: "Mario Rafael Ayala | Software Engineer",
      template: "%s | Mario Rafael Ayala",
    },
    description:
      "With over 20 years of experience in software development, I've specialized in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects.",
    keywords: [
      "mario rafael ayala, feliche, humacao, puerto rico, developer, full stack, software engineer, systems engineer, computer engineer, computing engineer, software engineer, full stack software engineer, backend software engineer, frontend software engineer, full stack software engineer, nextjs, typescript, javascript, react, nodejs, .net core, c#, sql server, mysql, mongodb, firebase, cloud software engineer, vercel",
    ],
    openGraph: {
      siteName: "Mario Rafael Ayala",
      url: "https://www.mariorafaelayala.com/",
      type: "website",
      title: "Mario Rafael Ayala | Software Engineer",
      description:
        "With over 20 years of experience in software development, I've specialized in enterprise architectures and high-performance web applications.",
      locale: "en-US",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Software Engineer",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "With over 20 years of experience in software development, I've specialized in enterprise architectures and high-performance web applications.",
    },
  },
  es: {
    title: {
      default: "Mario Rafael Ayala | Ingeniero de Software",
      template: "%s | Mario Rafael Ayala",
    },
    description:
      "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas.",
    keywords: [
      "mario rafael ayala, feliche, humacao, puerto rico, desarrollador, full stack, ingeniero de software, ingeniero de sistemas, ingeniero informático, ingeniero en computación, ingeniero en software, ingeniero de software full stack, ingeniero de software backend, ingeniero de software frontend, ingeniero de software full stack, nextjs, typescript, javascript, react, nodejs, .net core, c#, sql server, mysql, mongodb, firebase, ingeniero de software en la nube, vercel",
    ],
    openGraph: {
      siteName: "Mario Rafael Ayala",
      url: "https://www.mariorafaelayala.com/",
      type: "website",
      title: "Mario Rafael Ayala | Ingeniero de Software",
      description:
        "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento.",
      locale: "es-PR",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Ingeniero de Software",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento.",
    },
  },
};

// Helper function to generate metadata based on language
export function generateMetadata(language: LanguageKey): Metadata {
  return {
    ...siteMetadata[language],
    metadataBase: new URL("https://www.mariorafaelayala.com/"),
    alternates: {
      canonical: "https://www.mariorafaelayala.com/",
      languages: {
        "en-US": "https://www.mariorafaelayala.com/?lang=en",
        "es-PR": "https://www.mariorafaelayala.com/?lang=es",
      },
    },
    authors: [
      { name: "Mario R. Ayala", url: "https://www.mariorafaelayala.com" },
    ],
    creator: "Mario R. Ayala",
    publisher: "Mario R. Ayala",
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        {
          url: "https://www.mariorafaelayala.com/favicon.ico",
          type: "image/x-icon",
        },
      ],
      apple: [
        {
          url: "https://www.mariorafaelayala.com/mra-logo-icon.png",
          type: "image/png",
        },
      ],
      shortcut: [
        {
          url: "https://www.mariorafaelayala.com/mra-logo-icon.png",
          type: "image/png",
        },
      ],
    },
    verification: {
      google:
        "google-site-verification=2uRJuyTYErHg2stXKELBTwZif3Kc7FlbMjyNDwwNwnQ",
    },
  };
}
