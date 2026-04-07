<script setup lang="ts">
const route = useRoute()

await navigateTo(route.fullPath.replace(/\/blog(?=\/|$)/, '/posts'), { redirectCode: 301 })
</script>
