import { NavLink } from 'react-router-dom'
import { NAV_MOVIL } from '../menu'
import { useConteo } from '../lib/useConteo'
import { contarCxCPendientes } from '../lib/badges'

export default function NavMovil() {
  const cxc = useConteo(contarCxCPendientes, 120_000)
  const clase = (activo: boolean) => `relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-sm font-bold ${activo ? 'text-primary' : 'text-slate-500'}`
  return (
    <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-slate-200 bg-white shadow md:hidden">
      {NAV_MOVIL.map(it => {
        const contenido = (
          <>
            <i className={`fa-solid ${it.icono} text-lg`} />
            <span>{it.etiqueta}</span>
            {it.badge === 'cxc' && !!cxc && <span className="absolute right-[calc(50%-24px)] top-1 rounded-full bg-red-600 px-1.5 text-sm text-white">{cxc > 99 ? '99+' : cxc}</span>}
          </>
        )
        return it.ruta
          ? <NavLink key={it.etiqueta} to={it.ruta} end className={({ isActive }) => clase(isActive)}>{contenido}</NavLink>
          : <a key={it.etiqueta} href={it.href} className={clase(false)}>{contenido}</a>
      })}
    </nav>
  )
}
