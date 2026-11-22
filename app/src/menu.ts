// Menú del ERP. «ruta» = módulo ya migrado a React. «href» = página HTML antigua.
// Al migrar un módulo: se le pone «ruta» y se quita «href».
export interface ItemMenu { etiqueta: string; ruta?: string; href?: string; pendiente?: boolean; badge?: 'cierres' }
export interface GrupoMenu { etiqueta: string; icono: string; items: ItemMenu[] }

export const INICIO: ItemMenu & { icono: string } = { etiqueta: 'Dashboard', icono: 'fa-chart-pie', ruta: '/' }

export const GRUPOS: GrupoMenu[] = [
  { etiqueta: 'Ventas', icono: 'fa-cash-register', items: [
    { etiqueta: 'POS', href: '/admin_ventas.html' },
    { etiqueta: 'Presupuestos', href: '/admin_ventas_presupuestos.html' },
    { etiqueta: 'Notas de Entrega', href: '/admin_ventas_notas.html' },
    { etiqueta: 'Historial de Ventas', href: '/admin_ventas_historial.html' },
    { etiqueta: 'Parámetros POS', href: '/admin_ventas_parametros.html' },
  ] },
  { etiqueta: 'Compras', icono: 'fa-cart-shopping', items: [
    { etiqueta: 'Factura de Compra', href: '/admin_compras.html' },
  ] },
  { etiqueta: 'Inventario', icono: 'fa-boxes-stacked', items: [
    { etiqueta: 'Productos', href: '/admin_productos.html' },
    { etiqueta: 'Parámetros de Productos', href: '/admin_productos_parametros.html' },
  ] },
  { etiqueta: 'Finanzas', icono: 'fa-landmark', items: [
    { etiqueta: 'Bancos y Cajas', href: '/admin_bancos_finanzas.html' },
    { etiqueta: 'Control de Caja', href: '/admin_caja.html' },
    { etiqueta: 'Verificación de Cierres', pendiente: true, badge: 'cierres' },
    { etiqueta: 'Cuentas por Cobrar', href: '/admin_cxc.html' },
  ] },
  { etiqueta: 'Taller y RMA', icono: 'fa-screwdriver-wrench', items: [
    { etiqueta: 'Servicios', href: '/admin_servicios.html' },
  ] },
  { etiqueta: 'Directorio', icono: 'fa-address-book', items: [
    { etiqueta: 'Clientes / Proveedores', href: '/admin_contactos.html' },
    { etiqueta: 'Personal / Nómina', href: '/admin_nomina.html' },
  ] },
  { etiqueta: 'Sistema', icono: 'fa-gears', items: [
    { etiqueta: 'Seguridad y Permisos', href: '/admin_seguridad.html' },
    { etiqueta: 'Mi Perfil y PIN', pendiente: true },
    { etiqueta: 'Empleados y Roles', href: '/admin_empleados_roles.html' },
    { etiqueta: 'Config. Página Web', href: '/admin_pagina_web.html' },
    { etiqueta: 'Parámetros del Sistema', href: '/admin_configuracion.html' },
  ] },
]

export const WEB_EXTERNAS: ItemMenu[] = [
  { etiqueta: 'Landing Page', href: '/index.html' },
  { etiqueta: 'Catálogo Público', href: '/tienda.html' },
]

export const NAV_MOVIL: (Omit<ItemMenu, 'badge'> & { icono: string; badge?: 'cxc' })[] = [
  { etiqueta: 'Inicio', icono: 'fa-chart-pie', ruta: '/' },
  { etiqueta: 'Ventas', icono: 'fa-file-invoice', href: '/admin_ventas.html' },
  { etiqueta: 'Caja', icono: 'fa-vault', href: '/admin_caja.html' },
  { etiqueta: 'CxC', icono: 'fa-hand-holding-dollar', href: '/admin_cxc.html', badge: 'cxc' },
  { etiqueta: 'Inventario', icono: 'fa-boxes-stacked', href: '/admin_productos.html' },
]
