// Sesión compartida con las páginas antiguas: mismo localStorage, mismo dominio.
export const CLAVE_TOKEN = 'pyp_token_seguro'

function leer(clave: string): string | null {
  try { return localStorage.getItem(clave) } catch { return null }
}

export function obtenerToken(): string | null {
  return leer(CLAVE_TOKEN)
}

export function nombreUsuario(): string {
  return leer('pyp_usuario_nombre') || 'SISTEMA'
}

export function irAlLogin(): void {
  window.location.href = '/login.html'
}

export function cerrarSesion(): void {
  try { localStorage.removeItem(CLAVE_TOKEN) } catch { /* sin almacenamiento */ }
  irAlLogin()
}
