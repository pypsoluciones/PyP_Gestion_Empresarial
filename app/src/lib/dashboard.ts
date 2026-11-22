// Cálculos del Dashboard, separados de la pantalla para poder probarlos.

export interface VentaDia { total_usd: number | string; tipo_transaccion?: string | null }
export interface FacturaCxC { saldo_pendiente_usd: number | string; fecha_vencimiento: string }
export interface Tramo { monto: number; cantidad: number; porcentaje: number }
export interface Semaforo { vencidas: Tramo; porVencer: Tramo; sanas: Tramo }

/** Total del día: las notas de crédito restan (se toma su valor absoluto). */
export function totalVentasDia(ventas: VentaDia[]): number {
  return ventas.reduce((acc, v) => {
    const t = parseFloat(String(v.total_usd)) || 0
    return v.tipo_transaccion === 'NOTA_CREDITO' ? acc - Math.abs(t) : acc + t
  }, 0)
}

/**
 * Inicio del día LOCAL expresado en UTC (ISO).
 * Corrige el HTML antiguo, que usaba la fecha UTC: en Caracas, después de las 8 p. m. las ventas del día salían en 0.
 */
export function inicioDelDiaLocalIso(ahora: Date = new Date()): string {
  const d = new Date(ahora)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

/** Semáforo CxC: vencida (antes de hoy), por vencer (hoy a hoy+3) y sana (después). Igual que el HTML antiguo. */
export function semaforoCxC(facturas: FacturaCxC[], ahora: Date = new Date()): Semaforo {
  const hoy = new Date(ahora); hoy.setHours(0, 0, 0, 0)
  const alerta = new Date(hoy); alerta.setDate(hoy.getDate() + 3); alerta.setHours(23, 59, 59, 999)
  const s = { v: [0, 0], p: [0, 0], s: [0, 0] }
  for (const f of facturas) {
    const fv = new Date(f.fecha_vencimiento + 'T12:00:00')
    const saldo = parseFloat(String(f.saldo_pendiente_usd)) || 0
    const t = fv < hoy ? s.v : fv <= alerta ? s.p : s.s
    t[0] += saldo; t[1]++
  }
  const total = s.v[0] + s.p[0] + s.s[0] || 1
  const tramo = ([monto, cantidad]: number[]): Tramo => ({ monto, cantidad, porcentaje: Math.round(monto / total * 100) })
  return { vencidas: tramo(s.v), porVencer: tramo(s.p), sanas: tramo(s.s) }
}
