<template>
  <nav v-if="links.length" class="toc my-6 p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 text-sm">
    <p class="font-semibold text-gray-700 dark:text-gray-300 mb-3">
      Table of Contents
    </p>
    <ol class="space-y-1">
      <li
        v-for="link in links"
        :key="link.id"
        :class="link.depth > 2 ? 'pl-4' : ''"
      >
        <a
          :href="`#${link.id}`"
          class="text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
        >
          {{ link.text }}
        </a>
        <ol v-if="showChildren && link.children?.length" class="mt-1 space-y-1 pl-4">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              {{ child.text }}
            </a>
          </li>
        </ol>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const config = useAppConfig() as { toc?: { showChildren?: boolean } }

const showChildren = config.toc?.showChildren ?? false
const collection = computed(() => locale.value === 'en' ? 'posts_en' : 'posts_pt')

const { data: page } = await useAsyncData(`toc-${route.path}`, () =>
  queryCollection(collection.value as 'posts_pt' | 'posts_en').path(route.path).first(),
)

type TocLink = { id: string; text: string; depth: number; children?: TocLink[] }
const links = computed<TocLink[]>(() => (page.value as any)?.body?.toc?.links ?? [])
</script>
