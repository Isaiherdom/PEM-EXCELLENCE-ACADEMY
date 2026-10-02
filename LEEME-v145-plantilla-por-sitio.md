# PEM Excellence Academy — v145 (cobertura por sitio + plantilla editable)

Resuelve el primer pendiente que me pediste: que cada distrito muestre solo
su propio avance, no el de los 67 de toda la empresa.

Verificado contra tu v144:

- **1 archivo nuevo**: `admin-plantilla.html` — panel para que tú mismo
  captures y actualices el headcount por sitio, sin pedírmelo a mí cada mes.
- **2 archivos modificados**: `dashboard-ejecutivo.html` (ya no usa un
  número fijo de 67 para todos los sitios) y `assets/shell.js` (se agregó
  "Administrar plantilla" al menú lateral, junto a "Administrar usuarios").
- **1 tabla nueva en Supabase**: `headcount` (sitio, total de colaboradores,
  fecha de actualización) — con la misma protección que ya tiene el resto
  de tu base: cualquiera con sesión puede leerla, pero solo un administrador
  (`profiles.is_admin`) puede editarla.
- La sembré con los 4 sitios que ya existen en tus perfiles registrados
  (Poza Rica, Reynosa, Veracruz, Villahermosa), **todos en 0** — hay que
  cargar el número real de cada uno (ver abajo).

## Cómo funciona ahora

- Si eliges **"Todos los sitios"**, la cobertura se calcula sobre la suma
  de todos los sitios que hayas cargado en "Administrar plantilla".
- Si eliges **un sitio específico** (ej. Villahermosa), la cobertura, el
  donut de participación, la cobertura por escuela y los insights se
  recalculan solo con el headcount de ese sitio.
- Si un sitio todavía no tiene su número cargado, el dashboard **no
  inventa un porcentaje** — muestra "—" y un aviso ámbar con el enlace
  directo a "Administrar plantilla" para cargarlo.

## Lo primero que tienes que hacer

Entra a **Administrar plantilla** (nueva en el menú lateral) y carga el
número real de colaboradores de cada sitio. Dos cosas importantes:

1. El nombre del sitio debe escribirse **igual** a como aparece en el campo
   "Sitio" de cada colaborador en Administrar usuarios (mayúsculas no
   importan, pero sí acentos/espacios) — si no coincide, ese colaborador no
   se contará en el sitio correcto.
2. Puedes agregar sitios que aún no tengan ningún colaborador registrado en
   la plataforma (por ejemplo, si falta dar de alta a alguien de un sitio
   nuevo) — así, en cuanto esa persona se registre, su sitio ya tendrá su
   tamaño de plantilla listo.

## Sobre tu pregunta de "cada mes se actualiza el headcount"

Monté la opción que tú mismo preferiste: un panel dentro de la plataforma
("Administrar plantilla") en vez de que me vayas pasando un archivo cada
mes. Es más rápido para ti (treinta segundos, sin esperarme a mí) y el
dashboard se actualiza al instante — no hace falta subir una nueva versión
del sitio cada vez que cambie el headcount.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push.
La tabla de Supabase ya quedó creada del lado de la base de datos — no
necesitas hacer nada ahí.
