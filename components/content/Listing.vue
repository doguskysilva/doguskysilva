<template>
  <section class="mt-4">
    <div class="mb-6 text-xl font-semibold">
      {{ title }}
    </div>

    <div v-if="format === 'card'" class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="article in docs"
        :key="article.id"
        class="rounded-lg border border-l-2 border-gray-200 p-6 transition-colors hover:border-l-sky-500 dark:border-neutral-700 dark:hover:border-l-sky-400"
      >
        <NuxtLink :to="postPath(article.path)">
          <h2 class="text-base font-semibold text-gray-900 transition-colors hover:text-sky-600 dark:text-white dark:hover:text-sky-400">
            {{ article.title }}
          </h2>
        </NuxtLink>

        <p v-if="article.description" class="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {{ article.description }}
        </p>

        <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {{ displayDate(article.date) }}<template v-if="article.body"> · {{ readingTime(article.body) }}</template>
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <NuxtLink
            v-for="tagArticle in article.tags"
            :key="tagArticle"
            :to="localePath(`/tags/${tagArticle}`)"
            class="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-500 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-neutral-600 dark:text-gray-400 dark:hover:border-sky-500 dark:hover:text-sky-400"
          >
            {{ tagArticle }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <ol v-else class="divide-y divide-gray-200 dark:divide-neutral-800">
      <li v-for="article in docs" :key="article.path" class="py-5">
        <NuxtLink :to="postPath(article.path)" class="group block">
          <div class="text-base font-medium text-gray-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
            {{ article.title }}
          </div>
          <div v-if="article.description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ article.description }}
          </div>
        </NuxtLink>
        <div class="mt-2 flex flex-wrap items-center gap-3">
          <span class="text-xs text-gray-400 dark:text-gray-500">
            {{ displayDate(article.date) }}<template v-if="article.body"> · {{ readingTime(article.body) }}</template>
          </span>
          <div v-if="article.tags.length > 0" class="flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="tagArticle in article.tags"
              :key="tagArticle"
              :to="localePath(`/tags/${tagArticle}`)"
              class="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-500 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-neutral-600 dark:text-gray-400 dark:hover:border-sky-500 dark:hover:text-sky-400"
            >
              {{ tagArticle }}
            </NuxtLink>
          </div>
        </div>
      </li>
    </ol>

    <PaginationBar :total="totalItems" />
  </section>
</template>

<script setup lang="ts">
import { readingTime } from '~/composables/useReadingTime'
import { formatDate } from '~/composables/useDateFormat'
import { toPublicPath } from '~/utils/blogPath'

type ListingPost = {
  id: string
  path: string
  title: string
  description?: string
  date?: string
  tags: string[]
  categories: string[]
  draft: boolean
  listed: boolean
  body?: unknown
}

const props = defineProps<{
  category?: string
  tag?: string
  title?: string
  prefix?: string
  format?: string
}>()

const format = props.format || 'card'
const { locale } = useI18n()
const localePath = useLocalePath()
const { itemsPerPage, currentPage } = usePagination()

const collectionName = computed(() => (locale.value === 'en' ? 'posts_en' : 'posts'))

const listingKey = computed(() => {
  return [
    'listing',
    collectionName.value,
    props.category ? `cat-${props.category}` : '',
    props.tag ? `tag-${props.tag}` : '',
    props.prefix ? `prefix-${props.prefix}` : '',
    `page-${currentPage.value}`,
  ]
    .filter(Boolean)
    .join('-')
})

const { data: allDocs } = await useAsyncData(listingKey, () => {
  return queryCollection(collectionName.value)
    .where('listed', '=', true)
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
})

const filteredDocs = computed(() => {
  return (allDocs.value || []).filter((article) => {
    const tags = Array.isArray(article.tags) ? article.tags : []
    const categories = Array.isArray(article.categories) ? article.categories : []

    const matchesTag = !props.tag || tags.includes(props.tag)
    const matchesCategory = !props.category || categories.includes(props.category)
    const matchesPrefix = !props.prefix || article.path.startsWith(props.prefix)

    return matchesTag && matchesCategory && matchesPrefix
  }) as ListingPost[]
})

const totalItems = computed(() => filteredDocs.value.length)

const docs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDocs.value.slice(start, end)
})

function displayDate(date?: string): string {
  if (!date) {
    return ''
  }

  const localeDate = locale.value === 'en' ? 'en-US' : 'pt-BR'
  return formatDate(`${date}T00:00:00`, localeDate)
}

function postPath(path: string): string {
  return toPublicPath(path)
}
</script>
