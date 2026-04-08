export type Author = {
  username: string
  name: string
  avatar: string
  description: string
  repository?: string
  default: boolean
}

export const findAuthor = (
  authorId: string | undefined,
  contentAuthors: Author[] = [],
  configAuthors: Author[] = [],
  fallbackName = 'Author',
): Author => {
  const sourceAuthors = contentAuthors.length > 0 ? contentAuthors : configAuthors
  const defaultAuthor = sourceAuthors.find((author) => author.default) || sourceAuthors[0]

  if (authorId) {
    return sourceAuthors.find((author) => author.username === authorId) || defaultAuthor || {
      username: '',
      name: fallbackName,
      avatar: '',
      description: '',
      repository: '',
      default: false,
    }
  }

  return defaultAuthor || {
    username: '',
    name: fallbackName,
    avatar: '',
    description: '',
    repository: '',
    default: false,
  }
}
