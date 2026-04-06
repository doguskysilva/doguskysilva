export const usePagination = () => {
  const config = useAppConfig()
  const route = useRoute()

  const itemsPerPage = computed(() => config.pagination?.per_page || 6)

  const currentPage = computed(() => {
    const match = route.path.match(/\/page\/(\d+)$/)
    return match ? Number.parseInt(match[1], 10) : 1
  })

  const createPath = (page: number): string => {
    const baseUrl = route.path.replace(/\/page\/\d+$/, '') || '/'

    if (page <= 1) {
      return baseUrl
    }

    const normalizedBase = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '')
    return `${normalizedBase}/page/${page}`
  }

  return {
    itemsPerPage,
    currentPage,
    createPath,
  }
}
