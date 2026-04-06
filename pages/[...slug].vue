<template>
  <NuxtLayout :name="layoutName" :doc="page" />
</template>

<script setup lang="ts">
type PageData = {
  title?: string
  description?: string
  layout?: string
  date?: string
  tags?: string[]
  alternates?: { hreflang: string; href: string }[]
}

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

const p = page.value as PageData

const layoutName = computed(() => {
  const l = (page.value as PageData)?.layout
  return (!l || l === 'default') ? 'default' : l
})

// SEO
const config = useAppConfig() as { url?: string }
const baseUrl = config.url || ''

useSeoMeta({
  title: p.title,
  description: p.description,
  ogTitle: p.title,
  ogDescription: p.description,
  ogType: 'article',
  ogUrl: baseUrl + route.path,
  twitterTitle: p.title,
  twitterCard: 'summary',
})

if (p.date) {
  useSeoMeta({
    articlePublishedTime: new Date(p.date).toISOString(),
  })
}

// hreflang alternates
if (p.alternates?.length) {
  useHead({
    link: p.alternates.map(alt => ({
      rel: 'alternate',
      hreflang: alt.hreflang,
      href: baseUrl + alt.href,
    })),
  })
}
</script>
