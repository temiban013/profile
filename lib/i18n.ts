export type LanguageKey = "en" | "es";

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
    heroTitle: "Developing Scalable and Efficient Web Solutions",
    heroSubtitle:
      "Greetings! I'm Mario Ayala, a Software Engineer with over 20 years of experience in enterprise application development. With a background in Computer Science and extensive experience at companies like Disney, I specialize in creating robust and scalable digital solutions that transform ideas into functional realities. My approach combines technical precision with intuitive design to deliver exceptional digital experiences. Shall we collaborate on your next project? 🚀",
    contactMe: "Contact Me",
    viewMore: "View More",
    proprietaryCode: "Proprietary Code",
    rightsreserved: "All rights reserved",
    githubaccount: "GitHub Account",
    linkedinaccount: "LinkedIn Account",
    sendemail: "Send Email",
    youtubeaccount: "YouTube Channel",
    whatsappaccount: "WhatsApp Contact",
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
    heroTitle: "Desarrollando Soluciones Web Escalables y Eficientes",
    heroSubtitle:
      "¡Saludos! Soy Mario Ayala, un Ingeniero de Software con más de 20 años de experiencia en desarrollo de aplicaciones empresariales. Con formación académica en Ciencias de la Computación y amplia experiencia en empresas de renombre como Disney, me especializo en crear soluciones digitales robustas y escalables que transforman ideas en realidades funcionales. Mi enfoque combina precisión técnica con diseño intuitivo para ofrecer experiencias digitales excepcionales. ¿Colaboramos en su próximo proyecto? 🚀",
    contactMe: "Contáctame",
    viewMore: "Ver Más",
    proprietaryCode: "Código Propietario",
    rightsreserved: "Derechos reservados",
    githubaccount: "Perfil de GitHub",
    linkedinaccount: "Perfil de LinkedIn",
    sendemail: "Enviar Correo",
    youtubeaccount: "Canal de YouTube",
    whatsappaccount: "Contactar por WhatsApp",
  },
};

// Helper function to get translations
export function getTranslation(
  key: keyof TranslationLabels,
  language: LanguageKey
): string {
  return translations[language][key];
}
