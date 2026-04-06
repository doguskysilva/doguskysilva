<template>
  <div>
    <AppHeader />
    <AppMenu />

    <main class="mt-10 w-3/4 mx-auto">
      <div class="mt-4 text-gray-600 dark:text-gray-400">
        {{ t('home.description') }}
      </div>

      <div class="mt-10">
        <PostList :title="t('home.lastPosts')" />

        <div class="mt-6">
          <NuxtLink
            :to="localePath('/blog')"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {{ t('home.readAllPosts') }}
          </NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
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
