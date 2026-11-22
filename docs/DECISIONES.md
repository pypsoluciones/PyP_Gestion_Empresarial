<!-- INICIO_S000 -->
# DECISIONES · PyP Gestión Empresarial

_Numeradas D-nnn. Se agregan; una nueva puede reemplazar a otra y lo dice._

## D-001 · 2026-11-21 · Ruta local del proyecto
`D:\Proyectos\PyP_Gestion_Empresarial`, igual que PyP Control Escolar (`D:\Proyectos\...`). Motivo: misma rutina y mismos comandos en todos los proyectos.

## D-002 · 2026-11-21 · Repo renombrado en GitHub
`pypsoluciones/pyp-plus-core` → `pypsoluciones/PyP_Gestion_Empresarial`. GitHub redirige el nombre viejo; el remoto local ya apunta al nuevo. El despliegue de Cloudflare hay que revisarlo tras el cambio.

## D-003 · 2026-11-21 · Se trabaja con las mismas normas que PyP Control Escolar
Rigen las Preferencias personales de Lesme y `docs\NORMAS_GENERALES_CLAUDE.md`. Si chocan, manda lo más estricto.

<!-- CIERRE_S001 -->
## D-004 · 2026-11-22 · Prefijo de parches «G»
Parches G001, G002… La versión visible es el último parche aplicado (`app/src/version.ts`).

## D-005 · 2026-11-22 · Migración a React por módulos
Vite + React + TypeScript + Tailwind en el mismo repo. El HTML antiguo vive en `public/` con sus mismas URLs; React en `/app/` (BrowserRouter con basename `/app`, `_redirects` para las rutas). Sesión compartida por `localStorage` (`pyp_token_seguro`). Un módulo migrado cambia su entrada en `app/src/menu.ts` (`ruta` en vez de `href`); el HTML viejo se borra cuando el nuevo está probado. Datos con `supabase-js` en una sola capa (`app/src/lib/supabase.ts`); configuración única en `public/config.js`.

## D-006 · 2026-11-22 · Solo Cloudflare, nada de Vercel
Se quitó Vercel del código (G002) y de GitHub. Todos los proyectos de P&P deben desplegar en Cloudflare; cada uno se revisa en su propia sesión.

## D-007 · 2026-11-22 · El «día» es el de Caracas
«Ventas hoy» se cuenta desde la medianoche local, no desde la medianoche UTC (`inicioDelDiaLocalIso`).
