<template>
  <nav v-if="totalPages > 1" class="flex items-center gap-x-1 p-4">
    <NuxtLink
      :to="left.to"
      :aria-disabled="left.disabled"
      aria-label="Previous page"
      :class="{ 'pointer-events-none cursor-not-allowed': left.disabled }"
    >
      <button
        :disabled="left.disabled"
        type="button"
        class="inline-flex min-h-[12px] min-w-[12px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg class="size-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span aria-hidden="true" class="sr-only">Previous</span>
      </button>
    </NuxtLink>

    <div class="flex items-center gap-x-1">
      <span class="flex min-h-[12px] min-w-[12px] items-center justify-center rounded-lg px-3 py-2 text-black focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:focus:bg-white/10" aria-current="page">
        {{ pageNumber }}
      </span>
      <span class="flex min-h-[12px] items-center justify-center px-1.5 py-2 text-gray-400 dark:text-neutral-500">of</span>
      <span class="flex min-h-[12px] items-center justify-center px-1.5 py-2 text-gray-400 dark:text-neutral-500">{{ totalPages }}</span>
    </div>

    <NuxtLink
      :to="right.to"
      :aria-disabled="right.disabled"
      aria-label="Next page"
      :class="{ 'pointer-events-none cursor-not-allowed': right.disabled }"
    >
      <button
        :disabled="right.disabled"
        type="button"
        class="inline-flex min-h-[12px] min-w-[12px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <span aria-hidden="true" class="sr-only">Next</span>
        <svg class="size-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { itemsPerPage, currentPage: routePage, createPath } = usePagination()

const props = defineProps<{
  total?: number
  currentPage?: number
}>()

const pageNumber = computed(() => props.currentPage || routePage.value)
const totalPages = computed(() => Math.max(1, Math.ceil((props.total || 0) / itemsPerPage.value)))

const left = computed(() => {
  const isFirstPage = pageNumber.value <= 1
  return {
    to: isFirstPage ? createPath(1) : createPath(pageNumber.value - 1),
    disabled: isFirstPage,
  }
})

const right = computed(() => {
  const isLastPage = pageNumber.value >= totalPages.value
  return {
    to: isLastPage ? createPath(totalPages.value) : createPath(pageNumber.value + 1),
    disabled: isLastPage,
  }
})
</script>
