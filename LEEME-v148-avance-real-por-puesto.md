# PEM Excellence Academy — v148 (avance real contra lo que le corresponde a cada puesto)

Resuelve tu observación: antes, el % de cobertura por escuela asumía que
**todos** los colaboradores debían completar **las 4 escuelas completas**
(48 módulos), sin importar su puesto — por eso nunca iba a llegar a 100%,
aunque cada quien terminara exactamente lo que le correspondía.

Verificado contra tu v147:

- **1 archivo nuevo**: `admin-requisitos.html` — tabla donde marcas qué
  escuelas (Calidad, Ambiental, Seguridad, Ética) le corresponden a cada
  puesto de tu catálogo.
- **2 archivos modificados**: `dashboard-ejecutivo.html` (cobertura por
  escuela y un nuevo "Avance real" ya se calculan contra lo que a cada
  colaborador le toca, no contra las 4 escuelas para todos) y
  `assets/shell.js` (se agregó "Administrar requisitos" al menú).
- **1 tabla nueva en Supabase**: `puesto_excepciones` — misma protección que
  el resto (cualquiera con sesión la lee, solo un administrador la edita).
  **Queda vacía a propósito**: mientras no la toques, el Dashboard se sigue
  comportando exactamente igual que hasta ahora (todos requieren las 4
  escuelas) — nada cambia de número hasta que tú decidas qué puesto no
  necesita cuál escuela.

## Qué es lo primero que tienes que hacer

Entra a **Administrar requisitos** (nueva en el menú lateral). Vas a ver una
tabla: puestos en las filas, las 4 escuelas en las columnas, todo marcado
por default. Destilda las escuelas que **no** le correspondan a cada puesto
— por ejemplo, si "Cuentas por Pagar" no necesita Escuela de Seguridad,
destíldala en esa fila. Los cambios se guardan al instante, sin botón de
"guardar".

En cuanto empieces a destildar, vas a ver en el Dashboard Ejecutivo:

- **"Avance real"** (nuevo, arriba de "Cobertura por escuela"): % de
  módulos completados contra los que realmente le corresponden a cada
  colaborador registrado — este sí puede llegar a 100%.
- **"Cobertura por escuela"**: cada escuela ahora se mide solo contra los
  colaboradores cuyo puesto la requiere. Si nadie en el sitio filtrado la
  requiere, dice "N/A" en vez de 0% (para no sugerir que falta algo que
  nadie necesita).

## Un detalle importante

Estos dos cálculos nuevos solo pueden considerar a colaboradores que **ya
se registraron en la plataforma** (porque solo de ellos sabemos su puesto)
— no al número total de "Administrar plantilla". Si alguien no tiene puesto
asignado todavía en "Administrar usuarios", el Dashboard le va a mostrar un
aviso ámbar y, mientras tanto, lo cuenta como si debiera las 4 escuelas
(para no inflar el % de nadie por accidente). El KPI "Cobertura de
capacitación" (el que mide "al menos 1 certificado" contra la plantilla
completa) no cambió — sigue siendo útil para ver participación general.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push. La
tabla de Supabase ya quedó creada del lado de la base de datos — no
necesitas hacer nada ahí, solo ir a "Administrar requisitos" a configurar
tus puestos.
