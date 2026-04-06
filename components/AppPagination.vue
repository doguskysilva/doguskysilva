<template>
  <nav v-if="total > 1" class="mt-10 flex items-center justify-center gap-2 text-sm">
    <NuxtLink
      v-if="currentPage > 1"
      :to="createPath(currentPage - 1)"
      class="px-3 py-1.5 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 transition-colors"
      aria-label="Previous page"
    >
      ←
    </NuxtLink>

    <template v-for="page in pages" :key="page">
      <span v-if="page === '...'" class="px-2 text-gray-400 dark:text-gray-500">…</span>
      <NuxtLink
        v-else
        :to="createPath(page as number)"
        class="px-3 py-1.5 rounded border transition-colors"
        :class="page === currentPage
          ? 'border-sky-400 text-sky-500 dark:text-sky-400 font-medium'
          : 'border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500'"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </NuxtLink>
    </template>

    <NuxtLink
      v-if="currentPage < total"
      :to="createPath(currentPage + 1)"
      class="px-3 py-1.5 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 transition-colors"
      aria-label="Next page"
    >
      →
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number
}>()

const { currentPage, createPath } = usePagination()

const pages = computed(() => {
  const t = props.total
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)

  const cur = currentPage.value
  const result: (number | string)[] = [1]

  if (cur > 3) result.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(t - 1, cur + 1); i++) {
    result.push(i)
  }
  if (cur < t - 2) result.push('...')
  result.push(t)

  return result
})
</script>
