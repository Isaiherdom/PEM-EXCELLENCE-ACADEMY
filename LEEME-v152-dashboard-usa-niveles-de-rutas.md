# PEM Excellence Academy — v152 (Dashboard Ejecutivo usa los niveles de "Administrar rutas")

Resuelve que "Cobertura por escuela" marcaba 52 de 3168 módulos: el Dashboard
asumía que a todos les tocaban las 4 escuelas completas (48 módulos), porque
solo leía "Administrar requisitos" (todo-o-nada por escuela) y nunca se había
conectado a los niveles 1–6 de "Administrar rutas".

- **1 archivo modificado**: `dashboard-ejecutivo.html`.
- No hay cambios de base de datos.

## Qué cambia

1. **Módulos requeridos según el nivel de cada puesto.** Igual que "Mis cursos",
   "Mi desarrollo" y "Rutas de aprendizaje": nivel 1 = 2 módulos, 2 = 5, 3 = 8,
   4 = 10, 5 = 11, 6 = 12 (de los 12 de cada escuela). Solo cuentan los módulos
   1..N que le exige su nivel; un certificado de un módulo fuera de su ruta ya
   no suma al avance (sigue contando en "Certificaciones activas" y horas).
2. **Quien no tiene puesto, o aún no se registra**, se cuenta con nivel genérico
   3 (8 módulos por escuela = 32), el mismo que ya usa "Rutas de aprendizaje".
3. **Segunda línea nueva** en la tarjeta "Cobertura por escuela": *Avance de quien
   ya se registró* (solo contra los módulos de los colaboradores con perfil),
   debajo de *Avance real del sitio* (contra toda la plantilla). También sale
   en el Excel exportado.
4. "Administrar requisitos" deja de influir en el Dashboard (puedes dejarlo o
   retirarlo del menú más adelante).

## Con tus datos de hoy

- Avance real de toda la plantilla: 34 de 2,101 módulos (~2%).
- Avance de los 16 registrados: 34 de 501 módulos (~7%).
- Los 52 certificados bajan a 34 porque 18 son de módulos fuera del nivel de
  su puesto.

## Cómo subirlo

Copia esta carpeta sobre tu proyecto en GitHub Desktop, commit y push.
