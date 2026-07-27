export type LanguageKey = "en" | "es";

const SUPPORTED_LOCALES: ReadonlySet<string> = new Set<LanguageKey>(["en", "es"]);

/** Safely parse a locale string, returning fallback if invalid */
export function parseLocale(value: string | undefined, fallback: LanguageKey = "es"): LanguageKey {
  return value && SUPPORTED_LOCALES.has(value) ? (value as LanguageKey) : fallback;
}

// Type-safe labels for different languages
export type TranslationLabels = {
  about: string;
  experience: string;
  professionalCareer: string;
  careerTimeline: string;
  education: string;
  academicBackground: string;
  certifications: string;
  recognitions: string;
  projects: string;
  services: string;
  featuredWork: string;
  innovativeTech: string;
  viewSite: string;
  viewCode: string;
  downloadResume: string;
  githubProjects: string;
  myTools: string;
  inSummary: string;
  blog: string;
  // Blog section
  blogTitle: string;
  blogSubtitle: string;
  featuredArticles: string;
  recentArticles: string;
  blogStats: string;
  totalArticles: string;
  avgReadingTime: string;
  uniqueTopics: string;
  readingTime: string;
  publishedOn: string;
  readFullArticle: string;
  moreTopics: string;
  article: string;
  articles: string;
  noArticlesInCategory: string;
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  // Button labels
  contactMe: string;
  viewMore: string;
  proprietaryCode: string; // Added this for the "Código Propietario" text
  rightsreserved: string; // Added this for the "Todos los derechos reservados" text
  githubaccount: string;
  linkedinaccount: string;
  sendemail: string;
  youtubeaccount: string;
  whatsappaccount: string;
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    twitterDescription: string;
  };
};

