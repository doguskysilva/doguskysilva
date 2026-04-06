<template>
  <NuxtLayout name="tag" :tag="tag" />
</template>

<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

useSeoMeta({
  title: `Tag: ${tag}`,
  ogTitle: `Tag: ${tag}`,
})
</script>
