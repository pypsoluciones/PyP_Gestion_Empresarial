<!-- INICIO_S000 -->
<!-- CIERRE_S001 -->
# ESTADO DEL PROYECTO · PyP Gestión Empresarial

_Foto actual. Se REEMPLAZA entera en cada cierre. Actualizado: 2026-11-22 (cierre sesión 001)._

## Identidad
- **Producto:** ERP de facturación y gestión (POS, inventario, compras, caja, bancos, CxC, nómina, servicios) + catálogo público PWA (`tienda.html`).
- **URL en producción:** https://pypsoluciones.pypcloud.com/ (Cloudflare Workers and Pages, app de GitHub instalada).
- **Repositorio:** pypsoluciones/PyP_Gestion_Empresarial (antes `pyp-plus-core`). Cuenta personal de GitHub, no organización.
- **Ruta en el PC:** `D:\Proyectos\PyP_Gestion_Empresarial`. Git: el de GitHub Desktop (no está en el PATH).

## Versiones
- **Versión visible:** G002 (pie del menú lateral de la app React, `app/src/version.ts`).
- **Último parche:** G002 (quitar Vercel). **Siguiente parche:** G003.
- **Prefijo de parches:** G · **siguiente migración SQL:** ⬜ por confirmar (aún no hay migraciones en el repo).

## Qué funciona (probado en el PC con G001_prueba y G002_prueba: TODO OK)
- Páginas HTML antiguas en `public/`, mismas URLs. Su CSS (`public/styles.css`) sale idéntico al de antes.
- App React (Vite + TypeScript + Tailwind) en `/app/`: layout, menú lateral, barra móvil, sesión compartida con `login.html`, Dashboard.
- 14 pruebas de cálculo del Dashboard (`npm test`) y build completo (`npm run build` → `dist/`).

## Qué está roto / pendiente inmediato
1. **MANUAL:** no existe `MANUAL_*.md`; el Dashboard nuevo y el cambio de dominio no están documentados para el usuario.
2. **Publicar G001+G002:** commit en la rama `react-base`, vista previa en Cloudflare, y luego pasar a `main`. Antes: en Cloudflare, build `npm run build` y salida `dist`. ⬜ por confirmar que se hizo.
3. **Login → Dashboard nuevo:** `login.html` y `menu.js` aún llevan a `admin_dashboard.html` (viejo). Cambiar cuando se apruebe el de React.
4. **Notificaciones:** la campana (`notificaciones.js`) no está en la app React.
5. **Supabase:** el esquema no está en el repo; la columna `empresas.subdominio_vercel` conserva ese nombre (renombrar = migración que toca vistas).
6. **Menú:** `admin_verificacion_cierres.html` y `admin_perfil.html` no existen (en React salen como «pendiente»).
7. **Vercel:** quitado de GitHub (About, app, deployments). Revisar los demás proyectos en su propia sesión.

## Registros externos (dónde, nunca claves)
- **GitHub:** cuenta `pypsoluciones`. Apps instaladas: Cloudflare Workers and Pages, coderabbitai.
- **Cloudflare:** despliegue de https://pypsoluciones.pypcloud.com/.
- **Supabase:** proyecto ref `icvfmdvvochzaktugqvj` (URL y clave anon en `public/config.js`).
