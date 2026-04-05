<template>
  <div>
    <MinimalistHeader />
    <MinimalistMenu />

    <main class="mt-10 w-full max-w-2xl mx-6 lg:mx-auto px-4 lg:px-0">
      <div v-if="doc">
        <div class="text-center">
          <h2 class="text-3xl font-bold">{{ (doc as any).title }}</h2>
        </div>

        <!-- Post metadata: date + reading time + tags -->
        <div class="mt-4 flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span v-if="(doc as any).date">
            {{ formatDate((doc as any).date) }}<template v-if="(doc as any).body"> · {{ readingTime((doc as any).body) }}</template>
          </span>
          <div v-if="(doc as any).tags?.length" class="flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="tag in (doc as any).tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="rounded border border-gray-300 dark:border-neutral-600 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </div>

        <ContentRenderer
          id="nuxtContent"
          :value="doc"
          class="prose pt-8 text-sm md:text-base dark:prose-invert max-w-none"
        />

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

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (node.children) return extractText(node.children)
  return ''
}

function readingTime(body: any): string {
  const words = extractText(body).trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
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
}
</style>
