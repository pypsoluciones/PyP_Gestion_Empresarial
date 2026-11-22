import { db, empresaDelUsuario } from './supabase'

export async function contarCierresPendientes(): Promise<number | null> {
  const { count, error } = await db().from('cierres_pendientes_verificacion').select('id_cierre', { count: 'exact', head: true })
  return error ? null : count ?? 0
}

export async function contarCxCPendientes(): Promise<number | null> {
  const emp = await empresaDelUsuario()
  let q = db().from('ventas_facturas').select('id_factura', { count: 'exact', head: true })
    .in('estatus', ['VENCIDA', 'POR_PAGAR', 'PARCIAL']).gt('saldo_pendiente_usd', 0)
  if (emp != null) q = q.eq('id_empresa', emp)
  const { count, error } = await q
  return error ? null : count ?? 0
}
