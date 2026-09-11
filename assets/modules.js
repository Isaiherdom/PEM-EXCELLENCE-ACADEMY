/* PEM Excellence Academy — Datos de las 4 escuelas y sus 12 módulos cada una
   Fuente única: agregar/editar un módulo aquí lo refleja automáticamente en
   index.html (Explora todos los módulos) y en mis-cursos.html.

   "version" = la versión vigente de la norma (ej. "2015"). Cuando una norma se
   actualice, sube este valor — automáticamente todos los certificados emitidos
   bajo la versión anterior se marcan como vencidos en todo el sitio (Mis cursos,
   Certificaciones, Mi desarrollo, Dashboard Ejecutivo), sin tocar la base de datos:
   cada certificado ya guarda con qué versión de la norma se emitió (Fase de
   vencimiento/recertificación), y el sitio compara esa versión contra esta. */
window.PEM_SCHOOLS = {
  "9001": {
    name:"Escuela de Calidad", norm:"ISO 9001:2015", version:"2015", color:"#22E88A", active:true, progress:"12/12",
    prefix:"", examSuffix:"-iso9001",
    modules:[
      ["Fundamentos y contexto de la organización","Cl. 4", true],
      ["Liderazgo y compromiso de la dirección","Cl. 5.1", true],
      ["Política de calidad, roles y responsabilidades","Cl. 5.2–5.3", true],
      ["Riesgos y oportunidades","Cl. 6.1", true],
      ["Objetivos de calidad y planificación de cambios","Cl. 6.2–6.3", true],
      ["Recursos, competencia y toma de conciencia","Cl. 7.1–7.3", true],
      ["Comunicación e información documentada","Cl. 7.4–7.5", true],
      ["Planificación y control operacional","Cl. 8.1", true],
      ["Requisitos del cliente y diseño del servicio","Cl. 8.2–8.3", true],
      ["Control de proveedores externos y compras","Cl. 8.4", true],
      ["Provisión del servicio y salidas no conformes","Cl. 8.5–8.7", true],
      ["Evaluación del desempeño, auditoría y mejora","Cl. 9–10", true]
    ]
  },
  "14001": {
    name:"Escuela Ambiental", norm:"ISO 14001:2015", version:"2015", color:"#4C9AFF", active:true, progress:"12/12",
    prefix:"escuela-ambiental/", examSuffix:"-iso14001",
    modules:[
      ["Fundamentos y contexto ambiental","Cl. 4", true],
      ["Liderazgo y política ambiental","Cl. 5", true],
      ["Partes interesadas y requisitos legales","Cl. 4.2 / 6.1.3", true],
      ["Aspectos e impactos ambientales","Cl. 6.1.2", true],
      ["Objetivos ambientales y planificación de acciones","Cl. 6.2", true],
      ["Recursos, competencia y toma de conciencia ambiental","Cl. 7.1–7.3", true],
      ["Comunicación e información documentada ambiental","Cl. 7.4–7.5", true],
      ["Control operacional ambiental","Cl. 8.1", true],
      ["Preparación y respuesta ante emergencias","Cl. 8.2", true],
      ["Evaluación del desempeño ambiental","Cl. 9.1", true],
      ["Cumplimiento legal ambiental","Cl. 9.1.2", true],
      ["Auditoría interna y mejora continua ambiental","Cl. 9.2–10", true]
    ]
  },
  "45001": {
    name:"Escuela de Seguridad", norm:"ISO 45001:2018", version:"2018", color:"#FF7A1A", active:true, progress:"12/12",
    prefix:"escuela-seguridad/", examSuffix:"-iso45001",
    modules:[
      ["Fundamentos y contexto de SST","Cl. 4"],
      ["Liderazgo y participación de los trabajadores","Cl. 5.1, 5.4"],
      ["Consulta y participación de los trabajadores","Cl. 5.4"],
      ["Identificación de peligros y evaluación de riesgos","Cl. 6.1.2"],
      ["Requisitos legales en SST","Cl. 6.1.3"],
      ["Objetivos y planificación de SST","Cl. 6.2"],
      ["Recursos, competencia y toma de conciencia en SST","Cl. 7.1–7.3"],
      ["Comunicación y consulta","Cl. 7.4"],
      ["Eliminación de peligros y jerarquía de controles","Cl. 8.1.2"],
      ["Gestión del cambio y contratación externa","Cl. 8.1.3–8.1.4"],
      ["Preparación y respuesta ante emergencias","Cl. 8.2"],
      ["Investigación de incidentes, auditoría y mejora","Cl. 9–10"]
    ]
  },
  "37001": {
    name:"Escuela de Ética", norm:"ISO 37001:2025", version:"2025", color:"#E8603D", active:true, progress:"12/12",
    prefix:"escuela-etica/", examSuffix:"-iso37001",
    modules:[
      ["Fundamentos y contexto del riesgo de soborno","Cl. 4"],
      ["Liderazgo, función de cumplimiento y compromiso","Cl. 5"],
      ["Política antisoborno y gobierno","Cl. 5.2–5.3"],
      ["Evaluación de riesgo de soborno","Cl. 4.5"],
      ["Debida diligencia de terceros, socios y clientes","Cl. 8.2"],
      ["Controles financieros y no financieros","Cl. 8.3–8.4"],
      ["Regalos, hospitalidad, donativos y beneficios","Cl. 8.7"],
      ["Compromisos antisoborno de terceros","Cl. 8.6"],
      ["Canal de denuncias (whistleblowing)","Cl. 8.9"],
      ["Investigaciones y conflictos de interés","Cl. 8.10"],
      ["Comunicación, competencia y conciencia","Cl. 7"],
      ["Evaluación del desempeño, auditoría interna y mejora","Cl. 9–10"]
    ]
  }
};

window.PEM_SCHOOL_ORDER = ["9001", "14001", "45001", "37001"];
window.PEM_SCHOOL_ICONS = {"9001":"🛡️","14001":"🌿","45001":"⛑️","37001":"⚖️"};
