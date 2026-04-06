<template>
  <NuxtLayout name="archives" :category="category" fallback="default" />
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const category = Array.isArray(slug) ? slug[0] : slug

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

const title = `Category: ${category}`

useSeoMeta({
  title,
  description: title,
  ogTitle: title,
  ogDescription: title,
  twitterTitle: title,
  twitterDescription: title,
})
</script>
