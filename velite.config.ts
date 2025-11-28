import { defineConfig, defineCollection, s } from "velite";
import rehypeShiki from "@shikijs/rehype";
import readingTime from "reading-time";

// Compute reading time from raw content
const computeReadingTime = (content: string): number => {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
};

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("post"),
      description: s.string().max(300),
      date: s.isodate(),
      updated: s.isodate().optional(),
      author: s.string().default("mario-ayala"),
      locale: s.enum(["en", "es"]),
      category: s.string(),
      tags: s.array(s.string()).default([]),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      image: s.string().optional(),
      translationSlug: s.string().optional(),
      body: s.mdx(),
      raw: s.raw(),
    })
    .transform((data) => ({
      ...data,
      readingTime: computeReadingTime(data.raw),
      url: `/blog/${data.slug}`,
    })),
});

const authors = defineCollection({
  name: "Author",
  pattern: "authors/*.json",
  schema: s.object({
    name: s.string(),
    slug: s.slug("author"),
    bio: s.string().optional(),
    avatar: s.string().optional(),
    social: s
      .object({
        linkedin: s.string().optional(),
        github: s.string().optional(),
        twitter: s.string().optional(),
        website: s.string().optional(),
      })
      .optional(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, authors },
  mdx: {
    rehypePlugins: [
      [
        rehypeShiki as never,
        {
          theme: "github-dark",
        },
      ],
    ],
  },
});
