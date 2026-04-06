<template>
  <div>
    <AppHeader />
    <AppMenu />

    <main class="mt-10 w-3/4 mx-auto">
      <PostList :title="t('blog.title')" format="list" />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
