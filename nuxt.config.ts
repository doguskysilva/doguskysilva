const siteUrl = process.env.BASE_URL || 'https://dogusky.netlify.app'

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
  runtimeConfig: {
    public: {
      url: siteUrl,
    },
  },
  site: {
    url: siteUrl,
  },
  routeRules: {
    '/api/search': {
      prerender: true,
    },
  },
  i18n: {
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Portugues', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt',
    strategy: 'prefix',
    langDir: 'locales/',
  },
  image: {
    format: ['webp'],
  },
  sitemap: {
    includeAppSources: true,
    sources: ['/api/__sitemap__/urls'],
  },
  content: {
    markdown: {
      remarkPlugins: ['remark-reading-time', 'remark-math'],
      rehypePlugins: ['rehype-katex'],
    },
    highlight: {
      langs: [
        'json',
        'js',
        'javascript',
        'ts',
        'typescript',
        'html',
        'css',
        'vue',
        'shell',
        'bash',
        'md',
        'yaml',
        'python',
        'c',
        'csharp',
        'cpp',
        'sql',
        'java',
        'xml',
        'scala',
        'kotlin',
      ],
      theme: {
        default: 'catppuccin-frappe',
        dark: 'github-dark',
      },
    },
  },
  nitro: {
    prerender: {
      routes: ['/rss.xml', '/api/__sitemap__/urls'],
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['hyvor-talk-comments'].includes(tag),
    },
  },
})
