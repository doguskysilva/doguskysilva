<template>
  <div>
    <Header />
    <Menu />

    <main class="mx-auto mt-10 w-3/4">
      <Listing :title="title" format="list" :category="category" />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Listing from '~/components/content/Listing.vue'

const props = defineProps<{
  category?: string
}>()

const { t } = useI18n()
const title = computed(() => (props.category ? `Category: ${props.category}` : t('archives.title')))
</script>
