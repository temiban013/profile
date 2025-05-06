// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import * as rehypePrettyCodePackage from "rehype-pretty-code";
const rehypePrettyCode = rehypePrettyCodePackage.default as any;

// Define Project document type
export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    technologies: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: true },
    github: { type: "string" },
    demo: { type: "string" },
    featured: { type: "boolean", default: false },
    language: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

// Define Section document type for reusable content sections
export const Section = defineDocumentType(() => ({
  name: "Section",
  filePathPattern: "sections/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    section: { type: "string", required: true },
    language: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments[pathSegments.length - 1];
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Section],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark" }]],
  },
});
