<!-- INICIO_S000 -->
# BITÁCORA DE ERRORES · PyP Gestión Empresarial

_Reglas aprendidas de errores, numeradas. Se agregan._

## E-001 · 2026-11-21 · Pérdida del disco sin copia local
Se perdió el disco y solo quedó GitHub. Regla: todo cambio (código y `docs\`) se publica a GitHub al cerrar cada sesión; el SQL de Supabase también debe vivir en el repo.

<!-- CIERRE_S001 -->
## E-002 · 2026-11-22 · GitHub Desktop no pone git en el PATH
Los scripts no deben exigir git; los comandos de PowerShell buscan el git de GitHub Desktop (`%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`) si no hay otro.

## E-003 · 2026-11-22 · `pypsoluciones` es cuenta personal, no organización
Las rutas de GitHub son `github.com/settings/...`, no `github.com/organizations/pypsoluciones/...` (da 404).

## E-004 · 2026-11-22 · Contar filas trayéndolas corta en 1000
El HTML antiguo contaba con `.length` sobre la respuesta (Supabase devuelve máx. 1000 filas). En React se cuenta con `count: 'exact', head: true`.

## E-005 · 2026-11-22 · Fecha UTC en vez de local
`new Date().toISOString().split('T')[0]` da el día UTC: en Caracas, después de las 8 p. m., ya es «mañana». Usar la medianoche local convertida a ISO.
