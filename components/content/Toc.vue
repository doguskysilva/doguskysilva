<template>
  <nav
    v-if="isTocEnabled"
    class="mx-auto w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 lg:w-2/3"
  >
    <div class="p-5">
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Table of contents</h2>
      <div class="mb-3 font-normal">
        <ul class="pl-0">
          <li
            v-for="subtitle in links"
            :key="subtitle.id || subtitle.text"
            class="ml-4 list-decimal py-1"
            :class="{ 'ml-6': subtitle.depth === 3 }"
          >
            <NuxtLink
              class="font-normal text-slate-800 hover:text-sky-700 dark:text-slate-300"
              :class="{ 'text-gray-400': subtitle.depth === 3 }"
              :to="`#${subtitle.id}`"
            >
              {{ subtitle.text }}
            </NuxtLink>
            <ul v-if="subtitle.children && showTocChildren" class="my-2">
              <li
                v-for="child in subtitle.children"
                :id="`${child.id}`"
                :key="child.id"
                class="mb-2 text-xs last:mb-0"
              >
                <NuxtLink :to="`#${child.id}`">
                  {{ child.text }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { toContentPath } from '~/utils/postPath'

const props = defineProps({
  showChildren: {
    type: Boolean,
    default: false,
  },
})

const config = useAppConfig()
const route = useRoute()

const showTocChildren = props.showChildren || (config.toc?.showChildren ?? false)
const collection = computed(() => (route.path.startsWith('/en') ? 'posts_en' : 'posts'))

const cleanPath = computed(() => {
  const path = route.path.replace(/\/page\/\d+$/, '')
  if (path === '' || path === '/') {
    return '/'
  }
  return toContentPath(path.replace(/\/$/, '') || '/')
})

const { data: doc } = await useAsyncData(
  () => `toc:${route.path}`,
  () => queryCollection(collection.value).path(cleanPath.value).first(),
)

type TocLink = {
  id?: string
  text?: string
  depth?: number
  children?: TocLink[]
}

const links = computed(() => ((doc.value?.body as { toc?: { links?: TocLink[] } } | undefined)?.toc?.links || []))
const isTocEnabled = computed(() => links.value.length > 0)
</script>
