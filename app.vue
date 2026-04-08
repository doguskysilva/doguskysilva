<template>
  <div class="flex min-h-screen flex-col">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const config = useAppConfig()
const route = useRoute()

const currentLanguage = computed(() => {
  return route.path.startsWith('/en') ? 'en-US' : 'pt-BR'
})

useHead(() => ({
  htmlAttrs: {
    lang: currentLanguage.value.toLowerCase(),
  },
  meta: [
    {
      name: 'poweredBy',
      content: 'nuxt-content',
    },
  ],
}))

useSchemaOrg([
  defineWebSite({
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: () => currentLanguage.value,
  }),
])
</script>
