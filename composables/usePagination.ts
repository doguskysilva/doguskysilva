export function usePagination() {
  const config = useAppConfig() as { pagination?: { per_page?: number } }
  const route = useRoute()

  const itemsPerPage = computed(() => config.pagination?.per_page ?? 6)

  const currentPage = computed(() => {
    const match = route.path.match(/\/page\/(\d+)$/)
    return match ? parseInt(match[1]) : 1
  })

  function createPath(page: number): string {
    const base = route.path.replace(/\/page\/\d+$/, '')
    return `${base}/page/${page}`
  }

  return { itemsPerPage, currentPage, createPath }
}
