# PEM Excellence Academy — v153 (Administrar usuarios: correo, nombre, sitio y "En plantilla")

Resuelve que las cuentas que entraron sin nombre aparecían como "(sin nombre)" en
"Administrar usuarios" y no había forma de identificarlas ni asignarles puesto.

- **2 archivos modificados**: `admin-usuarios.html` y `dashboard-ejecutivo.html`.
- **Cambios de base de datos (ya aplicados en Supabase, no tienes que hacer nada):**
  columna `email` en `profiles` (llena para los 16 perfiles; las cuentas nuevas la
  guardan desde el registro) y columna `en_plantilla` (por defecto sí).

## Qué cambia

1. **Administrar usuarios** muestra el correo de cada cuenta, permite buscar por
   correo y editar **nombre** y **sitio** (lista de los sitios de "Administrar
   plantilla"), además del puesto.
2. **Interruptor "En plantilla"**: apágalo para cuentas que no forman parte de los 66
   colaboradores contados. Esas cuentas y sus certificados no entran a ningún cálculo
   del Dashboard (participación, avance, cobertura por escuela).
3. El Director General quedó marcado fuera de plantilla.

## Pendiente

Borrar la cuenta duplicada `jiromo@romo-curiel.com.mx` (sin certificados) — requiere
tu aprobación o hacerlo en Supabase → Authentication → Users. Mientras tanto quedó
marcada fuera de plantilla, así que no afecta los números.
Para iniciar sesión, el Director General debe usar siempre
`juanignacio.romo@pemoilgas.com`: el acceso es solo con Microsoft y cada correo
distinto crea una cuenta distinta.

## Cómo subirlo

Copia esta carpeta sobre tu proyecto en GitHub Desktop, commit y push.
