<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useMagicKeys } from '@vueuse/core'

type SearchSection = {
  id: string
  path?: string
  title: string
  titles: string[]
  content: string
  level: number
}

const q = ref('')
const searchContentRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()
const resultsAreaRef = ref<HTMLDivElement>()
const selected = ref(-1)
const show = ref(false)

const { activate, deactivate } = useFocusTrap(searchContentRef)
const { meta_K, Escape } = useMagicKeys()

const { locale, t } = useI18n()
const collection = computed(() => locale.value === 'en' ? 'posts_en' : 'posts_pt')

const { data: sections, status, execute } = await useLazyAsyncData(
  `search-sections-${locale.value}`,
  () => queryCollectionSearchSections(collection.value as 'posts_pt' | 'posts_en'),
  { default: () => [] as SearchSection[], immediate: false },
)

function showSearch() {
  show.value = true
  if (!sections.value?.length) {
    execute()
  }
}

const { results } = useFuse<SearchSection>(
  q,
  sections as unknown,
  {
    fuseOptions: {
      keys: ['title', 'titles', 'content'],
      ignoreLocation: true,
      threshold: 0.2,
      includeMatches: true,
      includeScore: true,
    },
    matchAllWhenSearchEmpty: false,
  },
)

function down() {
  if (selected.value === -1) { selected.value = 0 }
  else if (selected.value < results.value.length - 1) { selected.value++ }
}

function up() {
  if (selected.value > 0) { selected.value-- }
  else if (selected.value === 0) { selected.value = -1 }
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

onMounted(() => {
  const route = useRoute()
  if (route.query.q) {
    show.value = true
    q.value = route.query.q as string
    execute()
  }
})

watch(selected, (value) => {
  const id = results.value?.[value]?.item?.id
  if (id) document.querySelector(`[id="${id}"]`)?.scrollIntoView({ block: 'nearest' })
})

watch(q, () => { selected.value = 0 })

watch(show, (value) => {
  if (!value) {
    q.value = ''
    selected.value = -1
    deactivate()
  } else {
    nextTick(() => activate())
  }
})

watch(meta_K, (v) => {
  if (v) show.value = !show.value
})

watch(Escape, () => {
  if (show.value) show.value = false
})
</script>

<template>
  <button
    class="border-gray-200 border p-1 px-2 rounded-lg text-sm hover:border-gray-400 flex items-center justify-center gap-1 dark:text-slate-100 hover:dark:text-slate-400"
    type="button"
    :aria-label="t('ui.search')"
    @click="showSearch"
  >
    <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    </svg>
    <span>{{ t('ui.search') }}</span>
  </button>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <Teleport to="body">
    <Transition name="search-backdrop">
      <div
        v-if="show"
        ref="searchContentRef"
        class="bg-slate-600 bg-opacity-75 fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        @click="show = false"
      >
        <Transition name="search-modal" appear>
          <div v-if="show" class="relative p-4 w-full max-w-2xl overflow-auto max-h-2xl">
            <div
              class="relative bg-white rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 dark:border"
              @click.stop
            >
              <div class="flex gap-3 p-4">
                <label for="app-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    id="app-search"
                    ref="searchInputRef"
                    v-model="q"
                    type="text"
                    placeholder="Search..."
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

              <div v-if="status === 'pending'" class="p-6 text-center text-sm text-gray-500 dark:text-slate-100">
                Loading...
              </div>

              <div
                v-else-if="results.length > 0"
                ref="resultsAreaRef"
                class="overflow-auto h-96 flex flex-col"
              >
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
                      <span v-if="result.item.titles.length" class="text-xs text-gray-400 dark:text-gray-500">
                        · {{ result.item.titles.join(' › ') }}
                      </span>
                    </div>
                    <p v-if="result.item.content" class="search-result-content-preview">
                      {{ result.item.content.slice(0, 120) }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="!q" class="p-6 text-center text-sm text-gray-500 dark:text-slate-100">
                Type your query to search posts
              </div>

              <div v-else class="overflow-auto flex flex-col h-32 items-center justify-center dark:text-slate-100">
                No results found. Try another query
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.search-result {
  @apply flex flex-col justify-center p-2 cursor-pointer mt-2;

  &.selected {
    @apply bg-gray-100 dark:bg-gray-800;
  }
}

.search-result-content-wrapper {
  @apply flex gap-2 rounded p-1 flex-col overflow-hidden;
}

.search-result-content-head {
  @apply flex items-center gap-1 dark:text-slate-100;
}

.search-result-content-preview {
  @apply truncate relative text-slate-400 text-sm;
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
