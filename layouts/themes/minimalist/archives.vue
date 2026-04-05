<template>
  <div>
    <MinimalistHeader />
    <MinimalistMenu />

    <main class="mt-10 w-3/4 mx-auto">
      <MinimalistListing title="All Posts" format="list" />
    </main>

    <MinimalistFooter />
  </div>
</template>

<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'
import MinimalistHeader from '~/components/MinimalistHeader.vue'
import MinimalistListing from '~/components/content/MinimalistListing.vue'
</script>
