import { useEffect, useState } from 'react'
import { useAbrirMenu } from '../components/Layout'
import { db, empresaDelUsuario, revisarSesion } from '../lib/supabase'
import { nombreUsuario } from '../lib/sesion'
import { dinero, haceCuanto } from '../lib/formato'
import { inicioDelDiaLocalIso, semaforoCxC, totalVentasDia, type Semaforo } from '../lib/dashboard'

interface Tasa { tasa: number; fecha_actualizacion?: string }
interface Datos {
  empresa: { nombre_empresa?: string; rif?: string } | null
  productos: number | null; clientes: number | null; taller: number | null
  ventasHoy: number | null
  usd: Tasa | null; eur: Tasa | null
  cajaAbierta: boolean | null
  semaforo: Semaforo | null
}

const VACIO: Datos = { empresa: null, productos: null, clientes: null, taller: null, ventasHoy: null, usd: null, eur: null, cajaAbierta: null, semaforo: null }

async function cargar(): Promise<Datos> {
  const emp = await empresaDelUsuario()
  // Mismo criterio que el HTML antiguo: sin empresa, filtra id_empresa nulo
  const filtrar = <T extends { eq: (c: string, v: unknown) => T; is: (c: string, v: null) => T }>(q: T): T =>
    emp != null ? q.eq('id_empresa', emp) : q.is('id_empresa', null)
  const conteo = { count: 'exact' as const, head: true }
  const c = db()

  const [rEmp, rProd, rCli, rTaller, rTasas, rCaja, rVen, rCxC] = await Promise.all([
    emp != null ? c.from('empresas').select('nombre_empresa,rif').eq('id_empresa', emp).limit(1) : Promise.resolve({ data: [], status: 200 }),
    filtrar(c.from('productos').select('id_producto_sku', conteo).eq('estado_producto', 'ACTIVO')),
    filtrar(c.from('directorio_maestro').select('id', conteo).eq('tipo_persona', 'CLIENTE')),
    filtrar(c.from('servicio_ordenes').select('id_orden', conteo).neq('estatus', 'Facturado')),
    c.from('tasas_bcv').select('*'),
    filtrar(c.from('cierres_caja').select('*', conteo).eq('usuario_cajero', nombreUsuario()).eq('estatus', 'ABIERTA')),
    filtrar(c.from('ventas_facturas').select('total_usd,tipo_transaccion').gte('fecha_emision', inicioDelDiaLocalIso()).neq('estatus', 'ANULADA')),
    filtrar(c.from('ventas_facturas').select('saldo_pendiente_usd,fecha_vencimiento').in('estatus', ['POR_PAGAR', 'PARCIAL', 'VENCIDA']).gt('saldo_pendiente_usd', 0)),
  ])
  revisarSesion(rProd.status)

  const tasas = (rTasas.data ?? []) as (Tasa & { moneda: string })[]
  return {
    empresa: (rEmp.data as Datos['empresa'][] | null)?.[0] ?? null,
    productos: rProd.error ? null : rProd.count ?? 0,
    clientes: rCli.error ? null : rCli.count ?? 0,
    taller: rTaller.error ? null : rTaller.count ?? 0,
    usd: tasas.find(t => t.moneda === 'USD') ?? null,
    eur: tasas.find(t => t.moneda === 'EUR') ?? null,
    cajaAbierta: rCaja.error ? null : (rCaja.count ?? 0) > 0,
    ventasHoy: rVen.error ? null : totalVentasDia(rVen.data ?? []),
    semaforo: rCxC.error ? null : semaforoCxC(rCxC.data ?? []),
  }
}

function leerPrivado(): boolean {
  try { return localStorage.getItem('pyp_privacidad') !== 'false' } catch { return true }
}

const n = (v: number | null) => (v == null ? '—' : String(v))

