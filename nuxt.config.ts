// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  content: {
    highlight: {
      langs: [
        'json', 'js', 'javascript', 'ts', 'typescript', 'html', 'css', 'vue',
        'shell', 'bash', 'md', 'yaml', 'python', 'c', 'cpp', 'sql', 'java', 'xml',
      ],
      theme: {
        default: 'catppuccin-frappe',
        dark: 'github-dark',
      },
    },
    build: {
      hooks: {
        'content:file:afterParse': (file: Record<string, unknown>) => {
          if (typeof file.path === 'string' && String(file.path).endsWith('.md')) {
            const wordCount = countWords((file.body as Record<string, unknown>)?.children as unknown[])
            file.readingTime = Math.ceil(wordCount / 200)
          }
        },
      },
    },
  },

  image: {
    format: ['webp'],
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  nitro: {
    prerender: {
      routes: ['/rss.xml', '/api/__sitemap__/urls'],
    },
  },

  i18n: {
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt',
    strategy: 'prefix',
    langDir: 'i18n/locales/',
  },
})

function countWords(nodes: unknown[]): number {
  if (!Array.isArray(nodes)) return 0
  let count = 0
  for (const node of nodes) {
    const n = node as Record<string, unknown>
    if (n.type === 'text' && typeof n.value === 'string') {
      count += n.value.trim().split(/\s+/).filter(Boolean).length
    }
    if (Array.isArray(n.children)) {
      count += countWords(n.children as unknown[])
    }
  }
  return count
}
