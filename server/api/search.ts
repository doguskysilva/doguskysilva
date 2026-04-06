import { toPublicPath } from '~~/utils/blogPath'

type SearchSection = {
  path: string
  title?: string
  content?: string
  description?: string
}

type SearchPage = {
  id: string
  path: string
  title: string
  description: string
  content: string
}

export default defineEventHandler(async (event) => {
  const [ptSections, enSections] = await Promise.all([
    queryCollectionSearchSections(event, 'posts', {
      ignoredTags: ['code'],
      extraFields: ['path', 'description'],
    })
      .where('listed', '=', true)
      .where('draft', '=', false),
    queryCollectionSearchSections(event, 'posts_en', {
      ignoredTags: ['code'],
      extraFields: ['path', 'description'],
    })
      .where('listed', '=', true)
      .where('draft', '=', false),
  ])

  const BLOG_POST_PATH_RE = /^\/(?:en\/)?blog\/\d{4}\//
  const byPath = new Map<string, SearchPage>()

  for (const section of [...ptSections, ...enSections] as SearchSection[]) {
    const path = toPublicPath(section.path)
    if (!BLOG_POST_PATH_RE.test(path)) {
      continue
    }

    const current = byPath.get(path)
    if (!current) {
      byPath.set(path, {
        id: `search:${path}`,
        path,
        title: section.title || path.split('/').pop() || path,
        description: section.description || '',
        content: [section.title, section.content].filter(Boolean).join(' '),
      })
      continue
    }

    if (!current.description && section.description) {
      current.description = section.description
    }

    current.content = `${current.content} ${[section.title, section.content].filter(Boolean).join(' ')}`.trim()
  }

  setResponseHeader(event, 'cache-control', 'max-age=300, must-revalidate')
  return Array.from(byPath.values())
})
