import { useEffect, useState } from 'react'

/** Ejecuta una consulta de conteo y la repite cada «cadaMs». Devuelve null mientras carga o si falla. */
export function useConteo(consulta: () => Promise<number | null>, cadaMs: number): number | null {
  const [n, setN] = useState<number | null>(null)
  useEffect(() => {
    let vivo = true
    const correr = () => consulta().then(v => { if (vivo) setN(v) }).catch(() => {})
    correr()
    const id = window.setInterval(correr, cadaMs)
    return () => { vivo = false; window.clearInterval(id) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cadaMs])
  return n
}
