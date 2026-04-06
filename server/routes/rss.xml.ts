import { Feed } from 'feed'
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import { toPublicPath } from '~~/utils/blogPath'

type FeedDoc = {
  title?: string
  description?: string
  date?: string
  path: string
  cover?: string
}

export default defineEventHandler(async (event) => {
  const config = useAppConfig()
  const runtimeConfig = useRuntimeConfig()
  const url = withoutTrailingSlash(runtimeConfig.public.url || config.url)

  const [postsPt, postsEn] = await Promise.all([
    queryCollection(event, 'posts').where('listed', '=', true).where('draft', '=', false).order('date', 'DESC').all(),
    queryCollection(event, 'posts_en').where('listed', '=', true).where('draft', '=', false).order('date', 'DESC').all(),
  ])

  const docs = [...(postsPt as FeedDoc[]), ...(postsEn as FeedDoc[])].filter((post) => Boolean(post.date))

  const now = new Date()
  const feed = new Feed({
    title: config.name,
    description: config.description,
    id: url,
    link: url,
    language: config.language,
    favicon: `${url}/favicon.ico`,
    copyright: `All rights reserved ${now.getFullYear()}, ${config.name}`,
    generator: 'nuxt-content',
  })

  docs.forEach((post) => {
    if (!post.date) {
      return
    }

    const path = toPublicPath(post.path)
    feed.addItem({
      title: post.title || '-',
      id: withoutTrailingSlash(url + path),
      link: withoutTrailingSlash(url + path),
      description: post.description,
      date: new Date(post.date),
      image: post.cover ? url + withLeadingSlash(post.cover) : undefined,
    })
  })

  event.node.res.setHeader('content-type', 'text/xml')
  return feed.rss2()
})
