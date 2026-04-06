<template>
  <div>
    <AppHeader />
    <AppMenu />

    <section class="mt-10 w-3/4 mx-auto">
      <h2 class="text-2xl font-bold mb-8 text-center">
        Tag: {{ tag }}
      </h2>

      <PostList format="list" :tag="tag" />
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tag: string
}>()
</script>
