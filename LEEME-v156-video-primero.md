# PEM Excellence Academy — v156 (el video va primero en cada módulo)

Los usuarios no sabían por dónde empezar: el video estaba al final de cada tarjeta.

- **2 archivos modificados**: `index.html` (Explora todos los módulos) y `mis-cursos.html`.
- Sin cambios de base de datos.

## Qué cambia
Cada tarjeta de módulo ahora muestra los pasos numerados, con el video arriba a todo
lo ancho y la marca "empieza aquí":

1. 🎥 Video · empieza aquí
2. 🗂 Flashcards
3. 📊 Infografía
4. 📝 Examen
5. 🎖 Certificado

Si algún módulo no tiene video, la numeración empieza en Flashcards. Para cambiar el
orden en el futuro, está en la lista `pasos` de `renderModules()` en ambos archivos.

## Cómo subirlo
Copia esta carpeta sobre tu proyecto en GitHub Desktop, commit y push.
