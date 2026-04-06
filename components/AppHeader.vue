<template>
  <nav class="mt-10 w-3/4 mx-auto flex justify-between items-center">
    <NuxtLink :to="localePath('/')" class="text-2xl font-bold tracking-tight hover:opacity-75 transition-opacity">
      {{ title }}
    </NuxtLink>
    <AppSearch />
  </nav>
</template>

<script setup lang="ts">
const config = useAppConfig()
const title = (config as { name?: string }).name || 'Blog'
const localePath = useLocalePath()
</script>
