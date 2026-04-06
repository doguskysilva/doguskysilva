export function extractText(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') {
    const trimmed = node.trim()
    // Nuxt Content v3 may store body as serialized minimark JSON.
    if ((trimmed.startsWith('{') || trimmed.startsWith('['))) {
      try {
        return extractText(JSON.parse(trimmed))
      } catch {
        return node
      }
    }
    return node
  }
  if (Array.isArray(node)) {
    // Nuxt Content minimark node format: [tag, attrs?, ...children]
    const hasAttrsObject = typeof node[1] === 'object' && node[1] !== null && !Array.isArray(node[1])
    if (typeof node[0] === 'string' && hasAttrsObject) {
      const children = hasAttrsObject ? node.slice(2) : node.slice(1)
      return children.map(extractText).join(' ')
    }
    return node.map(extractText).join(' ')
  }
  if (typeof node === 'object') {
    const n = node as Record<string, unknown>
    if (n['type'] === 'text') return String(n['value'] ?? '')
    if (n['type'] === 'minimark' && n['value']) return extractText(n['value'])
    if (typeof n['text'] === 'string') return n['text']
    if (typeof n['value'] === 'string') return n['value']
    if (n['children']) return extractText(n['children'])
    if (n['value']) return extractText(n['value'])
  }
  return ''
}

export function readingTime(body: unknown): string {
  const words = extractText(body).trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}
