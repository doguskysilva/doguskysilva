<template>
  <div>
    <Header />
    <Menu />

    <section class="mx-auto mt-10 w-3/4">
      <h2 class="mb-8 text-center text-2xl font-bold">
        Tag: {{ tag }}
      </h2>

      <Listing format="list" :tag="tag" />
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Listing from '~/components/content/Listing.vue'

defineProps<{
  tag: string
}>()
</script>
