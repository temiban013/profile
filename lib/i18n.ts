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
    about: "About me",
    experience: "Experience",
    professionalCareer: "Professional Career",
    careerTimeline: "Timeline of my professional growth and achievements",
    education: "Education",
    academicBackground:
      "Solid foundations for continuous professional development",
    certifications: "Certifications and Affiliations",
    recognitions: "Recognitions and Community Participation",
    projects: "Projects",
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
    heroTitle: "Developing Scalable and Efficient Web Solutions",
    heroSubtitle:
      "Greetings! I'm Mario Ayala, a Software Engineer with over 20 years of experience spanning enterprise systems at Disney to modern AI-augmented development. With a foundation in Computer Science and a passion for emerging technologies, I now leverage Claude Code and agentic programming to deliver solutions that traditionally require entire development teams. My approach combines decades of enterprise expertise with cutting-edge AI tools to create exceptional digital experiences. Shall we collaborate on your next project? 🚀",
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
      title: "Mario Rafael Ayala | Full-Stack AI Engineer",
      description:
        "With over 20 years of experience in software development, I specialize in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects. My academic background in Computer Science (obtained with honors) and my military experience have provided me with a solid foundation of discipline and methodology that I apply to every project. I'm passionate about finding elegant solutions to complex problems using modern technologies like Next.js, TypeScript, and .NET Core, always maintaining a pragmatic, results-oriented approach.",
      ogDescription:
        "With over 20 years of experience in software development, I specialize in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects. My academic background in Computer Science (obtained with honors) and my military experience have provided me with a solid foundation of discipline and methodology that I apply to every project. I'm passionate about finding elegant solutions to complex problems using modern technologies like Next.js, TypeScript, and .NET Core, always maintaining a pragmatic, results-oriented approach.",
      twitterDescription:
        "With over 20 years of experience in software development, I specialize in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects. My academic background in Computer Science (obtained with honors) and my military experience have provided me with a solid foundation of discipline and methodology that I apply to every project. I'm passionate about finding elegant solutions to complex problems using modern technologies like Next.js, TypeScript, and .NET Core, always maintaining a pragmatic, results-oriented approach.",
    },
  },
  es: {
    about: "Sobre mí",
    experience: "Experiencia",
    professionalCareer: "Carrera Profesional",
    careerTimeline: "Cronología de mi crecimiento profesional y logros",
    education: "Educación",
    academicBackground: "Bases sólidas para un desarrollo profesional continuo",
    certifications: "Certificaciones y Afiliaciones",
    recognitions: "Reconocimientos y Participación",
    projects: "Proyectos",
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
    heroTitle: "Desarrollando Soluciones Web Escalables y Eficientes",
    heroSubtitle:
      "¡Saludos! Soy Mario Ayala, un Ingeniero de Software con más de 20 años de experiencia que abarca desde sistemas empresariales en Disney hasta desarrollo moderno aumentado por IA. Con formación en Ciencias de la Computación y pasión por tecnologías emergentes, ahora aprovecho Claude Code y programación agéntica para entregar soluciones que tradicionalmente requieren equipos de desarrollo completos. Mi enfoque combina décadas de experiencia empresarial con herramientas de IA de vanguardia para crear experiencias digitales excepcionales. ¿Colaboramos en su próximo proyecto? 🚀",
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
      title: "Mario Rafael Ayala | Ingeniero Full-Stack de IA",
      description:
        "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
      ogDescription:
        "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
      twitterDescription:
        "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
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
