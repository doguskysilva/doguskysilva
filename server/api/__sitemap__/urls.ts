import { serverQueryCollection } from '#content/server'

export default defineEventHandler(async (event) => {
  const [ptPosts, enPosts] = await Promise.all([
    serverQueryCollection(event, 'posts_pt')
      .where('listed', '<>', false)
      .where('draft', '<>', true)
      .select('path', 'date', 'alternates')
      .all(),
    serverQueryCollection(event, 'posts_en')
      .where('listed', '<>', false)
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
