# PEM Excellence Academy — v154 (puestos siempre actualizados)

Problema: los puestos nuevos de "Administrar puestos" no aparecían en "Mi perfil".
Causa: Mi perfil, el candado "¿Cuál es tu puesto?" y las 48 páginas de certificado
tenían la lista de puestos escrita fija en el código (los 17 originales).

## Qué cambia
1. **Una sola fuente**: `assets/pem-gate.js` ahora lee los puestos en vivo de la tabla
   `puestos` (PEM_PUESTOS). La usan el candado de puesto, Mi perfil y los 48 certificados.
   Agregar, renombrar o reordenar un puesto se refleja de inmediato en todos lados.
   La lista fija queda solo como respaldo si falla la conexión.
2. **Renombrar ya no deja huérfanos**: Administrar puestos renombra con UPDATE y la base
   de datos actualiza sola a las personas y la ruta de ese puesto. Antes se borraba y
   creaba otro, y quien tenía el puesto viejo quedaba sin coincidencia.
3. **Quitar un puesto**: quien lo tenía queda sin puesto y el candado le pide elegir otro;
   su ruta se borra. El aviso de confirmación lo dice.
4. Si alguien tiene guardado un puesto que ya no existe, Mi perfil lo conserva en la lista
   en vez de dejarlo en blanco.

## Cómo subirlo (en este orden)
1. Supabase > SQL Editor: pegar y correr `SQL-v154-puestos-en-cascada.sql` (una sola vez).
   Además reasigna al usuario con "Supervisores de campo" a "Supervisor de Operación"
   (mismos niveles) y borra 5 rutas viejas sin puesto.
2. Copiar esta carpeta sobre tu proyecto en GitHub Desktop, commit y push.

Importante: sin el paso 1, renombrar un puesto con el v154 sí dejaría huérfanos.
