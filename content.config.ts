import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  layout: z.string().optional(),
  listed: z.boolean().optional(),
  language: z.string().optional(),
  alternates: z.array(
    z.object({ hreflang: z.string(), href: z.string() }),
  ).optional(),
  draft: z.boolean().optional(),
  readingTime: z.number().optional(),
  nocomments: z.boolean().optional(),
  cover: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    posts_pt: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['en/**', '**/.*.md'],
        prefix: '/pt',
      },
      schema: postSchema,
    }),
    posts_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        exclude: ['**/.*.md'],
        prefix: '/en',
      },
      schema: postSchema,
    }),
  },
})
