<template>
  <section class="mt-4">
    <div class="text-xl font-semibold mb-6">
      {{ title }}
    </div>

    <!-- Card format (home page) -->
    <div v-if="format === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <div
        v-for="article in docs"
        :key="article._id"
        class="rounded-lg border border-l-2 border-gray-200 dark:border-neutral-700 hover:border-l-sky-500 dark:hover:border-l-sky-400 p-6 transition-colors"
      >
        <NuxtLink :to="article._path">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {{ article.title }}
          </h2>
        </NuxtLink>

        <p v-if="article.description" class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {{ article.description }}
        </p>

        <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {{ formatDate(article.date) }}<template v-if="article.body"> · {{ readingTime(article.body) }}</template>
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <NuxtLink
            v-for="tagArticle in article.tags"
            :key="tagArticle"
            :to="`/tags/${tagArticle}`"
            class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {{ tagArticle }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- List format (archives / tag pages) -->
    <ol v-else class="divide-y divide-gray-200 dark:divide-neutral-800">
      <li
        v-for="article in docs"
        :key="article._path"
        class="py-5"
      >
        <NuxtLink :to="article._path" class="group block">
          <div class="text-base font-medium text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {{ article.title }}
          </div>
          <div v-if="article.description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ article.description }}
          </div>
        </NuxtLink>
        <div class="mt-2 flex flex-wrap items-center gap-3">
          <span class="text-xs text-gray-400 dark:text-gray-500">
            {{ formatDate(article.date) }}<template v-if="article.body"> · {{ readingTime(article.body) }}</template>
          </span>
          <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="tagArticle in article.tags"
              :key="tagArticle"
              :to="`/tags/${tagArticle}`"
              class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              {{ tagArticle }}
            </NuxtLink>
          </div>
        </div>
      </li>
    </ol>

    <MinimalistPaginationBar :total="totalNumberOfPages" />
  </section>
</template>

<script setup lang="ts">
import { readingTime } from '~/composables/useReadingTime'

const props = defineProps<{
  category?: string
  tag?: string
  title?: string
  prefix?: string
  format?: string
}>()

const format = props.format || 'card'
const { locale } = useI18n()
const { itemsPerPage, currentPage } = usePagination()

// Prefix content queries with the current locale path.
// For the default locale (pt) query from root but exclude /en/ subtree.
const localePath = computed(() =>
  locale.value === 'en' ? '/en' : '/',
)

const id = [
  'listing',
  locale.value,
  props.category && `cat-${props.category}`,
  props.tag && `tag-${props.tag}`,
  props.prefix && `prefix-${props.prefix}`,
  `page-${currentPage.value}`,
].filter(Boolean).join('-')

let where: Record<string, unknown> = {}
if (props.category) {
  where['categories'] = { $in: [props.category] }
}
if (props.tag) {
  where['tags'] = { $in: [props.tag] }
}
// For default locale exclude content from /en/ subtree
if (locale.value !== 'en') {
  where['_path'] = { $not: { $contains: '/en/' } }
}
where = { ...where, ...{ draft: { $ne: true }, listed: { $ne: false } } }

const numberOfPostsPerPage = itemsPerPage.value

const contentBase = localePath.value + (props.prefix || '')

const { data: docs } = useAsyncData(id, () => {
  return queryContent(contentBase)
    .where(where)
    .sort({ date: -1 })
    .skip((currentPage.value - 1) * numberOfPostsPerPage)
    .limit(numberOfPostsPerPage)
    .find()
})
const totalNumberOfPages = await queryContent(contentBase).where(where).count()

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

</script>
