<template>
  <NuxtLayout name="archives" fallback="default" />
</template>

<script setup lang="ts">
const title = 'Blog'
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
