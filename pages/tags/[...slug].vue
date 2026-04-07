<template>
  <NuxtLayout name="tag" :tag="tag" fallback="default" />
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const tag = Array.isArray(slug) ? slug[0] : slug

if (!tag) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found', fatal: true })
}

const title = `Tag: ${tag}`

useSeoMeta({
  title,
  description: title,
  ogTitle: title,
  ogDescription: title,
  twitterTitle: title,
  twitterDescription: title,
})
</script>
