# PEM Excellence Academy — v161 (Inicio como panel personal)

Nuevo bloque arriba de Inicio (antes del carrusel); todo lo demás de Inicio queda igual.

- **Banner:** "¡Bienvenido de nuevo, Nombre!", % de avance, barra y "X de 48 módulos aprobados".
- **Tarjeta de perfil:** iniciales, nombre, puesto, sitio, y accesos a Mi perfil / Mis certificados / Mis cursos.
- **Te toca ahora:** el siguiente módulo pendiente de cada escuela según la ruta de su puesto (máx. 4),
  con botón Continuar (el primero) y Abrir. Los vencidos aparecen como "(recertificar)".
  Cuenta cuántos le faltan. Coincide con el candado secuencial: siempre es el módulo que sí puede abrir.
- **Casos especiales:** quien terminó todo ve felicitación; un administrador sin puesto ve solo su avance;
  quien no tiene ruta configurada usa el nivel general (8 módulos por escuela).
- **Aprendizaje reciente:** últimos 3 módulos aprobados con calificación y fecha.
- **Último aviso:** la noticia más reciente.

Solo cambia `index.html`. Sin cambios en Supabase. Los pendientes se calculan igual que se usarán en los correos de recordatorio.
