# PEM Excellence Academy — v162 (partiendo de v159)

Solo dos cambios sobre la v159:

1. **Menú lateral contraíble** (assets/shell.js + assets/shell.css)
   - Botón con flecha en la parte superior del menú: lo contrae a una franja de íconos o lo expande.
   - Contraído, cada ícono muestra su nombre al pasar el cursor; "Administrador" expande el menú al hacer clic.
   - Se recuerda la elección en el navegador. En celular no cambia.
   - Las demás páginas solo cambian el número de versión (`shell.js?v=5`, `shell.css?v=4`) para evitar caché.

2. **Mi perfil** (mi-perfil.html) — tres bloques nuevos entre los indicadores y "Editar mis datos":
   - **Te toca ahora**: siguiente módulo pendiente de cada escuela según la ruta de su puesto (máx. 4), con Continuar / Abrir y conteo de faltantes.
   - **Aprendizaje reciente**: últimos 3 módulos aprobados.
   - **Último aviso**: la noticia más reciente.

**Inicio (index.html) queda idéntico a la v159.** Sin cambios en Supabase.
