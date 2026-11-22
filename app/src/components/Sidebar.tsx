import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GRUPOS, INICIO, WEB_EXTERNAS, type ItemMenu } from '../menu'
import { cerrarSesion } from '../lib/sesion'
import { logoSidebar } from '../lib/tema'
import { useConteo } from '../lib/useConteo'
import { contarCierresPendientes } from '../lib/badges'
import { VERSION } from '../version'

const subActivo = 'bg-white/10 text-white font-bold border-l-4 border-secondary'
const subInactivo = 'text-gray-300 hover:text-white hover:bg-white/5'

function Contador({ n }: { n: number | null }) {
  if (!n) return null
  return <span className="ml-2 rounded-full bg-red-600 px-2 text-sm font-bold text-white">{n > 99 ? '99+' : n}</span>
}

function Item({ item, cierres, alNavegar }: { item: ItemMenu; cierres: number | null; alNavegar: () => void }) {
  const badge = item.badge === 'cierres' ? <Contador n={cierres} /> : null
  const base = 'flex items-center justify-between rounded-md py-1.5 px-3 text-sm transition'
  if (item.ruta) {
    return <NavLink to={item.ruta} end onClick={alNavegar} className={({ isActive }) => `${base} ${isActive ? subActivo : subInactivo}`}>{item.etiqueta}{badge}</NavLink>
  }
  if (item.pendiente || !item.href) {
    return <span className={`${base} cursor-not-allowed text-gray-300 italic`} title="Esta pantalla todavía no existe">{item.etiqueta} (pendiente){badge}</span>
  }
  return <a href={item.href} className={`${base} ${subInactivo}`}>{item.etiqueta}{badge}</a>
}

export default function Sidebar({ abierto, cerrar }: { abierto: boolean; cerrar: () => void }) {
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({})
  const cierres = useConteo(contarCierresPendientes, 60_000)
  const logo = logoSidebar()

  const salir = () => { if (window.confirm('¿Seguro que deseas cerrar sesión?')) cerrarSesion() }

  return (
    <>
      {abierto && <div onClick={cerrar} className="fixed inset-0 z-40 bg-gray-900/70 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary text-white shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 ${abierto ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 p-3">
          {logo
            ? <img src={logo} alt="Logo" className="max-h-12 w-full object-contain object-left" />
            : <div className="flex items-center gap-3"><i className="fa-solid fa-layer-group text-xl text-tertiary" /><span className="text-base font-semibold">P&amp;P Admin</span></div>}
          <button onClick={cerrar} className="ml-2 text-xl text-gray-300 hover:text-white md:hidden" aria-label="Cerrar menú"><i className="fa-solid fa-times" /></button>
        </div>

        <nav className="custom-scroll flex-1 space-y-1 overflow-y-auto p-2 pb-6">
          <NavLink to={INICIO.ruta!} end onClick={cerrar} className={({ isActive }) => `flex items-center rounded-md p-2 text-sm transition ${isActive ? 'bg-white font-black text-primary shadow-md' : 'text-gray-200 hover:bg-white/10'}`}>
            <i className={`fa-solid ${INICIO.icono} mr-3 w-4`} /> {INICIO.etiqueta}
          </NavLink>

          {GRUPOS.map(g => (
            <div key={g.etiqueta} className="pt-1">
              <button type="button" onClick={() => setAbiertos(a => ({ ...a, [g.etiqueta]: !a[g.etiqueta] }))}
                className="flex w-full items-center justify-between rounded-md p-2 text-sm text-gray-200 transition hover:bg-white/10">
                <span className="flex items-center"><i className={`fa-solid ${g.icono} mr-3 w-4`} /> {g.etiqueta}</span>
                <i className={`fa-solid ${abiertos[g.etiqueta] ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`} />
              </button>
              {abiertos[g.etiqueta] && (
                <div className="mt-1 space-y-1 pl-6">
                  {g.items.map(it => <Item key={it.etiqueta} item={it} cierres={cierres} alNavegar={cerrar} />)}
                </div>
              )}
            </div>
          ))}

          <hr className="my-4 border-white/10" />
          <p className="mb-2 px-3 text-sm font-bold uppercase tracking-widest text-tertiary">Web externas</p>
          {WEB_EXTERNAS.map(w => (
            <a key={w.etiqueta} href={w.href} target="_blank" rel="noreferrer" className="flex items-center rounded-md p-2 text-sm text-gray-300 transition hover:bg-secondary hover:text-white">
              <i className="fa-solid fa-globe mr-3 w-4" /> {w.etiqueta}
            </a>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 bg-black/20 p-3">
          <button onClick={salir} className="flex w-full items-center justify-center gap-2 rounded border border-white/20 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-100 transition hover:bg-white/10">
            <i className="fa-solid fa-power-off" /> Cerrar sesión
          </button>
          <p className="mt-2 text-center text-sm text-gray-300">Versión {VERSION}</p>
        </div>
      </aside>
    </>
  )
}
