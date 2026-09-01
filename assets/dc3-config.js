/* PEM Excellence Academy — Datos de la empresa para el DC-3
   Fuente única: si cambia la razón social, el RFC o los firmantes, se
   actualiza aquí y se refleja en todos los DC-3 que se generen después.

   El RFC se deja vacío a propósito — Isaí lo completa una vez en la
   página del generador y se guarda en su navegador (localStorage), no
   aquí, porque un RFC es un dato que no se debe subir al repositorio
   público de GitHub. */
window.PEM_DC3_CONFIG = {
  razonSocial: "PRODUCTION ENHANCEMENT MEXICO, S. DE R.L. DE C.V.",
  rfc: "PEM-070417BG8",

  // Un instructor distinto por escuela, si aplica. Si todas las escuelas
  // las imparte la misma persona, deja el mismo nombre/puesto en las 4.
  capacitadorPorEscuela: {
    "9001":  { nombre: "Isaí Hernández Domínguez", puesto: "Responsable del SGI" },
    "14001": { nombre: "Isaí Hernández Domínguez", puesto: "Responsable del SGI" },
    "45001": { nombre: "Jesús Eymard Gómez Hernández", puesto: "Gerente de HSE" },
    "37001": { nombre: "Isaí Hernández Domínguez", puesto: "Responsable del SGI" }
  },

  representanteEmpresa: "Juan Ignacio Romo Herrera",
  representantePuesto: "Director General",

  // Vacío hasta que Isaí dé el nombre real — mientras tanto el DC-3 sale
  // con esa línea de firma en blanco, lista para firmarse a mano.
  representanteTrabajadores: "",

  // PEM tiene 66-67 colaboradores (más de 50), así que según el formato
  // oficial (nota 4 y 5 del DC-3) sí aplica: firma el representante del
  // patrón ante la Comisión Mixta, y también debe firmar un representante
  // de los trabajadores.
  masDe50Trabajadores: true
};
