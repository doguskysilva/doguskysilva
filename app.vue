<template>
  <div class="flex min-h-screen flex-col">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const config = useAppConfig()

useHead({
  htmlAttrs: {
    lang: config.language || 'en',
  },
  meta: [
    {
      name: 'poweredBy',
      content: 'nuxt-content',
    },
  ],
})

useSchemaOrg([
  defineWebSite({
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: config.language || 'en',
  }),
])
</script>
