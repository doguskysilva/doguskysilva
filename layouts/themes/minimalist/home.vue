<template>
  <div>
    <MinimalistHeader />
    <MinimalistMenu />

    <main class="mt-10 w-3/4 mx-auto">
      <div class="mt-4 text-gray-600 dark:text-gray-400">
        {{ t('home.description') }}
      </div>

      <div class="mt-10">
        <MinimalistListing :title="t('home.lastPosts')" />

        <div class="mt-6">
          <NuxtLink
            :to="localePath('/archives')"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {{ t('home.readAllPosts') }}
          </NuxtLink>
        </div>
      </div>
    </main>

    <MinimalistFooter />
  </div>
</template>

<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'
import MinimalistHeader from '~/components/MinimalistHeader.vue'
import MinimalistListing from '~/components/content/MinimalistListing.vue'

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
