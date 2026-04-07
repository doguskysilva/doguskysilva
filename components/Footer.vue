<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="mt-16 border-t border-gray-200 py-8 dark:border-neutral-800">
    <div class="mx-auto flex w-3/4 items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <NuxtLink
        v-if="github"
        :to="github"
        target="_blank"
        rel="noopener noreferrer"
        class="transition-colors hover:text-sky-500 dark:hover:text-sky-400"
      >
        GitHub
      </NuxtLink>
      <span v-if="github" aria-hidden="true">·</span>
      <NuxtLink
        to="https://content.nuxt.com"
        target="_blank"
        rel="noopener noreferrer"
        class="transition-colors hover:text-sky-500 dark:hover:text-sky-400"
      >
        Powered by Nuxt Content
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useAppConfig()
const github = (config.socials as { github?: string } | undefined)?.github || null
</script>
