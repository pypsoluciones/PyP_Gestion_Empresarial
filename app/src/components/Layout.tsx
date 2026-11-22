import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import NavMovil from './NavMovil'

const MenuCtx = createContext<() => void>(() => {})
export const useAbrirMenu = () => useContext(MenuCtx)

export default function Layout() {
  const [abierto, setAbierto] = useState(false)
  return (
    <MenuCtx.Provider value={() => setAbierto(true)}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar abierto={abierto} cerrar={() => setAbierto(false)} />
        <main className="relative flex h-screen w-full flex-1 flex-col overflow-hidden pb-16 md:pb-0">
          <Outlet />
        </main>
        <NavMovil />
      </div>
    </MenuCtx.Provider>
  )
}
