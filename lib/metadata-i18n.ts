// lib/metadata-i18n.ts
import type { Metadata } from "next";
import type { LanguageKey } from "./contexts/language-context";

export const siteMetadata: Record<LanguageKey, Metadata> = {
  en: {
    title: {
      default: "Mario Rafael Ayala | Senior Software Engineer | 25+ Years Experience | Disney Alumni",
      template: "%s | Mario Rafael Ayala - Senior Software Engineer",
    },
    description:
      "Senior Software Engineer with 25+ years enterprise experience at Disney Parks, Office Depot. Expert in Next.js, TypeScript, React, .NET. Available for remote work, consulting. Specialized in enterprise architecture, digital transformation, and high-performance web applications.",
    keywords: [
      "mario rafael ayala",
      "senior software engineer",
      "disney software engineer",
      "puerto rico software engineer",
      "next.js developer",
      "typescript expert",
      "react developer",
      "full stack engineer",
      "enterprise software architect",
      "disney parks engineer",
      "office depot developer",
      "25 years experience",
      "software engineer remote",
      "javascript consultant",
      "enterprise architecture",
      "digital transformation",
      "systems integration",
      "humacao puerto rico",
      "caribbean software engineer",
      "puerto rico tech talent",
      "independent technology consultant",
      "software engineering consultant",
      "enterprise systems expert",
      "web application developer",
      "database architect",
      "cloud software engineer",
      "microsoft stack developer",
      ".net core expert",
      "sql server developer",
      "software team lead",
      "technical architect",
      "scalable systems",
      "performance optimization",
      "nextjs typescript",
      "react node.js",
      "feliche humacao",
      "mario ayala developer",
      "mario ayala engineer",
      "software engineer disney experience",
      "enterprise software solutions",
      "puerto rico developer remote",
      "senior engineer available",
      "software architect consultant"
    ],
    openGraph: {
      siteName: "Mario Rafael Ayala - Senior Software Engineer",
      url: "https://www.mariorafaelayala.com/",
      type: "website",
      title: "Mario Rafael Ayala | Senior Software Engineer | Disney Alumni | Available for Hire",
      description:
        "Senior Software Engineer with 25+ years at Disney Parks, Office Depot. Expert in Next.js, TypeScript, Enterprise Architecture. Available for remote work & consulting. Portfolio showcases enterprise-scale projects.",
      locale: "en-US",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Senior Software Engineer | Disney Alumni | Hiring",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "25+ years enterprise experience at Disney & Office Depot. Next.js/TypeScript expert. Available for remote work. Portfolio: enterprise systems, digital transformation projects.",
    },
  },
  es: {
    title: {
      default: "Mario Rafael Ayala | Ingeniero de Software Senior | 25+ Años Experiencia | Ex Disney",
      template: "%s | Mario Rafael Ayala - Ingeniero de Software Senior",
    },
    description:
      "Ingeniero de Software Senior con 25+ años de experiencia empresarial en Disney Parks, Office Depot. Experto en Next.js, TypeScript, React, .NET. Disponible para trabajo remoto, consultoría. Especializado en arquitectura empresarial, transformación digital y aplicaciones web de alto rendimiento.",
    keywords: [
      "mario rafael ayala",
      "ingeniero de software senior",
      "ingeniero disney",
      "ingeniero software puerto rico",
      "desarrollador next.js",
      "experto typescript",
      "desarrollador react",
      "ingeniero full stack",
      "arquitecto software empresarial",
      "ingeniero disney parks",
      "desarrollador office depot",
      "25 años experiencia",
      "ingeniero software remoto",
      "consultor javascript",
      "arquitectura empresarial",
      "transformación digital",
      "integración sistemas",
      "humacao puerto rico",
      "ingeniero software caribe",
      "talento tech puerto rico",
      "consultor tecnología independiente",
      "consultor ingeniería software",
      "experto sistemas empresariales",
      "desarrollador aplicaciones web",
      "arquitecto base datos",
      "ingeniero software nube",
      "desarrollador stack microsoft",
      "experto .net core",
      "desarrollador sql server",
      "líder equipo software",
      "arquitecto técnico",
      "sistemas escalables",
      "optimización rendimiento",
      "nextjs typescript",
      "react node.js",
      "feliche humacao",
      "mario ayala desarrollador",
      "mario ayala ingeniero",
      "ingeniero software experiencia disney",
      "soluciones software empresariales",
      "desarrollador puerto rico remoto",
      "ingeniero senior disponible",
      "arquitecto software consultor"
    ],
    openGraph: {
      siteName: "Mario Rafael Ayala - Ingeniero de Software Senior",
      url: "https://www.mariorafaelayala.com/",
      type: "website",
      title: "Mario Rafael Ayala | Ingeniero de Software Senior | Ex Disney | Disponible para Contratar",
      description:
        "Ingeniero de Software Senior con 25+ años en Disney Parks, Office Depot. Experto en Next.js, TypeScript, Arquitectura Empresarial. Disponible para trabajo remoto y consultoría. Portfolio con proyectos empresariales.",
      locale: "es-PR",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Ingeniero de Software Senior | Ex Disney | Contratación",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "25+ años experiencia empresarial en Disney y Office Depot. Experto Next.js/TypeScript. Disponible trabajo remoto. Portfolio: sistemas empresariales, proyectos transformación digital.",
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
