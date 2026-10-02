# PEM Excellence Academy — v147 (corrección: sitios sin colaboradores aún no aparecían en el filtro)

Corrige lo que notaste al revisar el Dashboard Ejecutivo: al agregar
Administrativos, Guadalajara, Monterrey y CDMX en "Administrar plantilla",
no aparecían como opción en el filtro de sitio del Dashboard.

Verificado contra tu v146:

- **1 archivo modificado**: `dashboard-ejecutivo.html`.

## Qué pasaba

El filtro de sitio se llenaba únicamente con los sitios que ya tenían al
menos un colaborador con datos (certificados/registro) en la plataforma.
Un sitio que agregaste en "Administrar plantilla" pero que todavía no tiene
a nadie registrado no tenía forma de aparecer ahí.

## Qué cambia

El filtro ahora combina dos fuentes: los sitios con colaboradores
registrados **y** los sitios que ya existen en "Administrar plantilla",
aunque aún no tengan a nadie. Así, en cuanto agregas un sitio nuevo en la
plantilla, ya lo puedes seleccionar en el Dashboard — vas a ver su
cobertura en 0% (o "—" si tampoco le has puesto número de plantilla
todavía) en vez de que el sitio simplemente no aparezca.

## Cómo subirlo

Igual que siempre: descomprime y copia esta carpeta completa sobre tu
proyecto en GitHub Desktop, reemplazando lo que pregunte. Commit y push. No
hay cambios de base de datos en esta versión.
