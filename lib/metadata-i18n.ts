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
      "Senior Software Engineer with 25+ years enterprise experience at Disney Parks, Office Depot. Expert in Next.js 15, TypeScript, React 19, PostgreSQL, enterprise architecture. Available for remote work, consulting. Specialized in ROI-focused digital transformation, cross-platform integration, and scalable business solutions. MS Computer Science (Magna Cum Laude).",
    keywords: [
      "mario rafael ayala",
      "senior software engineer",
      "disney software engineer",
      "puerto rico software engineer",
      "next.js 15 developer",
      "react 19 expert",
      "typescript expert",
      "postgresql developer",
      "full stack engineer",
      "enterprise software architect",
      "cross-platform architecture",
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
      "nextjs 15 typescript",
      "react 19 postgresql",
      "roi focused development",
      "business value software",
      "cafe papamin developer",
      "pfdh.org architect",
      "asl platform engineer",
      "ms computer science magna cum laude",
      "ellis university graduate",
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
        "Senior Software Engineer with 25+ years at Disney Parks, Office Depot. Expert in Next.js 15, React 19, PostgreSQL, Enterprise Architecture. ROI-focused portfolio: Café Papamín e-commerce, PFDH.org platform, modern web development excellence. Available for remote work & consulting.",
      locale: "en-US",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Senior Software Engineer | Disney Alumni | Hiring",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "25+ years enterprise experience at Disney & Office Depot. Next.js 15/React 19/PostgreSQL expert. MS Computer Science. Available for remote work. ROI-focused portfolio: modern e-commerce, web platforms, enterprise systems.",
    },
  },
  es: {
    title: {
      default: "Mario Rafael Ayala | Ingeniero de Software Senior | 25+ Años Experiencia | Ex Disney",
      template: "%s | Mario Rafael Ayala - Ingeniero de Software Senior",
    },
    description:
      "Ingeniero de Software Senior con 25+ años de experiencia empresarial en Disney Parks, Office Depot. Experto en Next.js 15, TypeScript, React 19, PostgreSQL, arquitectura empresarial. Disponible para trabajo remoto, consultoría. Especializado en transformación digital enfocada en ROI, integración multi-plataforma y soluciones empresariales escalables. MS Ciencias de la Computación (Magna Cum Laude).",
    keywords: [
      "mario rafael ayala",
      "ingeniero de software senior",
      "ingeniero disney",
      "ingeniero software puerto rico",
      "desarrollador next.js 15",
      "experto react 19",
      "experto typescript",
      "desarrollador postgresql",
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
      "nextjs 15 typescript",
      "react 19 postgresql",
      "desarrollo enfocado roi",
      "software valor empresarial",
      "desarrollador cafe papamin",
      "arquitecto pfdh.org",
      "ingeniero plataforma asl",
      "ms ciencias computacion magna cum laude",
      "graduado ellis university",
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
        "Ingeniero de Software Senior con 25+ años en Disney Parks, Office Depot. Experto en Next.js 15, React 19, PostgreSQL, Arquitectura Empresarial. Portfolio enfocado en ROI: Café Papamín e-commerce, plataforma PFDH.org, desarrollo web moderno. Disponible para trabajo remoto y consultoría.",
      locale: "es-PR",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mario Rafael Ayala | Ingeniero de Software Senior | Ex Disney | Contratación",
      images: "https://www.mariorafaelayala.com/mra-profile.jpg",
      description:
        "25+ años experiencia empresarial en Disney y Office Depot. Experto Next.js 15/React 19/PostgreSQL. MS Ciencias Computación. Disponible trabajo remoto. Portfolio enfocado en ROI: e-commerce moderno, plataformas web, sistemas empresariales.",
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
