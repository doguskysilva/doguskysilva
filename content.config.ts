import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  layout: z.string().optional(),
  listed: z.boolean().default(true),
  language: z.string().optional(),
  alternates: z
    .array(
      z.object({
        hreflang: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  draft: z.boolean().default(false),
  author: z.string().optional(),
  cover: z.string().optional(),
  nocomments: z.boolean().optional(),
  redirect_to_domain: z.string().optional(),
  redirect_to_full_url: z.string().optional(),
})

const authorSchema = z.object({
  username: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  description: z.string().optional(),
  repository: z.string().optional(),
  default: z.boolean().default(false),
})

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['en/**', '**/.*.md'],
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
    authors: defineCollection({
      type: 'data',
      source: 'authors/*.yml',
      schema: authorSchema,
    }),
  },
})
