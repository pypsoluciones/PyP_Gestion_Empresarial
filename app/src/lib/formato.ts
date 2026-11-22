export function dinero(n: number | string | null | undefined): string {
  const v = parseFloat(String(n ?? 0)) || 0
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function haceCuanto(fechaIso: string | null | undefined, ahora: Date = new Date()): string {
  if (!fechaIso) return ''
  const f = new Date(fechaIso)
  if (isNaN(f.getTime())) return ''
  const min = Math.floor((ahora.getTime() - f.getTime()) / 60000)
  if (min < 1) return 'ahora'
  if (min < 60) return `hace ${min} min`
  if (min < 1440) return `hace ${Math.floor(min / 60)} h`
  return f.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit' })
}
