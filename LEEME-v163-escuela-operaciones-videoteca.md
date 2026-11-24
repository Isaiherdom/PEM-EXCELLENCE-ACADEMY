# PEM Excellence Academy — v163 (Escuela de Operaciones + videoteca)

**Nuevo**
- `escuela-operaciones.html`: Escuela de Operaciones con la **Videoteca instructiva** (tarjetas, buscador, filtro por tema). Cada video es un enlace que abre su origen (Instagram, YouTube, TikTok…) en pestaña nueva. Visible para todos los colaboradores.
- `admin-videos.html` (solo administradores): agregar, editar, ordenar, ocultar y eliminar videos. Quita parámetros de rastreo del enlace, detecta la plataforma y convierte títulos con letras decorativas a letra normal.
- `assets/videoteca.js`: utilidades compartidas.
- Menú lateral: "Escuela de Operaciones" (debajo de Escuelas) y, en Administrador, "Administrar videos".
- Mapa de Escuelas: 5ª tarjeta "Escuela de Operaciones".
- Base de datos: tabla `videos_instructivos` (ya creada; SQL de respaldo en `SQL-v163-videoteca-operaciones.sql`). Primer video cargado: Bottom Hole Assembly BHA.

**No cambia:** las 4 escuelas normativas, el avance (sigue siendo de 48 módulos), el candado, Inicio.
Los módulos con examen y certificado de Operaciones se agregan después, con su temario.
