import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { obtenerToken, irAlLogin } from './sesion'

// Una sola capa de datos. Usa el token que guardó login.html (no gestiona la sesión: eso sigue en login.html).
let cliente: SupabaseClient | null = null

export function db(): SupabaseClient {
  const token = obtenerToken()
  if (!token) { irAlLogin(); throw new Error('Sin sesión') }
  if (!cliente) {
    cliente = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  }
  return cliente
}

/** Si Supabase responde 401/403 la sesión venció: vuelve al login, igual que las páginas antiguas. */
export function revisarSesion(status: number): void {
  if (status === 401 || status === 403) irAlLogin()
}

/** Empresa del usuario (misma consulta que las páginas antiguas). */
export async function empresaDelUsuario(): Promise<number | string | null> {
  const { data, status } = await db().from('usuarios').select('id_empresa').limit(1)
  revisarSesion(status)
  return data && data.length > 0 ? (data[0].id_empresa ?? null) : null
}
