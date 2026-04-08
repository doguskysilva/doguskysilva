export type Author = {
  username: string
  name: string
  avatar: string
  description: string
  default: boolean
}

export const findAuthor = (authorId?: string): Author => {
  const config = useAppConfig()

  const defaultConfiguredAuthor = config.authors?.find((author: Author) => author.default)

  const defaultAuthor: Author = {
    username: defaultConfiguredAuthor?.username || '',
    name: defaultConfiguredAuthor?.name || config.name || 'Author',
    avatar: defaultConfiguredAuthor?.avatar || '',
    description: defaultConfiguredAuthor?.description || '',
    default: Boolean(defaultConfiguredAuthor),
  }

  if (authorId === undefined) {
    return defaultConfiguredAuthor || defaultAuthor
  }

  return config.authors?.find((author: Author) => author.username === authorId) || defaultConfiguredAuthor || defaultAuthor
}
