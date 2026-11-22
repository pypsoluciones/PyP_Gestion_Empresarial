// G001 · Pruebas del Dashboard. Casos comparables: mismo dato base, cambia UNA variable.
import { describe, it, expect } from 'vitest'
import { totalVentasDia, semaforoCxC, inicioDelDiaLocalIso } from './dashboard'

// "Hoy" fijo: 21-11-2026 a las 21:00 de Caracas (01:00 UTC del 22-11)
const AHORA = new Date('2026-11-22T01:00:00Z')

describe('zona horaria de la prueba', () => {
  it('corre en hora de Caracas (UTC-4)', () => {
    expect(new Date('2026-11-21T12:00:00Z').getTimezoneOffset()).toBe(240)
  })
})

describe('totalVentasDia', () => {
  it('por defecto: una factura de 100 suma 100', () => {
    expect(totalVentasDia([{ total_usd: 100, tipo_transaccion: 'FACTURA' }])).toBe(100)
  })
  it('la misma factura + una nota de crédito de 30 da 70', () => {
    expect(totalVentasDia([{ total_usd: 100, tipo_transaccion: 'FACTURA' }, { total_usd: 30, tipo_transaccion: 'NOTA_CREDITO' }])).toBe(70)
  })
  it('la nota de crédito guardada en negativo también resta 30 (da 70)', () => {
    expect(totalVentasDia([{ total_usd: 100, tipo_transaccion: 'FACTURA' }, { total_usd: -30, tipo_transaccion: 'NOTA_CREDITO' }])).toBe(70)
  })
  it('montos como texto (así llegan de Supabase) suman igual: 100', () => {
    expect(totalVentasDia([{ total_usd: '100.00', tipo_transaccion: 'FACTURA' }])).toBe(100)
  })
  it('sin ventas da 0', () => {
    expect(totalVentasDia([])).toBe(0)
  })
})

describe('inicioDelDiaLocalIso', () => {
  it('a las 9 p. m. de Caracas el día empieza el 21 a las 04:00 UTC (no el 22)', () => {
    expect(inicioDelDiaLocalIso(AHORA)).toBe('2026-11-21T04:00:00.000Z')
  })
  it('a las 9 a. m. de Caracas da el mismo inicio', () => {
    expect(inicioDelDiaLocalIso(new Date('2026-11-21T13:00:00Z'))).toBe('2026-11-21T04:00:00.000Z')
  })
})

describe('semaforoCxC', () => {
  const base = (fecha: string) => semaforoCxC([{ saldo_pendiente_usd: 100, fecha_vencimiento: fecha }], AHORA)
  it('saldo 100 vencido ayer: rojo', () => {
    const s = base('2026-11-20')
    expect([s.vencidas.monto, s.porVencer.monto, s.sanas.monto]).toEqual([100, 0, 0])
  })
  it('saldo 100 que vence hoy: amarillo', () => {
    const s = base('2026-11-21')
    expect([s.vencidas.monto, s.porVencer.monto, s.sanas.monto]).toEqual([0, 100, 0])
  })
  it('saldo 100 que vence en 3 días: amarillo', () => {
    const s = base('2026-11-24')
    expect([s.vencidas.monto, s.porVencer.monto, s.sanas.monto]).toEqual([0, 100, 0])
  })
  it('saldo 100 que vence en 4 días: verde', () => {
    const s = base('2026-11-25')
    expect([s.vencidas.monto, s.porVencer.monto, s.sanas.monto]).toEqual([0, 0, 100])
  })
  it('porcentajes y cantidades: 100 vencido + 300 sano = 25 % y 75 %', () => {
    const s = semaforoCxC([
      { saldo_pendiente_usd: 100, fecha_vencimiento: '2026-11-20' },
      { saldo_pendiente_usd: 300, fecha_vencimiento: '2026-12-31' },
    ], AHORA)
    expect([s.vencidas.porcentaje, s.sanas.porcentaje, s.vencidas.cantidad, s.sanas.cantidad]).toEqual([25, 75, 1, 1])
  })
  it('sin facturas: todo en 0, sin dividir entre 0', () => {
    const s = semaforoCxC([], AHORA)
    expect([s.vencidas.porcentaje, s.porVencer.porcentaje, s.sanas.porcentaje]).toEqual([0, 0, 0])
  })
})
