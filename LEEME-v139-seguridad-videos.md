# PEM Excellence Academy — v139 (Videos + Gamma de ISO 45001)

Verificado archivo por archivo contra tu v138:

- **0 archivos borrados o movidos.**
- **12 archivos nuevos**: `escuela-seguridad/video-modulo1.html` … `video-modulo12.html`.
- **1 archivo modificado**: `assets/modules.js` — solo se agregó `, true` como
  tercer valor en 9 de los 12 módulos de la Escuela de Seguridad (el flag que
  activa el botón "🎥 Video" en Inicio y en Mis cursos). Nada más del archivo
  se tocó.

## Qué trae cada video-moduloN.html

Mismo patrón que ya usan Calidad y Ambiental: el video de YouTube incrustado
arriba, y debajo un botón "Ver presentación completa →" que enlaza a tu
Gamma de ese módulo — nunca se pierde el acceso a la presentación aunque
cambie el video.

| Módulo | Video YouTube | Gamma | Botón 🎥 activo en Inicio/Mis cursos |
|---|---|---|---|
| 1 | ✅ | ✅ | Sí |
| 2 | ✅ | ✅ | Sí |
| 3 | ✅ | ✅ | Sí |
| 4 | ✅ | ✅ | Sí |
| 5 | ✅ | ✅ | Sí |
| 6 | ✅ | ✅ | Sí |
| 7 | ✅ | ✅ | Sí |
| 8 | ✅ | ✅ | Sí |
| 9 | ⏳ pendiente | ✅ | No (para no mostrar un video roto) |
| 10 | ⏳ pendiente | ✅ | No |
| 11 | ⏳ pendiente | ✅ | No |
| 12 | ✅ | ✅ | Sí |

Para los módulos 9, 10 y 11, la página ya existe y ya enlaza a su Gamma —
solo le falta el video. Muestra un aviso de "Video en producción" en vez de
un reproductor roto. En cuanto me pases esos 3 links de YouTube, los agrego
y activo su botón 🎥 con el mismo cambio puntual en `modules.js`.

## ⚠️ Por confirmar

El link de YouTube que me diste para **Módulo 1 de ISO 45001**
(`youtu.be/YwHl2AbSEmA`) es idéntico al que habías dado para **Módulo 1 de
ISO 14001** en el mensaje que me pediste descartar. Lo dejé tal cual lo
mandaste, pero avísame si en realidad es un video distinto y se repitió por
error al copiar/pegar.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto, reemplazando lo que pregunte (solo `assets/modules.js`). Commit y
push en GitHub Desktop.
