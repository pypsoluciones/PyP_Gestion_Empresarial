<!-- INICIO_S000 -->
# ESTADO DEL PROYECTO · PyP Gestión Empresarial

_Foto actual. Se REEMPLAZA entera en cada cierre. Actualizado: 2026-11-21 (sesión 000)._

## Identidad
- **Producto:** ERP/backoffice de facturación y gestión (POS, inventario, compras, caja, bancos, CxC, nómina, servicios) + tienda/catálogo público PWA.
- **URL en producción:** https://pypsoluciones.pypcloud.com/ (Cloudflare).
- **Repositorio:** pypsoluciones/PyP_Gestion_Empresarial (antes `pypsoluciones/pyp-plus-core`; renombrado el 2026-11-21).
- **Ruta en el PC:** `D:\Proyectos\PyP_Gestion_Empresarial`.

## Versiones
- **Versión visible:** ⬜ por confirmar (no se encontró marca de versión en el código).
- **Último parche:** ninguno (repo recuperado desde GitHub tras perder el disco; último commit en GitHub del 18-07-2026, «act»).
- **Prefijo de parches:** ⬜ por confirmar · **siguiente migración:** ⬜ por confirmar (no hay carpeta de migraciones en el repo).

## Qué funciona
- ⬜ por confirmar en producción. El repo contiene 23 páginas `admin_*.html`, `tienda.html`, `login.html`, `index.html`, `memorai.html`.

## Qué está roto / pendiente inmediato
1. **Cloudflare tras el renombre:** confirmar en Cloudflare (Workers & Pages → proyecto → Settings → Builds) que sigue conectado al repo con nombre nuevo y que el último deploy salió bien.
2. **Build:** `styles.css` NO está en el repo; Cloudflare debe correr `npm run build` (Tailwind). ⬜ por confirmar el comando de build configurado en Cloudflare.
3. **Dominio viejo:** `sitemap.xml`, `robots.txt` y `README.md` apuntan a `pypsoluciones.vercel.app`, no a `pypsoluciones.pypcloud.com`.
4. **Enlaces rotos en el menú:** `menu.js` enlaza `admin_verificacion_cierres.html` y `admin_perfil.html`, que no existen en el repo.
5. **SQL de Supabase:** no hay migraciones ni funciones en el repo; el esquema vive solo en Supabase. Hay que respaldarlo.
6. **Manual:** no existe MANUAL_*.md.

## Registros externos (dónde, nunca claves)
- **GitHub:** organización `pypsoluciones`.
- **Cloudflare:** despliegue de https://pypsoluciones.pypcloud.com/.
- **Supabase:** proyecto ref `icvfmdvvochzaktugqvj` (URL y clave anon en `config.js`).
- **Vercel:** dominio antiguo `pypsoluciones.vercel.app` (⬜ por confirmar si sigue activo).
