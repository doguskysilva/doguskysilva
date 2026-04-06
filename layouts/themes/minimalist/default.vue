<template>
  <div>
    <MinimalistHeader />
    <MinimalistMenu />

    <main class="mt-10 max-w-2xl mx-auto w-full px-6">
      <div v-if="doc">
        <div class="text-center">
          <h2 class="text-3xl font-bold">{{ (doc as any).title }}</h2>
        </div>

        <!-- date · reading time -->
        <p v-if="(doc as any).date" class="mt-3 text-center text-sm text-gray-400 dark:text-gray-500">
          {{ formatDate((doc as any).date) }}<template v-if="(doc as any).body"> · {{ readingTime((doc as any).body) }}</template>
        </p>

        <ContentRenderer
          id="nuxtContent"
          :value="doc"
          class="prose pt-8 text-sm md:text-base dark:prose-invert max-w-none"
        />

        <!-- tags at the end of the article -->
        <div v-if="(doc as any).tags?.length" class="mt-10 pt-6 border-t border-gray-200 dark:border-neutral-800 flex flex-wrap gap-2">
          <NuxtLink
            v-for="tag in (doc as any).tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {{ tag }}
          </NuxtLink>
        </div>

        <CommentSystem :id="(doc as any).id" :nocomments="(doc as any).nocomments" />
      </div>
    </main>

    <MinimalistFooter />
  </div>
</template>

<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'
import MinimalistHeader from '~/components/MinimalistHeader.vue'
import { readingTime } from '~/composables/useReadingTime'

defineProps<{
  doc: unknown
}>()

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style lang="scss">
.prose {
  a {
    @apply underline underline-offset-2 decoration-dotted;
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
