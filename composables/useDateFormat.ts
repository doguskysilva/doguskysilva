export function formatDate(date: string | number, locale = 'pt-BR'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function msToISO8601Duration(ms: number): string {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  let d = 'PT'
  if (h > 0) d += `${h}H`
  if (m > 0) d += `${m}M`
  if (sec > 0) d += `${sec}S`
  return d === 'PT' ? 'PT0S' : d
}
