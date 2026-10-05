# PEM Excellence Academy — v151 (menú "Administrador" plegable)

Resuelve que el menú lateral se veía amontonado con los 5 paneles de
administración sueltos.

Verificado contra tu v150:

- **2 archivos modificados**: `assets/shell.js` y `assets/shell.css`.
- No hay cambios de base de datos en esta versión.

## Qué cambia

Los 5 paneles (Administrar usuarios, plantilla, puestos, requisitos y
rutas) ya no aparecen sueltos en el menú — ahora viven dentro de una
pestaña **"Administrador"** que se despliega al hacerle clic (con una
flechita que gira). El resto del menú (Inicio, Escuelas, Inducción,
Dashboard Ejecutivo, Noticias, etc.) se queda igual que antes.

El menú se abre solo cuando ya estás dentro de uno de esos 5 paneles, y
recuerda si lo dejaste abierto o cerrado la última vez (por navegador).

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push.
