import { toPublicPath } from '~~/utils/postPath'

export default defineEventHandler(async (event) => {
  const [postsPt, postsEn] = await Promise.all([
    queryCollection(event, 'posts').where('listed', '=', true).where('draft', '=', false).all(),
    queryCollection(event, 'posts_en').where('listed', '=', true).where('draft', '=', false).all(),
  ])

  return [...postsPt, ...postsEn].map((item) => {
    const alternatives = (item.alternates || []).map((alt: { hreflang: string; href: string }) => ({
      ...alt,
      href: alt.href?.startsWith('http') ? alt.href : toPublicPath(alt.href),
    }))

    return asSitemapUrl({
      loc: toPublicPath(item.path),
      lastmod: item.date,
      images: item.cover ? [{ loc: item.cover, caption: item.title }] : undefined,
      alternatives,
    })
  })
})
