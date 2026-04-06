<template>
  <NuxtLayout name="blog" />
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: computed(() => t('blog.title')),
  ogTitle: computed(() => t('blog.title')),
})
</script>
