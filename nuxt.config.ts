// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [
    '@bloggrify/core',
  ],
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    langDir: 'i18n/locales/',
  },
})
