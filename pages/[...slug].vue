<template>
  <NuxtLayout :name="layoutName" :doc="page" />
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const collection = computed(() => locale.value === 'en' ? 'posts_en' : 'posts_pt')

// Strip /page/N pagination suffix when resolving document path
const docPath = computed(() => {
  const path = route.path
  return path.replace(/\/page\/\d+$/, '') || `/${locale.value}`
})

const { data: page, error } = await useAsyncData(
  `page-${route.path}`,
  () => queryCollection(collection.value as 'posts_pt' | 'posts_en')
    .path(docPath.value)
    .first(),
)

if (!page.value || error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const layoutName = computed(() => {
  const l = (page.value as any)?.layout
  if (!l || l === 'default') return 'default'
  return l
})

// SEO
const config = useAppConfig()
const baseUrl = (config as any).url || ''

useSeoMeta({
  title: (page.value as any).title,
  description: (page.value as any).description,
  ogTitle: (page.value as any).title,
  ogDescription: (page.value as any).description,
  ogType: 'article',
  ogUrl: baseUrl + route.path,
  twitterTitle: (page.value as any).title,
  twitterCard: 'summary',
})

if ((page.value as any).date) {
  useSeoMeta({
    articlePublishedTime: new Date((page.value as any).date).toISOString(),
  })
}

// hreflang alternates
const alternates = (page.value as any).alternates as { hreflang: string, href: string }[] | undefined
if (alternates?.length) {
  useHead({
    link: [
      ...alternates.map(alt => ({
        rel: 'alternate',
        hreflang: alt.hreflang,
        href: baseUrl + alt.href,
      })),
    ],
  })
}
</script>