export const translations: Record<LanguageKey, TranslationLabels> = {
  en: {
    about: "The Founder",
    experience: "Experience",
    professionalCareer: "Professional Career",
    careerTimeline: "Timeline of my professional growth and achievements",
    education: "Education",
    academicBackground:
      "Solid foundations for continuous professional development",
    certifications: "Certifications and Affiliations",
    recognitions: "Recognitions and Community Participation",
    projects: "Case Studies",
    services: "Services",
    featuredWork: "Featured Work",
    innovativeTech:
      "Innovative technological solutions I have developed and implemented",
    viewSite: "View Site",
    viewCode: "View Code",
    downloadResume: "Download Resume",
    githubProjects: "GitHub Projects",
    myTools: "My Tools",
    inSummary: "In summary...",
    blog: "Blog",
    // Blog section
    blogTitle: "AI & Software Engineering Insights",
    blogSubtitle: "Sharing knowledge gained from 25+ years of professional software development, covering AI-assisted development, enterprise architecture, and modern web technologies.",
    featuredArticles: "Featured Articles",
    recentArticles: "Recent Articles",
    blogStats: "Blog Statistics",
    totalArticles: "Total Articles",
    avgReadingTime: "Avg. Reading Time",
    uniqueTopics: "Unique Topics",
    readingTime: "min read",
    publishedOn: "Published on",
    readFullArticle: "Read full article",
    moreTopics: "more",
    article: "article",
    articles: "articles",
    noArticlesInCategory: "No articles found in this category.",
    heroTitle: "Digital Solutions Rooted in Heritage",
    heroSubtitle:
      "Nitaíno Digital is a Puerto Rico–based studio founded by Mario Rafael Ayala, a software engineer with 25+ years of experience spanning enterprise systems at Disney to modern AI-augmented development. We build AI-powered web platforms, e-commerce, video productions, and training programs—combining enterprise discipline with agentic AI tooling to deliver what traditionally required entire development teams. Shall we build your next project? 🚀",
    contactMe: "Contact Me",
    viewMore: "View More",
    proprietaryCode: "Proprietary Code",
    rightsreserved: "All rights reserved",
    githubaccount: "GitHub Account",
    linkedinaccount: "LinkedIn Account",
    sendemail: "Send Email",
    youtubeaccount: "YouTube Channel",
    whatsappaccount: "WhatsApp Contact",
    meta: {
      title: "Nitaíno Digital — Mario Rafael Ayala | Full-Stack AI Engineering",
      description:
        "Nitaíno Digital is a Puerto Rico–based studio for AI engineering, web development, video production, and training—founded by Mario Rafael Ayala, a software engineer with over 25 years of experience including key roles at Disney and Office Depot. We combine enterprise architecture discipline with agentic AI development (Claude Code) to deliver high-performance platforms, e-commerce, and digital experiences with a pragmatic, results-oriented approach.",
      ogDescription:
        "Nitaíno Digital is a Puerto Rico–based studio for AI engineering, web development, video production, and training—founded by Mario Rafael Ayala, a software engineer with over 25 years of experience including key roles at Disney and Office Depot. We combine enterprise architecture discipline with agentic AI development (Claude Code) to deliver high-performance platforms, e-commerce, and digital experiences with a pragmatic, results-oriented approach.",
      twitterDescription:
        "Nitaíno Digital is a Puerto Rico–based studio for AI engineering, web development, video production, and training—founded by Mario Rafael Ayala, a software engineer with over 25 years of experience including key roles at Disney and Office Depot. We combine enterprise architecture discipline with agentic AI development (Claude Code) to deliver high-performance platforms, e-commerce, and digital experiences with a pragmatic, results-oriented approach.",
    },
  },
  es: {
    about: "El Fundador",
    experience: "Experiencia",
    professionalCareer: "Carrera Profesional",
    careerTimeline: "Cronología de mi crecimiento profesional y logros",
    education: "Educación",
    academicBackground: "Bases sólidas para un desarrollo profesional continuo",
    certifications: "Certificaciones y Afiliaciones",
    recognitions: "Reconocimientos y Participación",
    projects: "Casos de Estudio",
    services: "Servicios",
    featuredWork: "Trabajo Destacado",
    innovativeTech:
      "Soluciones tecnológicas innovadoras que he desarrollado e implementado",
    viewSite: "Ver Sitio",
    viewCode: "Ver Código",
    downloadResume: "Descarga CV",
    githubProjects: "Proyectos en Github",
    myTools: "Mis herramientas",
    inSummary: "En resumen...",
    blog: "Blog",
    // Blog section
    blogTitle: "Perspectivas de IA e Ingeniería de Software",
    blogSubtitle: "Compartiendo conocimiento adquirido durante 25+ años de desarrollo profesional de software, cubriendo desarrollo asistido por IA, arquitectura empresarial y tecnologías web modernas.",
    featuredArticles: "Artículos Destacados",
    recentArticles: "Artículos Recientes",
    blogStats: "Estadísticas del Blog",
    totalArticles: "Artículos Totales",
    avgReadingTime: "Tiempo Promedio de Lectura",
    uniqueTopics: "Temas Únicos",
    readingTime: "min de lectura",
    publishedOn: "Publicado el",
    readFullArticle: "Leer artículo completo",
    moreTopics: "más",
    article: "artículo",
    articles: "artículos",
    noArticlesInCategory: "No se encontraron artículos en esta categoría.",
    heroTitle: "Soluciones Digitales con Raíces Taínas",
    heroSubtitle:
      "Nitaíno Digital es un estudio con base en Puerto Rico fundado por Mario Rafael Ayala, ingeniero de software con más de 25 años de experiencia que abarca desde sistemas empresariales en Disney hasta desarrollo moderno aumentado por IA. Construimos plataformas web impulsadas por IA, e-commerce, producciones de video y programas de adiestramiento—combinando disciplina empresarial con herramientas de IA agéntica para entregar lo que tradicionalmente requería equipos de desarrollo completos. ¿Construimos su próximo proyecto? 🚀",
    contactMe: "Contáctame",
    viewMore: "Ver Más",
    proprietaryCode: "Código Propietario",
    rightsreserved: "Derechos reservados",
    githubaccount: "Perfil de GitHub",
    linkedinaccount: "Perfil de LinkedIn",
    sendemail: "Enviar Correo",
    youtubeaccount: "Canal de YouTube",
    whatsappaccount: "Contactar por WhatsApp",
    meta: {
      title: "Nitaíno Digital — Mario Rafael Ayala | Ingeniería Full-Stack de IA",
      description:
        "Nitaíno Digital es un estudio con base en Puerto Rico de ingeniería de IA, desarrollo web, producción de video y adiestramiento—fundado por Mario Rafael Ayala, ingeniero de software con más de 25 años de experiencia que incluye roles clave en Disney y Office Depot. Combinamos disciplina de arquitectura empresarial con desarrollo agéntico de IA (Claude Code) para entregar plataformas de alto rendimiento, e-commerce y experiencias digitales con un enfoque pragmático orientado a resultados.",
      ogDescription:
        "Nitaíno Digital es un estudio con base en Puerto Rico de ingeniería de IA, desarrollo web, producción de video y adiestramiento—fundado por Mario Rafael Ayala, ingeniero de software con más de 25 años de experiencia que incluye roles clave en Disney y Office Depot. Combinamos disciplina de arquitectura empresarial con desarrollo agéntico de IA (Claude Code) para entregar plataformas de alto rendimiento, e-commerce y experiencias digitales con un enfoque pragmático orientado a resultados.",
      twitterDescription:
        "Nitaíno Digital es un estudio con base en Puerto Rico de ingeniería de IA, desarrollo web, producción de video y adiestramiento—fundado por Mario Rafael Ayala, ingeniero de software con más de 25 años de experiencia que incluye roles clave en Disney y Office Depot. Combinamos disciplina de arquitectura empresarial con desarrollo agéntico de IA (Claude Code) para entregar plataformas de alto rendimiento, e-commerce y experiencias digitales con un enfoque pragmático orientado a resultados.",
    },
  },
};

// Helper function to get translations
export function getTranslation(
  key: Exclude<keyof TranslationLabels, "meta">,
  language: LanguageKey
): string {
  return translations[language][key];
}

// If you need to access meta, use a separate function:
export function getMetaTranslation(
  language: LanguageKey
): TranslationLabels["meta"] {
  return translations[language].meta;
}
