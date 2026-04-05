<template>
  <footer class="mt-16 border-t border-gray-200 dark:border-neutral-800 py-8">
    <div class="w-3/4 mx-auto flex justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <NuxtLink
        v-if="github"
        :to="github"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
      >
        GitHub
      </NuxtLink>
      <span v-if="github" aria-hidden="true">·</span>
      <NuxtLink
        to="https://bloggrify.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
      >
        Powered by Bloggrify
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useAppConfig()
const github = (config.socials as any)?.github || null
</script>
