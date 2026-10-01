# PEM Excellence Academy — v141 (candado de login en Inducción)

Corrección de un pendiente que se me había pasado: las 9 páginas de
Inducción (`induccion.html` + los 8 temas) no tenían el candado de login con
Microsoft/Azure que sí tiene el resto del sitio — por eso eran accesibles sin
iniciar sesión.

Verificado contra tu v140:

- **0 archivos nuevos, 0 borrados.**
- **9 archivos modificados** (`induccion.html` y `induccion-01...08-*.html`)
  — a cada uno se le agregaron, justo después de `<body>`, las mismas 3
  líneas que ya usa `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="assets/supabase-config.js"></script>
<script src="assets/pem-gate.js"></script>
```

Nada más se tocó en esas páginas — mismo contenido que en v140.

## Sobre tu pregunta de accesos externos

El login de Microsoft/Azure evita que alguien sin cuenta llegue a la
plataforma, pero si ese registro de Azure está configurado como
mono-inquilino (solo correos de PEM) o no, es una configuración del panel de
Azure/Supabase — no algo que viva en estos archivos. Vale la pena
confirmarlo ahí directamente si quieres certeza de que una cuenta Microsoft
ajena a PEM no podría ni completar el login.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto, reemplazando lo que pregunte. Commit y push en GitHub Desktop.
