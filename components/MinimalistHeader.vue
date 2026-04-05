<template>
  <nav class="mt-10 w-3/4 mx-auto flex justify-between items-center">
    <NuxtLink :to="localePath('/')" class="text-2xl font-bold tracking-tight hover:opacity-75 transition-opacity">
      {{ title }}
    </NuxtLink>
    <LocaleSearch />
  </nav>
</template>

<script setup lang="ts">
import LocaleSearch from '~/components/LocaleSearch.vue'

const config = useAppConfig()
const title = config.name || 'Minimalist'
const localePath = useLocalePath()
</script>
