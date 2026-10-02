# PEM Excellence Academy — v146 (catálogo de puestos editable)

Verificado contra tu v145:

- **1 archivo nuevo**: `admin-puestos.html` — panel para que tú mismo agregues,
  renombres, reordenes o elimines los puestos que aparecen en el desplegable
  "Rol / puesto" de Administrar usuarios, sin que tengas que pedírmelo a mí.
- **2 archivos modificados**: `admin-usuarios.html` (el desplegable de puestos
  ya no es una lista fija en el código — ahora se lee desde la base de datos)
  y `assets/shell.js` (se agregó "Administrar puestos" al menú lateral).
- **1 tabla nueva en Supabase**: `puestos` (nombre, orden) — misma protección
  que el resto: cualquiera con sesión puede leerla, solo un administrador
  puede editarla. La sembré con los 17 puestos que ya tenías en el código,
  en el mismo orden, para que no cambie nada de lo que ya tienes asignado.

## Cómo funciona

Entra a **Administrar puestos** (nueva en el menú lateral):

- **+ Agregar puesto**: lo agrega al final de la lista.
- **Flechas ▲ ▼**: cambian el orden en que aparece en el desplegable.
- **Escribir directo sobre el nombre**: lo renombra.
- **✕**: lo quita del catálogo.

Dos cosas a tener en cuenta:

1. Si renombras un puesto que ya tiene colaboradores asignados, ellos
   conservan el nombre anterior hasta que se los vuelvas a asignar
   manualmente en Administrar usuarios — renombrar aquí no los actualiza en
   automático.
2. Eliminar un puesto no borra a nadie, solo deja de aparecer como opción
   para asignarlo a futuro.

## Otros ajustes de esta conversación

Ya quedaron agregados en "Administrar plantilla" los sitios que pediste:
Administrativos, Guadalajara, Monterrey y CDMX (los cuatro en 0 — captura ahí
su número real cuando puedas).

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push. Las
tablas de Supabase ya quedaron creadas del lado de la base de datos — no
necesitas hacer nada ahí.
