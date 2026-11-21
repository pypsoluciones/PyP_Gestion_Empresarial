<!-- INICIO_S000 -->
# CONTEXTO DEL PROYECTO · PyP Gestión Empresarial

_Cómo está hecho. Se agrega o se corrige la línea afectada._

## Stack
- HTML + JavaScript sin framework, una página por módulo. Tailwind CSS 3 (`input.css` → `styles.css` con `npm run build`; `styles.css` no se versiona). Algunas páginas cargan Tailwind por CDN.
- Supabase (PostgreSQL) vía REST (`fetch` a `/rest/v1/...`) y RPC. Configuración en `config.js` (`SUPABASE_URL`, `SUPABASE_KEY` anon).
- PWA: `manifest.json`, `admin_manifest.json`, `sw.js` (vacío, solo para instalar).
- Despliegue: Cloudflare → https://pypsoluciones.pypcloud.com/.
- `package.json` se llama `pyp-erp-saas`.

## Estructura (raíz, sin carpetas)
- Públicas: `index.html` (landing ERP), `tienda.html` (catálogo), `login.html`, `politicas.html`, `404.html`, `memorai.html`.
- Backoffice (`admin_*.html`): dashboard, ventas (POS, presupuestos, notas de entrega, historial, parámetros), compras, productos (+ parámetros), bancos/finanzas, caja, CxC, servicios, contactos (+ parámetros), nómina, empleados y roles, seguridad, configuración, página web, publicidad.
- Compartidos: `menu.js` (menú lateral y barra inferior), `notificaciones.js`, `document_config.js` (formatos de documentos impresos), `config.js`.

## Supabase (lo que usa el código)
- Tablas/vistas REST: tasas_bcv, usuarios, empresas, directorio_maestro, productos, precios, parametros_inventario, facturas, detalles_factura, ventas_facturas, ventas_documentos, ventas_documentos_detalles, documentos_comerciales, documentos_comerciales_detalles, cxc_abonos, caja_movimientos, cierres_caja, cierres_pendientes_verificacion, cuentas_bancarias, tesoreria_cuentas, fin_transferencias, instrumentos_pago_completa, nomina_empleados, nomina_pagos, servicio_ordenes, configuracion_sistema, configuracion_catalogo, configuracion_publica, vitrinas_publicidad, vitrinas_publicas, productos_publicos, precios_publicos, empresas_publicas.
- RPC: aceptar_transferencia_fondo, actualizar_instrumento_pago, asignar_permiso_a_grupo, contar_notificaciones_no_leidas, crear_grupo, crear_instrumento_pago, editar_grupo, eliminar_grupo, eliminar_instrumento_pago, marcar_notificacion_leida, marcar_todas_notificaciones_leidas, quitar_permiso_de_grupo, registrar_transferencia_interna, resolver_sucursal_usuario, solicitar_transferencia_fondo, tiene_privilegio, validar_pin_si_requiere.
- Multiempresa: filtros por `id_empresa`. Tasa del dólar desde `tasas_bcv` y `ve.dolarapi.com`.

## Normas de trabajo
- Ver `docs\NORMAS_GENERALES_CLAUDE.md` y las Preferencias personales de Lesme.
- Publicar: `Set-Location D:\Proyectos\PyP_Gestion_Empresarial -ErrorAction Stop; git add -A; git commit -m "<qué cambió>"; git push`

## Trampas conocidas
- `styles.css` se genera en el build: si el build de Cloudflare no corre `npm run build`, las páginas que lo usan salen sin estilos.
- El esquema SQL no está en el repo: para cambiar una función hay que leer antes su definición viva (`pg_get_functiondef`).
