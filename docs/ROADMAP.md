<!-- INICIO_S000 -->
# ROADMAP · PyP Gestión Empresarial

_Leyenda: ⬜ pendiente · 🟡 en curso · ✅ hecho._

## Infraestructura
- ✅ Recuperar el repo desde GitHub tras la pérdida del disco
- ✅ Renombrar el repo en GitHub
- 🟡 Confirmar el despliegue en Cloudflare tras el renombre (build `npm run build`, salida `dist`)
- ⬜ Respaldar el esquema de Supabase (tablas, funciones RPC, políticas RLS) en el repo
- ✅ Cambiar el dominio de `sitemap.xml`, `robots.txt` y `README.md` a `pypsoluciones.pypcloud.com` (G002)
- ✅ Quitar Vercel del código y de GitHub (G002)
- ⬜ Renombrar la columna `empresas.subdominio_vercel` (migración SQL)

## Producto
- ⬜ Crear `admin_verificacion_cierres.html` y `admin_perfil.html` (están en el menú, no existen) o quitarlos del menú
- ✅ Marca de versión visible en pantalla (app React, G001)
- ⬜ MANUAL_*.md del producto
- ⬜ por confirmar: lista de prioridades de Lesme

## Migración a React
- ✅ Base: layout, menú, sesión compartida (G001)
- ✅ Dashboard (G001)
- ⬜ Login y menú viejo llevan al Dashboard React
- ⬜ Campana de notificaciones
- ⬜ Contactos
- ⬜ Productos
- ⬜ CxC
- ⬜ Caja
- ⬜ POS

<!-- CIERRE_S001 -->
