<template>
  <div>
    <Header />
    <Menu />

    <main class="mx-auto mt-10 w-full max-w-3xl px-6">
      <article v-if="doc">
        <h1 class="text-3xl font-bold">{{ doc.title }}</h1>
        <ContentRenderer :value="doc" class="prose mt-8 max-w-none dark:prose-invert" />
      </article>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  doc: unknown
}>()
</script>
