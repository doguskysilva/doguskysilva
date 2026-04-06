import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const [ptPosts, enPosts] = await Promise.all([
    queryCollection(event, 'posts_pt')
      .where('listed', '=', true)
      .where('draft', '<>', true)
      .select('path', 'date', 'alternates')
      .all(),
    queryCollection(event, 'posts_en')
      .where('listed', '=', true)
      .where('draft', '<>', true)
      .select('path', 'date', 'alternates')
      .all(),
  ])

  return [...ptPosts, ...enPosts].map(doc => ({
    loc: doc.path,
    lastmod: doc.date,
    alternatives: doc.alternates ?? [],
  }))
})
