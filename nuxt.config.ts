export default defineNuxtConfig({
  // https://github.com/nuxt-themes/alpine
  extends: '@nuxt-themes/alpine',

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: ["en", "pt"],
    strategy: "prefix_except_default",
    defaultLocale: "en",
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  }
})