export default function Dashboard() {
  const abrirMenu = useAbrirMenu()
  const [d, setD] = useState<Datos>(VACIO)
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>('cargando')
  const [privado, setPrivado] = useState(leerPrivado)

  const recargar = () => {
    setEstado('cargando')
    cargar().then(x => { setD(x); setEstado('listo') }).catch(e => { console.warn('Error cargando dashboard:', e); setEstado('error') })
  }
  useEffect(recargar, [])

  const cambiarPrivado = () => setPrivado(p => {
    try { localStorage.setItem('pyp_privacidad', String(!p)) } catch { /* sin almacenamiento */ }
    return !p
  })

  const fecha = new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const s = d.semaforo

  return (
    <div className={`flex h-full flex-col ${privado ? 'modo-privado' : ''}`}>
      {/* Encabezado */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-primary px-4 py-3 text-white">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={abrirMenu} className="rounded px-2 py-1 text-lg md:hidden" aria-label="Abrir menú"><i className="fa-solid fa-bars" /></button>
          <h1 className="text-lg font-bold"><i className="fa-solid fa-chart-pie mr-2" />Resumen gerencial</h1>
          <span className="text-sm capitalize text-white/90">{fecha}</span>
          {d.empresa && <span className="rounded-full bg-white px-3 py-0.5 text-sm font-semibold text-primary">{d.empresa.nombre_empresa ?? '—'} {d.empresa.rif ?? ''}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={recargar} className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10"><i className="fa-solid fa-rotate-right mr-1" />Actualizar</button>
          <button onClick={cambiarPrivado} className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10">
            <i className={`fa-solid ${privado ? 'fa-eye-slash' : 'fa-eye'} mr-1`} />{privado ? 'Montos ocultos' : 'Montos visibles'}
          </button>
          <span className="text-sm"><i className="fa-solid fa-user-tie mr-1" />{nombreUsuario().split(' ')[0]}</span>
        </div>
      </header>

      {/* Tasas y caja */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-200 bg-white px-4 py-2 text-sm text-slate-800">
        <span><b>USD · BCV oficial:</b> {d.usd ? `Bs. ${Number(d.usd.tasa).toFixed(4)}` : 'Bs. —'} <span className="text-slate-600">{haceCuanto(d.usd?.fecha_actualizacion)}</span></span>
        <span><b>EUR · BCV oficial:</b> {d.eur ? `Bs. ${Number(d.eur.tasa).toFixed(4)}` : 'Bs. —'} <span className="text-slate-600">{haceCuanto(d.eur?.fecha_actualizacion)}</span></span>
        <span className="flex items-center gap-2">
          <span className={`inline-block h-3 w-3 rounded-full ${d.cajaAbierta == null ? 'bg-slate-400' : d.cajaAbierta ? 'bg-green-500' : 'bg-red-500'}`} />
          {d.cajaAbierta == null ? 'Caja: verificando' : d.cajaAbierta ? 'Caja abierta' : 'Caja cerrada'}
          <a href="/admin_caja.html" className="font-semibold text-primary underline">Gestionar caja</a>
        </span>
      </div>

      <div className="custom-scroll flex-1 space-y-6 overflow-y-auto p-4">
        {estado === 'error' && <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">No se pudieron cargar los indicadores. Revisa la conexión y pulsa «Actualizar».</p>}

        {/* Indicadores */}
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-700">Indicadores del día</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { t: 'Ventas hoy', v: d.ventasHoy == null ? '—' : `$${dinero(d.ventasHoy)}`, i: 'fa-cash-register', c: 'text-green-700', sensible: true },
              { t: 'Productos activos', v: n(d.productos), i: 'fa-boxes-stacked', c: 'text-blue-700' },
              { t: 'Equipos en taller', v: n(d.taller), i: 'fa-screwdriver-wrench', c: 'text-amber-700' },
              { t: 'Clientes', v: n(d.clientes), i: 'fa-users', c: 'text-purple-700' },
            ].map(k => (
              <div key={k.t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <i className={`fa-solid ${k.i} text-2xl ${k.c}`} />
                <div>
                  <div className="text-sm text-slate-600">{k.t}</div>
                  <div className={`text-xl font-black ${k.c} ${k.sensible ? 'dato-sensible' : ''}`}>{estado === 'cargando' ? '…' : k.v}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semáforo CxC */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Cuentas por cobrar</h2>
            <a href="/admin_cxc.html" className="text-sm font-semibold text-primary underline">Ver todo</a>
          </div>
          {[
            { t: 'Vencidas', sub: 'facturas fuera de plazo', uno: 'factura fuera de plazo', x: s?.vencidas, color: 'bg-red-600', txt: 'text-red-800' },
            { t: 'Por vencer (3 días)', sub: 'facturas por vencerse', uno: 'factura por vencerse', x: s?.porVencer, color: 'bg-amber-500', txt: 'text-amber-800' },
            { t: 'Deuda sana', sub: 'facturas a tiempo', uno: 'factura a tiempo', x: s?.sanas, color: 'bg-green-600', txt: 'text-green-800' },
          ].map(r => (
            <div key={r.t} className="flex flex-wrap items-center gap-3 border-t border-slate-100 py-2 first:border-t-0">
              <span className={`h-3 w-3 rounded-full ${r.color}`} />
              <div className="min-w-[10rem] flex-1">
                <div className={`text-sm font-bold ${r.txt}`}>{r.t}</div>
                <div className="text-sm text-slate-600">{r.x?.cantidad ?? 0} {(r.x?.cantidad ?? 0) === 1 ? r.uno : r.sub}</div>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded bg-slate-100">
                <div className={`h-2 ${r.color} transition-all duration-700`} style={{ width: `${r.x?.porcentaje ?? 0}%` }} />
              </div>
              <span className={`dato-sensible w-28 text-right text-sm font-bold ${r.txt}`}>${dinero(r.x?.monto ?? 0)}</span>
            </div>
          ))}
        </section>

        {/* Accesos rápidos */}
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-700">Accesos rápidos</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { t: 'Gestionar caja', h: '/admin_caja.html', i: 'fa-vault' },
              { t: 'Nueva venta', h: '/admin_ventas.html', i: 'fa-file-invoice' },
              { t: 'Clientes', h: '/admin_contactos.html', i: 'fa-users' },
              { t: 'Historial de ventas', h: '/admin_ventas_historial.html', i: 'fa-chart-bar' },
            ].map(a => (
              <a key={a.t} href={a.h} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-secondary">
                <i className={`fa-solid ${a.i} text-2xl text-primary`} />{a.t}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
