<template>
  <NuxtLayout name="posts" fallback="default" />
</template>

<script setup lang="ts">
const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const page = Number(id)

if (!Number.isInteger(page) || page < 2) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = `Posts - Page ${page}`
const description = 'List of all posts'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
})
</script>
