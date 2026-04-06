const POST_PATH_RE = /^\/(?:(?:en|pt)\/)?\d{4}\//

function normalizePath(path: string): string {
  if (!path) {
    return '/'
  }

  if (path === '/') {
    return '/'
  }

  return path.replace(/\/$/, '') || '/'
}

export function isLegacyPostPath(path: string): boolean {
  return POST_PATH_RE.test(normalizePath(path))
}

export function toPublicPath(path: string): string {
  const normalized = normalizePath(path)

  if (normalized === '/') {
    return '/pt'
  }

  if (normalized.startsWith('/en/')) {
    const enPath = normalized.slice(4)
    if (/^\d{4}\//.test(enPath)) {
      return `/en/blog/${enPath}`
    }
    return normalized
  }

  if (normalized.startsWith('/pt/')) {
    const ptPath = normalized.slice(4)
    if (/^\d{4}\//.test(ptPath)) {
      return `/pt/blog/${ptPath}`
    }
    return normalized
  }

  if (/^\/\d{4}\//.test(normalized)) {
    return `/pt/blog${normalized}`
  }

  return `/pt${normalized}`
}

export function toContentPath(path: string): string {
  const normalized = normalizePath(path)

  if (normalized === '/pt') {
    return '/'
  }

  if (normalized.startsWith('/en/blog/')) {
    return `/en/${normalized.slice('/en/blog/'.length)}`
  }

  if (normalized.startsWith('/pt/blog/')) {
    return `/${normalized.slice('/pt/blog/'.length)}`
  }

  if (normalized.startsWith('/pt/')) {
    return `/${normalized.slice('/pt/'.length)}`
  }

  if (normalized.startsWith('/blog/')) {
    return `/${normalized.slice('/blog/'.length)}`
  }

  return normalized
}
