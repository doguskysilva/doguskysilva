<template>
  <div
    class="my-4 rounded-lg border-l-4 p-4 text-sm"
    :class="classes"
    role="alert"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'info' | 'warning' | 'danger' | 'success' | 'tip'
}>()

const classes = computed(() => {
  switch (props.type) {
    case 'warning': return 'border-yellow-400 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    case 'danger': return 'border-red-400 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'success': return 'border-green-400 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'tip': return 'border-purple-400 bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    default: return 'border-sky-400 bg-sky-50 text-sky-800 dark:bg-sky-900/20 dark:text-sky-300'
  }
})
</script>
