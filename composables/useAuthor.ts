export type Author = {
  username: string
  name: string
  avatar: string
  description: string
  default?: boolean
  socials?: Record<string, string>
}

export function findAuthor(authorId?: string): Author {
  const config = useAppConfig() as { authors?: Author[] }
  const fallback: Author = { username: authorId ?? '', name: authorId ?? '', avatar: '', description: '' }
  if (!authorId) {
    return config.authors?.find(a => a.default) ?? config.authors?.[0] ?? fallback
  }
  return config.authors?.find(a => a.username === authorId) ?? fallback
}
