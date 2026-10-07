# PEM Excellence Academy — v155 (Mi perfil: lista de puestos vacía)

Problema: tras el v154, el selector "Rol / puesto" de Mi perfil salía vacío.
Causa: el navegador conservaba una copia vieja de `assets/pem-gate.js` (sin la lista
de puestos en vivo) y Mi perfil ya no traía su propia lista.

## Qué cambia
1. **Todas las páginas (258) cargan `pem-gate.js?v=154`**: al subir este paquete el
   navegador descarga la versión nueva en vez de usar la guardada.
2. **Mi perfil ya no depende de ese archivo**: si no está disponible, consulta la tabla
   `puestos` directamente. Probado también simulando el archivo viejo.
3. Sin cambios en base de datos. Si aún no corriste `SQL-v154-puestos-en-cascada.sql`
   en Supabase, sigue pendiente (ver LEEME-v154).

## Cómo subirlo
Copia esta carpeta sobre tu proyecto en GitHub Desktop, commit y push. Después abre
la plataforma y presiona Ctrl+Shift+R (recarga completa) una vez.
