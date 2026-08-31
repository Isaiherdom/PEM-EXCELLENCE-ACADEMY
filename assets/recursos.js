/* PEM Excellence Academy — Biblioteca de Recursos
   Fuente única: para agregar un documento nuevo, copia un bloque {...} y
   pégalo en la categoría correspondiente (o crea una categoría nueva).
   Se refleja automáticamente en recursos.html.

   Sube el archivo a assets/docs/ y usa esa ruta en "file". */
window.PEM_RECURSOS = [
  {
    category: "Ética y cumplimiento",
    icon: "⚖️",
    color: "#E8603D",
    docs: [
      {
        title: "Política Anticorrupción y Prevención de Soborno",
        desc: "Versión 1.0 · Julio 2026. Marco legal, conductas prohibidas, límites de regalos y hospitalidad, debida diligencia de terceros y canal de denuncias.",
        file: "assets/docs/politica-anticorrupcion.pdf",
        meta: "PDF · Aprobado por Juan Ignacio Romo Herrera, Director General"
      }
    ]
  },
  {
    category: "Cultura de integridad — pósters",
    icon: "📣",
    color: "#A9720F",
    docs: [
      {
        title: "No Guardes Silencio — Canal de Denuncias",
        desc: "Cómo reportar una inquietud sobre soborno, corrupción o conducta poco ética — de forma confidencial y anónima si así lo prefieres.",
        file: "assets/docs/poster-canal-denuncias.pdf",
        meta: "PDF · PEM-MA-SGAS-01"
      },
      {
        title: "Nuestro Nombre es su Trabajo — Cadena de Suministro",
        desc: "Qué hacer al evaluar proveedores, agentes y socios comerciales — señales de alerta y cómo reportarlas.",
        file: "assets/docs/poster-terceros.pdf",
        meta: "PDF · PEM-MA-SGAS-01"
      }
    ]
  }
];

window.PEM_RECURSOS_CONTACTO = {
  correo: "denuncias@pemoilgas.com",
  telefono: "55-5543-3148",
  web: "www.pemoilgas.com"
};
