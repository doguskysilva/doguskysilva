import { serverQueryCollection } from '#content/server'
import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const config = useAppConfig() as {
    name?: string
    description?: string
    language?: string
    url?: string
  }
  const url = (config.url || '').replace(/\/$/, '')
  const now = new Date()

  const posts = await serverQueryCollection(event, 'posts_pt')
    .where('listed', '<>', false)
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all()

  const feed = new Feed({
    title: config.name || 'Blog',
    description: config.description || '',
    id: url,
    link: url,
    language: config.language || 'pt-br',
    favicon: `${url}/favicon.ico`,
    copyright: `All rights reserved ${now.getFullYear()}, ${config.name}`,
    generator: 'nuxt-content-v3',
  })

  for (const post of posts) {
    if (post.date) {
      feed.addItem({
        title: post.title ?? '',
        id: `${url}${post.path}`,
        link: `${url}${post.path}`,
        description: post.description,
        date: new Date(post.date),
        image: post.cover ? `${url}/${post.cover.replace(/^\//, '')}` : undefined,
      })
    }
  }

  setHeader(event, 'content-type', 'text/xml; charset=utf-8')
  return feed.rss2()
})
