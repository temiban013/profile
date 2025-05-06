// types/contentlayer.d.ts
// These types will be replaced by Contentlayer's generated types once they're available
declare module "contentlayer/generated" {
  // This is a temporary declaration until Contentlayer generates proper types
  export const allProjects: any[];
  export const allSections: any[];
}
export interface Section {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: "Section";
  title: string;
  language: "en" | "es";
  section: string;
  body: {
    raw: string;
    code: string;
  };
  slug: string;
}

export interface Project {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: "Project";
  title: string;
  description: string;
  language: "en" | "es";
  date: string;
  technologies: string[];
  image: string;
  demo?: string;
  github?: string;
  featured: boolean;
  body: {
    raw: string;
    code: string;
  };
  slug: string;
}

export interface Experience {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: "Experience";
  title: string;
  company: string;
  language: "en" | "es";
  location: string;
  period: string;
  description: string;
  technologies: string[];
  body: {
    raw: string;
    code: string;
  };
  slug: string;
}

export interface Education {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: "Education";
  degree: string;
  institution: string;
  language: "en" | "es";
  location: string;
  period: string;
  honors?: string;
  body: {
    raw: string;
    code: string;
  };
  slug: string;
}

export interface Certification {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: "Certification";
  title: string;
  organization: string;
  language: "en" | "es";
  location: string;
  period: string;
  url?: string;
  body: {
    raw: string;
    code: string;
  };
  slug: string;
}

// Fix for contentlayer/generated import
declare module "contentlayer/generated" {
  export const allSections: Section[];
  export const allProjects: Project[];
  export const allExperiences: Experience[];
  export const allEducations: Education[];
  export const allCertifications: Certification[];
}
