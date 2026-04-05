export function extractText(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (typeof node === 'object') {
    const n = node as Record<string, unknown>
    if (n['type'] === 'text') return String(n['value'] ?? '')
    if (n['children']) return extractText(n['children'])
  }
  return ''
}

export function readingTime(body: unknown): string {
  const words = extractText(body).trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}
