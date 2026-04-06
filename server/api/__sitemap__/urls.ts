export default defineEventHandler(async (event) => {
  const [postsPt, postsEn] = await Promise.all([
    queryCollection(event, 'posts').where('listed', '=', true).where('draft', '=', false).all(),
    queryCollection(event, 'posts_en').where('listed', '=', true).where('draft', '=', false).all(),
  ])

  return [...postsPt, ...postsEn].map((item) => {
    return asSitemapUrl({
      loc: item.path,
      lastmod: item.date,
      images: item.cover ? [{ loc: item.cover, caption: item.title }] : undefined,
      alternatives: item.alternates || [],
    })
  })
})
