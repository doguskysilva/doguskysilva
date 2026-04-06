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

  setResponseHeader(event, 'cache-control', 'max-age=300, must-revalidate')
  return [...ptSections, ...enSections]
})
