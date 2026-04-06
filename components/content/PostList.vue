<template>
  <section class="mt-4">
    <div v-if="title" class="text-xl font-semibold mb-6">
      {{ title }}
    </div>

    <!-- Card format (home page) -->
    <div v-if="format === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="rounded-lg border border-l-2 border-gray-200 dark:border-neutral-700 hover:border-l-sky-500 dark:hover:border-l-sky-400 p-6 transition-colors"
      >
        <NuxtLink :to="post.path">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {{ post.title }}
          </h2>
        </NuxtLink>

        <p v-if="post.description" class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {{ post.description }}
        </p>

        <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {{ formatDate(post.date) }}<template v-if="post.readingTime"> · {{ post.readingTime }} min</template>
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <NuxtLink
            v-for="tagItem in post.tags"
            :key="tagItem"
            :to="localePath(`/tags/${tagItem}`)"
            class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {{ tagItem }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- List format (blog / tag pages) -->
    <ol v-else class="divide-y divide-gray-200 dark:divide-neutral-800">
      <li
        v-for="post in posts"
        :key="post.path"
        class="py-5"
      >
        <NuxtLink :to="post.path" class="group block">
          <div class="text-base font-medium text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {{ post.title }}
          </div>
          <div v-if="post.description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ post.description }}
          </div>
        </NuxtLink>
        <div class="mt-2 flex flex-wrap items-center gap-3">
          <span class="text-xs text-gray-400 dark:text-gray-500">
            {{ formatDate(post.date) }}<template v-if="post.readingTime"> · {{ post.readingTime }} min</template>
          </span>
          <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="tagItem in post.tags"
              :key="tagItem"
              :to="localePath(`/tags/${tagItem}`)"
              class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              {{ tagItem }}
            </NuxtLink>
          </div>
        </div>
      </li>
    </ol>

    <AppPagination :total="totalPages" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  category?: string
  tag?: string
  title?: string
  format?: string
}>()

const format = props.format || 'card'
const { locale } = useI18n()
const localePath = useLocalePath()
const { itemsPerPage, currentPage } = usePagination()

const collection = computed(() => locale.value === 'en' ? 'posts_en' : 'posts_pt')

const id = computed(() => [
  'posts',
  locale.value,
  props.category && `cat-${props.category}`,
  props.tag && `tag-${props.tag}`,
  `page-${currentPage.value}`,
].filter(Boolean).join('-'))

const { data: posts } = await useAsyncData(id, () => {
  let query = queryCollection(collection.value)
    .where('listed', '<>', false)
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .skip((currentPage.value - 1) * itemsPerPage.value)
    .limit(itemsPerPage.value)

  if (props.category) {
    query = query.where('categories', 'LIKE', `%${props.category}%`)
  }
  if (props.tag) {
    query = query.where('tags', 'LIKE', `%${props.tag}%`)
  }

  return query.all()
})

const { data: totalCount } = await useAsyncData(`${id.value}-count`, () => {
  let query = queryCollection(collection.value)
    .where('listed', '<>', false)
    .where('draft', '<>', true)

  if (props.category) {
    query = query.where('categories', 'LIKE', `%${props.category}%`)
  }
  if (props.tag) {
    query = query.where('tags', 'LIKE', `%${props.tag}%`)
  }

  return query.count()
})

const totalPages = computed(() => Math.ceil((totalCount.value ?? 0) / itemsPerPage.value))

function formatDate(date?: string): string {
  if (!date) return ''
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
