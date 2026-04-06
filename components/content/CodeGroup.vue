<template>
  <div>
    <div :class="classes.nav_container">
      <nav :class="classes.nav">
        <div v-for="(tab, index) in tabs" :key="index">
          <nav :class="classes.nav_item" aria-label="Tabs" role="tablist">
            <button
              :class="selectedIndex === index ? classes.nav_button_active + classes.nav_button : classes.nav_button"
              type="button"
              :aria-label="tab.label"
              role="tab"
              @click="selectTab(index)"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </nav>
    </div>
    <div :class="classes.content">
      <component :is="selectedTab?.component" :key="selectedIndex" hide-header />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, type VNode } from 'vue'

const appConfig = useAppConfig()

const defaultClasses = {
  nav_container: 'mt-5 space-y-4',
  nav: 'flex flex-wrap items-center gap-x-1.5 md:gap-x-2 rounded-t border p-2',
  nav_item: 'flex rounded-lg p-0.5 dark:bg-neutral-800 gap-x-0.5 md:gap-x-1',
  nav_button_active: 'bg-gray-100 text-gray-800 shadow-sm hover:border-transparent dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-transparent',
  nav_button: 'text-xs md:text-sm text-gray-800 hover:bg-gray-100 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5 dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500',
  content: '',
}

const classes = computed(() => appConfig.ui?.components?.codeGroup?.classes || defaultClasses)

const selectedIndex = ref(0)
const slots = useSlots()

function selectTab(index: number) {
  selectedIndex.value = index
}

type GroupTab = {
  label: string
  component: VNode
}

function transformSlot(slot: VNode, index: number): GroupTab[] {
  if (typeof slot.type === 'symbol' && Array.isArray(slot.children)) {
    return (slot.children as VNode[]).flatMap((child, childIndex) => transformSlot(child, childIndex))
  }

  return [
    {
      label: String((slot.props as Record<string, unknown>)?.filename || (slot.props as Record<string, unknown>)?.label || `${index}`),
      component: slot,
    },
  ]
}

const tabs = computed(() => (slots.default?.() || []).flatMap((slot, index) => transformSlot(slot, index)).filter(Boolean))
const selectedTab = computed(() => tabs.value.find((_, index) => index === selectedIndex.value))
</script>
