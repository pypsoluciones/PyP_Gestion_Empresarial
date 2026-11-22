<!-- INICIO_S000 -->
# TRASPASO DE SESIONES · PyP Gestión Empresarial

_Se agrega un bloque por sesión. Se conservan las últimas ~5; lo anterior va a `docs/archivo/`._

## Sesión 000 · 2026-11-21 · Recuperación tras pérdida del disco
**Hecho**
- Se clonó el repo desde GitHub en `D:\Proyectos\PyP_Gestion_Empresarial` (no había copia local).
- El repo se renombró en GitHub: `pypsoluciones/pyp-plus-core` → `pypsoluciones/PyP_Gestion_Empresarial`.
- PASO 0: se crearon los seis documentos estándar en `docs\` y se copió `NORMAS_GENERALES_CLAUDE.md`.
- Se generó el zip de código para Claude (`Z00_zip_para_claude`).

**Falta confirmar**
- Que Cloudflare siga desplegando tras el renombre.
- Comando de build en Cloudflare, prefijo de parches, marca de versión visible.

**Orden de la siguiente sesión**
1. Confirmar despliegue en Cloudflare.
2. Respaldar el esquema y las funciones de Supabase dentro del repo.
3. Revisar los pendientes de ESTADO (dominio viejo, enlaces rotos del menú).

<!-- CIERRE_S001 -->
## Sesión 001 · 2026-11-21/22 · Base React + quitar Vercel
**Hecho**
- Lesme clonó el repo con GitHub Desktop en `D:\Proyectos\PyP_Gestion_Empresarial`; C000 creó los documentos y copió las NORMAS originales.
- G001: HTML antiguo a `public/`, app React en `/app/` con Dashboard (corrige «Ventas hoy» en 0 después de las 8 p. m. y los conteos cortados en 1000). Prueba TODO OK en el PC.
- G002: fuera `vercel.app` y `catalogo-oficial.com` del código; sitemap con `tienda.html`. Prueba TODO OK en el PC.
- GitHub: About con `pypsoluciones.pypcloud.com`; Vercel desconectado.

**Falta confirmar**
- Que G001+G002 estén publicados (rama `react-base`), que la vista previa de Cloudflare cargue `/app/` y que en Cloudflare esté build `npm run build`, salida `dist`.
- Dashboard React contra el Supabase real (solo se probó con datos simulados).

**Orden de la siguiente sesión**
1. Confirmar la vista previa y pasar `react-base` a `main`.
2. G003: login y menú viejo llevan al Dashboard React; campana de notificaciones en React.
3. Siguiente módulo a React: Contactos.
