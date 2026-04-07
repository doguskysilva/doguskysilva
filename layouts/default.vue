<template>
  <div>
    <Header />
    <Menu />

    <main class="mx-auto mt-10 w-full max-w-2xl px-6">
      <div v-if="doc">
        <div class="text-center">
          <h2 class="text-3xl font-bold">{{ doc.title }}</h2>
        </div>

        <p v-if="doc.date" class="mt-3 text-center text-sm text-gray-400 dark:text-gray-500">
          {{ displayDate(doc.date) }}<template v-if="doc.body"> · {{ readingTime(doc.body) }}</template>
        </p>

        <ContentRenderer id="nuxtContent" :value="doc" class="prose max-w-none pt-8 text-sm dark:prose-invert md:text-base" />

        <Toc v-if="showToc" :show-children="config.toc?.showChildren ?? false" class="mt-8" />

        <div v-if="doc.tags?.length" class="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-neutral-800">
          <NuxtLink
            v-for="tag in doc.tags"
            :key="tag"
            :to="localePath(`/tags/${tag}`)"
            class="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-500 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-neutral-600 dark:text-gray-400 dark:hover:border-sky-500 dark:hover:text-sky-400"
          >
            {{ tag }}
          </NuxtLink>
        </div>

        <div v-if="hasSurroundings" class="mt-10 grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 dark:border-neutral-800 md:grid-cols-2">
          <NuxtLink
            v-if="surroundings?.[0]"
            :to="surroundingPath(surroundings[0].path)"
            class="rounded border border-gray-200 p-4 text-sm transition-colors hover:border-sky-400 dark:border-neutral-700"
          >
            <div class="text-xs text-gray-400">Previous</div>
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ surroundings[0].title }}</div>
          </NuxtLink>
          <div v-else />

          <NuxtLink
            v-if="surroundings?.[1]"
            :to="surroundingPath(surroundings[1].path)"
            class="rounded border border-gray-200 p-4 text-sm transition-colors hover:border-sky-400 dark:border-neutral-700"
          >
            <div class="text-right text-xs text-gray-400">Next</div>
            <div class="text-right font-medium text-gray-900 dark:text-gray-100">{{ surroundings[1].title }}</div>
          </NuxtLink>
        </div>

        <CommentSystem :id="doc.id" :nocomments="doc.nocomments" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Toc from '~/components/content/Toc.vue'
import { formatDate } from '~/composables/useDateFormat'
import { readingTime } from '~/composables/useReadingTime'
import { toPublicPath } from '~/utils/postPath'

type PageDoc = {
  id?: string
  title?: string
  date?: string
  tags?: string[]
  body?: unknown
  nocomments?: boolean
}

const config = useAppConfig()
const { locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  doc: PageDoc
  surroundings?: Array<{ path: string; title: string } | null>
}>()

const doc = computed(() => props.doc)
const surroundings = computed(() => props.surroundings)
const showToc = computed(() => config.table_of_contents !== false)
const hasSurroundings = computed(() => Boolean(surroundings.value?.[0] || surroundings.value?.[1]))

function displayDate(date: string): string {
  return formatDate(`${date}T00:00:00`, locale.value === 'en' ? 'en-US' : 'pt-BR')
}

function surroundingPath(path: string): string {
  return toPublicPath(path)
}
</script>

<style lang="scss">
.prose {
  a {
    @apply underline decoration-dotted underline-offset-2;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    @apply no-underline;
  }

  pre {
    overflow-x: auto;
    max-width: 100%;
  }
}
</style>
