// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// Define content type for section content (hero, about, etc)
export const Section = defineDocumentType(() => ({
  name: "Section",
  filePathPattern: `sections/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    language: { type: "string", required: true },
    section: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // Extract section-language from path
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

// Define Project content type
export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    language: { type: "string", required: true },
    date: { type: "date", required: true },
    technologies: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: true },
    urlSitio: { type: "string" },
    urlGithub: { type: "string" },
    featured: { type: "boolean", default: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // Extract project-language from path
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

// Define Experience content type
export const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: `experiences/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    company: { type: "string", required: true },
    language: { type: "string", required: true },
    location: { type: "string", required: true },
    period: { type: "string", required: true },
    description: { type: "string", required: true },
    technologies: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // Extract experience-language from path
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

// Define Education content type
export const Education = defineDocumentType(() => ({
  name: "Education",
  filePathPattern: `education/**/*.mdx`,
  contentType: "mdx",
  fields: {
    degree: { type: "string", required: true },
    institution: { type: "string", required: true },
    language: { type: "string", required: true },
    location: { type: "string", required: true },
    period: { type: "string", required: true },
    honors: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // Extract education-language from path
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

// Define Certification content type
export const Certification = defineDocumentType(() => ({
  name: "Certification",
  filePathPattern: `certifications/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    organization: { type: "string", required: true },
    language: { type: "string", required: true },
    location: { type: "string", required: true },
    period: { type: "string", required: true },
    url: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // Extract certification-language from path
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Section, Project, Experience, Education, Certification],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // Remove direct shiki reference causing the issue
          onVisitHighlightedLine(node) {
            node.properties.className = node.properties.className || [];
            node.properties.className.push("highlighted");
          },
        },
      ],
    ],
  },
});
