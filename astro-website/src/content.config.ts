import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "*.*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    slug: z.string(),
    postId: z.string(),
    locale: z.enum(["en-US", "pt-BR"]),
    availableLocales: z.array(z.enum(["en-US", "pt-BR"])),
    postTags: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).default([]),
    writtenAt: z.coerce.date(),
    assetsPath: z.string().optional(),
  }),
});

export const collections = { posts };
