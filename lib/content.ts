// lib/content.ts
import type {
  Section,
  Project,
  Experience,
  Education,
  Certification,
} from "@/types/contentlayer";

// We'll temporarily mock these until Contentlayer generates the real ones
const allSections: Section[] = [];
const allProjects: Project[] = [];
const allExperiences: Experience[] = [];
const allEducations: Education[] = [];
const allCertifications: Certification[] = [];

// These will be replaced by the Contentlayer imports when ready
// import { allSections, allProjects, allExperiences, allEducations, allCertifications } from 'contentlayer/generated';

export const getSection = (
  section: string,
  language: string
): Section | undefined => {
  return allSections.find(
    (doc) => doc.section === section && doc.language === language
  );
};

export const getProjects = (language: string): Project[] => {
  return allProjects.filter((project) => project.language === language);
};

export const getFeaturedProjects = (language: string): Project[] => {
  return allProjects.filter(
    (project) => project.language === language && project.featured
  );
};

export const getExperiences = (language: string): Experience[] => {
  return allExperiences.filter((exp) => exp.language === language);
};

export const getEducations = (language: string): Education[] => {
  return allEducations.filter((edu) => edu.language === language);
};

export const getCertifications = (language: string): Certification[] => {
  return allCertifications.filter((cert) => cert.language === language);
};

// Type-safe labels for different languages
export type LanguageLabels = {
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
};

export type LanguageKey = "en" | "es";

export const labels: Record<LanguageKey, LanguageLabels> = {
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
  },
};
