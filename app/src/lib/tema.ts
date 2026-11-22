// Marca blanca: mismos valores que guardan login.html y las páginas antiguas.
export function aplicarTema(): void {
  const g = (k: string, d: string) => { try { return localStorage.getItem(k) || d } catch { return d } }
  const r = document.documentElement.style
  r.setProperty('--color-primary', g('pyp_color_primario', '#143B62'))
  r.setProperty('--color-secondary', g('pyp_color_secundario', '#E67E22'))
  r.setProperty('--color-tertiary', g('pyp_color_terciario', '#64748b'))
  r.setProperty('--font-global', g('pyp_fuente', "'Inter', sans-serif"))
  // Mínimo 14 px aunque la configuración guardada diga menos
  const tam = parseFloat(g('pyp_tamano', '14px'))
  r.setProperty('--size-global', `${Math.max(14, isNaN(tam) ? 14 : tam)}px`)
}

export function logoSidebar(): string | null {
  try { return localStorage.getItem('pyp_logo_pc_url') } catch { return null }
}
