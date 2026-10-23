# PEM Excellence Academy — v159 (candado secuencial de módulos)

Cada módulo abre solo cuando el anterior de **su escuela** está aprobado (1 → 2 → 3 …).

**Reglas**
- Lo que ya está aprobado queda abierto (nadie pierde avance, aunque lo haya hecho fuera de orden).
- Un certificado vencido (norma actualizada) cuenta como no aprobado.
- Los administradores están exentos.
- Si no se puede leer el avance (falla de red), no se bloquea.
- Si alguien abre por enlace directo un módulo bloqueado, regresa a Inicio, al módulo que le toca, con un aviso.

**Dónde se ve:** Inicio y Mis cursos (candado 🔒, pasos atenuados y aviso "Aprueba el Módulo N para abrir este").

**Archivos:** `assets/shell.js` (lógica y guardia), `index.html`, `mis-cursos.html`, y las 271 páginas con `shell.js?v=4`
(sube la versión para evitar caché). No requiere cambios en Supabase.

Para quitarlo: en `shell.js`, que `isLocked` devuelva siempre `false`.
