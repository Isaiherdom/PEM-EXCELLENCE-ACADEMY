/* PEM Excellence Academy — Datos de las Rutas de Aprendizaje (17 perfiles de puesto)
   Fuente única: agregar/editar un perfil aquí lo refleja automáticamente en
   rutas-aprendizaje-pem-excellence-academy.html y en mi-desarrollo.html.

   c9001 / c14001 / c45001 / c37001 = nivel (1 a 6) requerido en cada norma.
   MOD_BY_LEVEL traduce ese nivel a número de módulos (de los 12 de cada escuela). */
window.PEM_ROLES = [
  {name:"Director General", order:"Calidad → Ética → Ambiental → SST", c9001:6, c14001:5, c45001:5, c37001:6},
  {name:"Gerentes de área/base", order:"Calidad → Ambiental → SST → Ética", c9001:5, c14001:4, c45001:4, c37001:5},
  {name:"Supervisores de campo", order:"Calidad → SST → Ambiental → Ética", c9001:4, c14001:3, c45001:4, c37001:3},
  {name:"Calidad (área)", order:"Calidad → Ética → Ambiental → SST", c9001:6, c14001:3, c45001:2, c37001:4},
  {name:"HSE (área)", order:"SST → Ambiental → Calidad → Ética", c9001:3, c14001:6, c45001:6, c37001:3},
  {name:"Operadores", order:"Calidad → SST → Ambiental → Ética", c9001:2, c14001:2, c45001:3, c37001:1},
  {name:"Mecánicos", order:"Calidad → SST → Ambiental → Ética", c9001:2, c14001:2, c45001:3, c37001:1},
  {name:"Compras", order:"Ética → Calidad → Ambiental → SST", c9001:2, c14001:2, c45001:1, c37001:4},
  {name:"Recursos Humanos", order:"Ética → SST → Calidad → Ambiental", c9001:2, c14001:1, c45001:3, c37001:4},
  {name:"Finanzas", order:"Ética → Calidad → Ambiental → SST", c9001:2, c14001:1, c45001:1, c37001:5},
  {name:"Director de Operación", order:"Calidad → SST → Ambiental → Ética", c9001:6, c14001:5, c45001:6, c37001:5},
  {name:"Director/Gerente de Ventas y Desarrollo de Negocio", order:"Ética → Calidad → Ambiental → SST", c9001:4, c14001:1, c45001:1, c37001:5},
  {name:"Cuentas por Pagar", order:"Ética → Calidad → Ambiental → SST", c9001:2, c14001:1, c45001:1, c37001:4},
  {name:"Cuentas por Cobrar", order:"Ética → Calidad → Ambiental → SST", c9001:2, c14001:1, c45001:1, c37001:3},
  {name:"Almacén", order:"SST → Calidad → Ambiental → Ética", c9001:3, c14001:3, c45001:4, c37001:1},
  {name:"Tesorería", order:"Ética → Calidad → Ambiental → SST", c9001:2, c14001:1, c45001:1, c37001:5},
  {name:"Administrativos en general", order:"Calidad → Ética → SST → Ambiental", c9001:2, c14001:1, c45001:2, c37001:2},
];

window.PEM_MOD_BY_LEVEL = {1:2, 2:5, 3:8, 4:10, 5:11, 6:12};
