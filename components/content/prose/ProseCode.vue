<template>
  <span class="inline-code">
    <slot />
  </span>
</template>

<style scoped>
.inline-code {
  @apply font-mono text-sm bg-gray-100 dark:bg-neutral-800 text-pink-600 dark:text-pink-400 rounded px-1 py-0.5;
}
</style>
