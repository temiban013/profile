// lib/translations.ts
export type LanguageKey = "en" | "es";

export type TranslationKeys =
  | "about"
  | "experience"
  | "projects"
  | "fullStackEngineer"
  | "heroTitle"
  | "heroContent"
  | "inSummary"
  | "downloadResume"
  | "githubProjects"
  | "viewSite"
  | "viewCode";

export const translations: Record<
  LanguageKey,
  Record<TranslationKeys, string>
> = {
  en: {
    about: "About me",
    experience: "Experience",
    projects: "Projects",
    fullStackEngineer: "Full Stack Software Engineer",
    heroTitle: "Developing Scalable and Efficient Web Solutions",
    heroContent:
      "Hello! I'm Mario Ayala, a Software Engineer with over 20 years of experience in enterprise application development. With a background in Computer Science and extensive experience in companies like Disney, I specialize in creating robust and scalable digital solutions that transform ideas into functional realities. My approach combines technical precision with intuitive design to deliver exceptional digital experiences. Shall we collaborate on your next project? 🚀",
    inSummary: "In summary...",
    downloadResume: "Download Resume",
    githubProjects: "GitHub Projects",
    viewSite: "View Site",
    viewCode: "View Code",
  },
  es: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    fullStackEngineer: "Ingeniero de Software Full Stack",
    heroTitle: "Desarrollando Soluciones Web Escalables y Eficientes",
    heroContent:
      "¡Saludos! Soy Mario Ayala, un Ingeniero de Software con más de 20 años de experiencia en desarrollo de aplicaciones empresariales. Con formación académica en Ciencias de la Computación y amplia experiencia en empresas de renombre como Disney, me especializo en crear soluciones digitales robustas y escalables que transforman ideas en realidades funcionales. Mi enfoque combina precisión técnica con diseño intuitivo para ofrecer experiencias digitales excepcionales. ¿Colaboramos en su próximo proyecto? 🚀",
    inSummary: "En resumen...",
    downloadResume: "Descarga CV",
    githubProjects: "Proyectos en Github",
    viewSite: "Ver Sitio",
    viewCode: "Ver Código",
  },
};

export const getTranslation = (
  key: TranslationKeys,
  language: LanguageKey
): string => {
  return translations[language][key];
};
