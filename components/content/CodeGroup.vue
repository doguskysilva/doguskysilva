<template>
  <div class="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
    <div class="flex overflow-x-auto bg-gray-100 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors"
        :class="activeTab === i
          ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 -mb-px bg-white dark:bg-neutral-900'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        @click="activeTab = i"
      >
        {{ tab }}
      </button>
    </div>
    <div class="overflow-x-auto">
      <slot :active="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const activeTab = ref(0)

const tabs = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return defaultSlot.map((vnode, i) => {
    return (vnode.props as { filename?: string; label?: string } | null)?.filename
      ?? (vnode.props as { filename?: string; label?: string } | null)?.label
      ?? `Tab ${i + 1}`
  })
})
</script>
