<template>
  <figure>
    <component
      :is="imgComponent"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :aria-labelledby="alt ? `caption-${uniqueId}` : undefined"
    />
    <figcaption v-if="alt" :id="`caption-${uniqueId}`" class="mt-1 text-center text-sm text-gray-600 dark:text-gray-300">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { useId } from 'vue'

const uniqueId = useId()
const runtimeConfig = useRuntimeConfig()

const imgComponent = runtimeConfig.public.mdc.useNuxtImage ? resolveComponent('NuxtImg') : 'img'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const base = withLeadingSlash(withTrailingSlash(runtimeConfig.app.baseURL))
    if (base !== '/' && !props.src.startsWith(base)) {
      return joinURL(base, props.src)
    }
  }
  return props.src
})
</script>
