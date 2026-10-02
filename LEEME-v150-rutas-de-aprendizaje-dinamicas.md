# PEM Excellence Academy — v150 (Rutas de aprendizaje ya refleja tu catálogo de puestos)

Resuelve lo que notaste: "Rutas de aprendizaje" seguía mostrando solo los
17 puestos con los que arrancó la plataforma, sin los que agregaste después
en "Administrar puestos".

Verificado contra tu v149:

- **1 archivo nuevo**: `admin-rutas.html` — panel para definir, por puesto,
  el nivel (1–6) en cada una de las 4 escuelas y el orden recomendado de
  cursado. Reemplaza tener que pedírmelo a mí.
- **4 archivos modificados**: `rutas-aprendizaje-pem-excellence-academy.html`,
  `mi-desarrollo.html`, `mis-cursos.html` (las tres ya leen el catálogo de
  puestos y sus rutas en vivo desde Supabase, en vez del archivo fijo
  `assets/roles.js`) y `assets/shell.js` (se agregó "Administrar rutas" al
  menú).
- **1 tabla nueva en Supabase**: `rutas_puesto` — misma protección que el
  resto. La sembré con los 17 puestos originales, con exactamente los
  mismos niveles y orden que ya tenían en `assets/roles.js`, para no
  cambiarte ningún número.

## Qué hacer con los puestos que agregaste

Cualquier puesto de tu catálogo que todavía no tenga fila en `rutas_puesto`
(por ejemplo, uno que hayas creado hace rato en "Administrar puestos") se
muestra con un **nivel genérico (3 en las 4 escuelas)** mientras tanto, y
tanto "Rutas de aprendizaje" como "Administrar rutas" te avisan con un
recuadro ámbar cuáles son. Entra a **Administrar rutas** y ajusta el nivel
real (1 = fundamentos, 6 = líder SGI) y el orden de cursado de cada uno —
se guarda al instante, sin botón de "guardar".

## Dónde más se nota el cambio

- **Mi desarrollo**: el selector "elige tu puesto" ahora también lista los
  puestos nuevos.
- **Mis cursos**: las insignias de "módulo obligatorio para tu puesto" ya
  consideran los puestos nuevos.
- `assets/roles.js` se queda como respaldo silencioso: si por algún motivo
  la consulta a Supabase fallara, estas páginas no se rompen, solo usan los
  17 puestos originales mientras se restablece la conexión.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push. La
tabla de Supabase ya quedó creada y sembrada del lado de la base de datos —
no necesitas hacer nada ahí, solo revisar "Administrar rutas" para tus
puestos nuevos.
