<template>
  <div>
    <Header />
    <Menu />

    <main class="mx-auto mt-10 w-3/4">
      <div class="mt-4 text-gray-600 dark:text-gray-400">
        {{ t('home.description') }}
      </div>

      <div class="mt-10">
        <Listing :title="t('home.lastPosts')" />

        <div class="mt-6">
          <NuxtLink
            :to="localePath('/blog')"
            class="text-sm text-gray-500 transition-colors hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400"
          >
            {{ t('home.readAllPosts') }}
          </NuxtLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Listing from '~/components/content/Listing.vue'

defineProps<{
  doc: unknown
}>()

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<style>
body {
  @apply bg-white dark:bg-zinc-900 dark:text-white;
}
</style>
