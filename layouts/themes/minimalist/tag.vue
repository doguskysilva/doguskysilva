<template>
  <div>
    <MinimalistHeader />
    <MinimalistMenu />

    <section class="mt-10 w-3/4 mx-auto">
      <h2 class="text-2xl font-bold mb-8 text-center">
        Tag: {{ tag }}
      </h2>

      <MinimalistListing format="list" :tag="tag" />
    </section>

    <MinimalistFooter />
  </div>
</template>

<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'
import MinimalistHeader from '~/components/MinimalistHeader.vue'
import MinimalistListing from '~/components/content/MinimalistListing.vue'

defineProps<{
  tag: string
}>()
</script>
