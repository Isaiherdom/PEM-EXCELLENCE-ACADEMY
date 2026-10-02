# PEM Excellence Academy — v149 (avance real contra toda la plantilla, no solo quien ya se registró)

Corrige lo que detectaste al revisar v148: "Avance real" medía el progreso
únicamente de quien ya se había registrado — así que si en Reynosa solo 1
de 31 colaboradores había entrado y esa persona terminaba todo lo suyo, el
Dashboard iba a marcar 100%, aunque faltaran 30 personas por registrarse.
Eso no reflejaba la realidad del sitio.

Verificado contra tu v148:

- **1 archivo modificado**: `dashboard-ejecutivo.html`.
- No hay cambios de base de datos en esta versión.

## Qué cambia

"Avance real" y "Cobertura por escuela" ahora se calculan contra **toda la
plantilla configurada del sitio** (el número que cargaste en "Administrar
plantilla"), no solo contra quien ya se registró:

- A cada colaborador que **ya se registró y tiene puesto asignado**, se le
  mide contra lo que su puesto requiere.
- A cada colaborador que **ya se registró pero no tiene puesto asignado
  todavía**, se le cuenta como si debiera las 4 escuelas (hasta que le
  asignes un puesto en Administrar usuarios).
- A cada colaborador que **aún no se ha registrado**, también se le cuenta
  como pendiente de las 4 escuelas completas — porque no sabemos su puesto
  y es mejor subestimar el avance que inflarlo por accidente.

Con tu ejemplo de Reynosa (31 en plantilla, 1 registrada): si esa persona
termina todos sus módulos asignados, el Dashboard ahora sí muestra
aproximadamente 3% (su avance real, sobre el total de los 31) — y si esa
misma persona todavía no termina todos sus módulos, el % baja todavía más,
justo como esperabas.

El aviso ámbar debajo de "Avance real" ahora distingue dos cosas: cuántos
de la plantilla aún no se han registrado, y cuántos de los ya registrados
no tienen puesto asignado.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push.
