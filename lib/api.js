import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const POSTS_DIR = join(process.cwd(), '_posts')

export const getPostSlugs = () => fs.readdirSync(POSTS_DIR)

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(POSTS_DIR, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })
  return items
}

export const getAllPosts = (fields = []) => {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
}

export const getPostsByTag = (tag = '', fields = []) => {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    .filter(post => post.tags.includes(tag.toLowerCase()))
}

export const getAllTags = () => {
  const tags = getPostSlugs()
    .map(slug => getPostBySlug(slug, ['tags'])['tags'])
    .flat(Infinity)

    let countTags = {}

    tags.forEach(tag => {
      countTags[tag] = (countTags[tag] || 0) + 1
    })

  return countTags
}