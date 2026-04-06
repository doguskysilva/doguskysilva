<template>
  <NuxtLayout :name="layoutName" :doc="doc" :surroundings="surroundings" fallback="default" />
</template>

<script setup lang="ts">
import { joinURL, withoutTrailingSlash } from 'ufo'
import { isLegacyPostPath, toContentPath, toPublicPath } from '~/utils/blogPath'

type SurroundingItem = {
  path: string
  title?: string
} | null

type PageDoc = {
  id?: string
  path: string
  title?: string
  description?: string
  date?: string
  layout?: string
  author?: string
  cover?: string
  alternates?: Array<{ hreflang: string; href: string }>
  redirect_to_domain?: string
  redirect_to_full_url?: string
}

const route = useRoute()
const config = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const collectionName = computed(() => (route.path.startsWith('/en') ? 'posts_en' : 'posts'))

const routePath = computed(() => {
  const path = route.path.replace(/\/page\/\d+$/, '')
  if (path === '' || path === '/') {
    return '/'
  }
  return path.replace(/\/$/, '') || '/'
})

if (isLegacyPostPath(routePath.value)) {
  await navigateTo(toPublicPath(routePath.value), { redirectCode: 301 })
}

const pagePath = computed(() => toContentPath(routePath.value))

const { data: doc } = await useAsyncData<PageDoc | null>(
  () => `page:${route.path}`,
  () => queryCollection(collectionName.value).path(pagePath.value).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

if (doc.value.redirect_to_domain) {
  const redirect = `${doc.value.redirect_to_domain}${doc.value.path}`
  useHead({ script: [{ innerHTML: `window.location = "${redirect}"` }] })
}

if (doc.value.redirect_to_full_url) {
  useHead({ script: [{ innerHTML: `window.location = "${doc.value.redirect_to_full_url}"` }] })
}

const layoutName = computed(() => doc.value?.layout || 'default')

const { data: surroundings } = await useAsyncData<SurroundingItem[]>(
  () => `surroundings:${route.path}`,
  () => {
    if (!doc.value?.date) {
      return Promise.resolve([null, null])
    }

    return queryCollectionItemSurroundings(collectionName.value, pagePath.value, {
      fields: ['title', 'path'],
    })
      .where('listed', '=', true)
      .where('draft', '=', false)
      .order('date', 'DESC') as Promise<SurroundingItem[]>
  },
)

const siteUrl = withoutTrailingSlash(runtimeConfig.public.url || config.url)
const canonicalUrl = computed(() => withoutTrailingSlash(joinURL(siteUrl, toPublicPath(doc.value?.path || '/'))))
const author = findAuthor(doc.value?.author)

useSeoMeta({
  title: () => doc.value?.title || config.name,
  description: () => doc.value?.description || config.description,
  ogTitle: () => doc.value?.title || config.name,
  ogDescription: () => doc.value?.description || config.description,
  ogType: () => (doc.value?.date ? 'article' : 'website'),
  ogUrl: () => canonicalUrl.value,
  twitterTitle: () => doc.value?.title || config.name,
  twitterDescription: () => doc.value?.description || config.description,
  twitterCard: 'summary',
  author: author.name,
  articleAuthor: author.name,
})

if (doc.value.cover) {
  useSeoMeta({
    ogImage: joinURL(siteUrl, 'images', doc.value.cover),
    ogImageAlt: doc.value.title,
    twitterImage: joinURL(siteUrl, 'images', doc.value.cover),
  })
}

if (doc.value.date) {
  useSeoMeta({
    articlePublishedTime: new Date(doc.value.date).toISOString(),
    articleModifiedTime: new Date(doc.value.date).toISOString(),
  })
}

const hreflangLinks = computed(() => {
  return (doc.value?.alternates || []).map((item) => ({
    rel: 'alternate',
    hreflang: item.hreflang,
    href: item.href.startsWith('http') ? item.href : joinURL(siteUrl, toPublicPath(item.href)),
  }))
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
    ...hreflangLinks.value,
  ],
}))

useSchemaOrg([
  defineWebPage({
    name: () => doc.value?.title,
    description: () => doc.value?.description,
    inLanguage: config.language,
  }),
])
</script>
