<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="mx-auto mt-10 flex w-3/4 items-center justify-between">
    <NuxtLink :to="localePath('/')" class="text-2xl font-bold tracking-tight transition-opacity hover:opacity-75">
      {{ title }}
    </NuxtLink>
    <LocaleSearch />
  </nav>
</template>

<script setup lang="ts">
import LocaleSearch from '~/components/LocaleSearch.vue'

const config = useAppConfig()
const title = config.name || 'Posts'
const localePath = useLocalePath()
</script>
