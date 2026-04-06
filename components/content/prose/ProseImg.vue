<template>
  <figure class="my-6">
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt || ''"
      class="rounded-lg w-full"
      loading="lazy"
    />
    <img
      v-else
      :src="src"
      :alt="alt || ''"
      class="rounded-lg w-full"
      loading="lazy"
    >
    <figcaption v-if="alt" class="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>
