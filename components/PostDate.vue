<template>
  <time :datetime="date" class="post-date">{{ formatted }}</time>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: string
  locale?: string
}>()

const formatted = computed(() => {
  const d = new Date(props.date + 'T00:00:00')
  return d.toLocaleDateString(props.locale ?? 'pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>
