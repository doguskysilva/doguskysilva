<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useMagicKeys } from '@vueuse/core'

type SearchSection = {
  id: string
  title: string
  content: string
  titles: string[]
  level: number
  path: string
  description?: string
}

const q = ref('')
const searchContentRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()
const selected = ref(-1)
const show = ref(false)

const { activate, deactivate } = useFocusTrap(searchContentRef)
const { meta_K, Escape } = useMagicKeys()

const SEARCH_DATA_KEY = 'search-api'
const cachedResults = useNuxtData<SearchSection[]>(SEARCH_DATA_KEY)

const { data: sections, execute, status, error } = await useLazyAsyncData<SearchSection[]>(
  SEARCH_DATA_KEY,
  () => $fetch('/api/search', { parseResponse: JSON.parse }),
  {
    default: () => cachedResults.data.value || [],
    immediate: false,
  },
)

const route = useRoute()
const { t } = useI18n()

const localeSections = computed(() => {
  const all = sections.value || []
  const isEn = route.path.startsWith('/en')

  if (isEn) {
    return all.filter((item) => item.path.startsWith('/en/'))
  }

  return all.filter((item) => !item.path.startsWith('/en/'))
})

const { results } = useFuse<SearchSection>(q, localeSections as unknown, {
  fuseOptions: {
    keys: ['title', 'description', 'titles', 'content'],
    ignoreLocation: true,
    threshold: 0.25,
    includeMatches: true,
    includeScore: true,
  },
  matchAllWhenSearchEmpty: true,
})

function showSearch() {
  show.value = true
  if (!cachedResults.data.value || cachedResults.data.value.length === 0) {
    execute()
  }
}

function highlight(text: string, match: unknown): string {
  const { indices, value } = (match as { indices: number[][]; value: string }) || { indices: [], value: '' }

  if (text === value || !value) {
    return ''
  }

  let content = ''
  let cursor = 0

  indices.forEach((indice) => {
    const end = indice[1] + 1
    const isMatched = end - indice[0] >= q.value.length

    content += [
      value.substring(cursor, indice[0]),
      isMatched && '<mark>',
      value.substring(indice[0], end),
      isMatched && '</mark>',
    ]
      .filter(Boolean)
      .join('')

    cursor = end
  })

  content += value.substring(cursor)

  const markIndex = content.indexOf('<mark>')
  if (markIndex > 60) {
    content = content.substring(markIndex - 60)
  }

  return content
}

function down() {
  if (selected.value === -1) {
    selected.value = 0
  } else if (selected.value < results.value.length - 1) {
    selected.value += 1
  }
}

function up() {
  if (selected.value === -1) {
    selected.value = results.value.length - 1
  } else if (selected.value > 0) {
    selected.value -= 1
  }
}

function go(index: number) {
  const path = results.value?.[index]?.item?.path

  if (path) {
    show.value = false
    useRouter().push(path)
  }
}

function closeButtonHandler() {
  if (q.value) {
    q.value = ''
    selected.value = -1
    searchInputRef.value?.focus?.()
  } else {
    show.value = false
  }
}

watch(selected, (value) => {
  const nextId = results.value?.[value]?.item?.id
  if (nextId) {
    document.querySelector(`[id="${nextId}"]`)?.scrollIntoView({ block: 'nearest' })
  }
})

watch(q, () => {
  selected.value = 0
})

watch(show, (value) => {
  if (!value) {
    q.value = ''
    selected.value = -1
    deactivate()
  } else {
    nextTick(() => activate())
  }
})

watch(meta_K, (value) => {
  if (value) {
    show.value = !show.value
  }
})

watch(Escape, () => {
  if (show.value) {
    show.value = false
  }
})
</script>

<template>
  <button
    class="flex items-center justify-center gap-1 rounded-lg border border-gray-200 p-1 px-2 text-sm hover:border-gray-400 hover:dark:text-slate-400 dark:text-slate-100"
    type="button"
    :aria-label="t('ui.search')"
    @click="showSearch"
  >
    <svg class="h-3 w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    </svg>
    <span>{{ t('ui.search') }}</span>
  </button>

  <teleport to="body">
    <Transition name="search-backdrop">
      <div
        v-if="show"
        ref="searchContentRef"
        class="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center bg-slate-600 bg-opacity-75 md:inset-0"
        @click="show = false"
      >
        <Transition name="search-modal" appear>
          <div v-if="show" class="relative max-h-2xl w-full max-w-2xl overflow-auto p-4">
            <div class="relative rounded-lg bg-white shadow dark:border dark:border-gray-600 dark:bg-gray-700" @click.stop>
              <div class="flex gap-3 p-4">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg class="h-4 w-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    id="simple-search"
                    ref="searchInputRef"
                    v-model="q"
                    type="text"
                    placeholder="Search..."
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    @keydown.up.prevent="up"
                    @keydown.down.prevent="down"
                    @keydown.enter="go(selected)"
                  >
                </div>
                <button @click="closeButtonHandler">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6 text-slate-600 hover:text-slate-800 dark:text-slate-100" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </button>
              </div>

              <div v-if="error" class="search-results empty dark:text-red-500">
                An error occurred.
              </div>

              <div v-if="status === 'pending'" class="search-results empty dark:text-slate-100">
                Loading...
              </div>

              <div v-else-if="results.length > 0" class="flex h-96 flex-col overflow-auto">
                <div
                  v-for="(result, i) in results"
                  :id="result.item.id"
                  :key="result.item.id"
                  class="search-result"
                  :class="{ selected: selected === i }"
                  @click="go(i)"
                  @mouseenter.prevent="selected = i"
                >
                  <div class="search-result-content-wrapper">
                    <div class="search-result-content-head">
                      <span>{{ result.item.title }}</span>
                    </div>
                    <p v-if="result?.matches?.[0]" class="search-result-content-preview">
                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <span v-html="highlight(q, result?.matches?.[0])" />
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="!q" class="search-results empty dark:text-slate-100">
                Type your query to search docs
              </div>

              <div v-else class="flex h-32 flex-col items-center justify-center overflow-auto dark:text-slate-100">
                No results found. Try another query
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped lang="scss">
.search-result {
  @apply mt-2 flex cursor-pointer flex-col justify-center p-2;

  &.selected {
    @apply bg-gray-100 dark:bg-gray-800;
  }
}

.search-result-content-wrapper {
  @apply flex flex-col gap-2 overflow-hidden rounded p-1;
}

.search-result-content-head {
  @apply flex items-center gap-1 dark:text-slate-100;
}

.search-result-content-preview {
  @apply relative truncate text-sm text-slate-400;
}

.search-backdrop-enter-active,
.search-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.search-backdrop-enter-from,
.search-backdrop-leave-to {
  opacity: 0;
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>
