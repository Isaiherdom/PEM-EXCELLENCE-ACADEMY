# Prompt para Base44 — Plataforma de Capacitación Normativa Multi-Empresa

Copia y pega todo este documento en Base44 al crear tu nueva app. Está basado en un sistema ya construido y probado (PEM Excellence Academy), así que describe exactamente lo que funciona en la práctica, no solo teoría.

---

## 1. Qué es la aplicación

Una plataforma de capacitación corporativa donde empresas de manufactura, energía o servicios industriales capacitan a sus colaboradores en normas ISO (calidad, ambiente, seguridad, ética/antisoborno) u otros temas normativos, con seguimiento real por persona, certificados verificables, y un panel administrativo completo.

A diferencia de un curso genérico, cada empresa cliente puede tener su propio contenido, su propia marca visual, y sus propios colaboradores — es decir, **debe ser multi-empresa (multi-tenant) desde el diseño**, no una sola instancia para un solo cliente.

---

## 2. Roles de usuario

- **Super Admin (yo, dueño de la plataforma):** administra qué empresas existen, factura, ve métricas globales.
- **Admin de empresa:** administra el contenido, usuarios y reportes de SU empresa únicamente. Sube/edita módulos, ve dashboards, exporta reportes.
- **Supervisor/Gerente:** ve el avance de su propio equipo (las personas que le reportan), manda recordatorios, no edita contenido.
- **Colaborador/Aprendiz:** inicia sesión, ve solo los módulos asignados a su rol/nivel, toma exámenes, genera certificados, ve su propio historial.

Cada usuario inicia sesión con correo y contraseña (o idealmente con inicio de sesión de Microsoft/Google, para que las empresas clientes puedan usar sus propias cuentas corporativas sin crear contraseñas nuevas).

---

## 3. Estructura del contenido (jerarquía de datos)

```
Empresa (Tenant)
 └─ Escuela / Categoría normativa (ej. "Calidad ISO 9001", "Seguridad ISO 45001")
     └─ Módulo (12 por escuela, cada uno con su propio nivel 1-6 y cláusula normativa asociada)
         ├─ Video (con avatar narrador, ~4 minutos)
         ├─ Presentación de diapositivas (material de apoyo)
         ├─ Flashcards (10 tarjetas de términos clave)
         ├─ Infografía (una pieza visual de referencia rápida)
         ├─ Examen (10 preguntas de opción múltiple, ancladas a escenarios reales de la operación de la empresa, no preguntas abstractas de definición — esto fue clave para que el contenido se sintiera relevante y no genérico)
         └─ Certificado (se genera SOLO si el examen se aprobó con 80% o más, la calificación queda bloqueada — no editable por el usuario, viene directamente del resultado real del examen)
```

**Regla de diseño importante que aprendimos:** cada pregunta de examen debe combinar dos cosas — el requisito normativo exacto (lo que audita un certificador) y un escenario operativo real de la empresa (con sus propios términos: nombres de equipos, ubicaciones, clientes). Nunca solo teoría abstracta.

---

## 4. Rutas de aprendizaje por rol (muy importante)

No todos los colaboradores ven todo el contenido. Cada empresa define perfiles de puesto (ej. "Operador", "Gerente de Compras", "Recursos Humanos"), y cada perfil tiene un **nivel objetivo (1-6) en cada escuela normativa** — así, un operador de campo no ve los mismos módulos ni el mismo nivel de profundidad que un director de operaciones.

La app debe generar automáticamente, para cada usuario, una lista de "lo que me toca" según su perfil asignado — no debe requerir que la persona navegue las 48+ opciones para encontrar lo suyo.

---

## 5. Certificados (requisito de seguridad crítico)

- El certificado se genera automáticamente al aprobar un examen — **la calificación viene del resultado real del examen, nunca de un campo que el usuario pueda escribir a mano.**
- Incluye: nombre del colaborador (de su cuenta verificada, no un campo libre), módulo, norma, calificación real, fecha, ID único de certificado, logo de la empresa, y firma digital del responsable autorizado.
- Cada certificado generado debe registrarse en un log auditable (quién, qué módulo, cuándo, qué calificación) — esto es para que la empresa pueda mostrarlo en una auditoría de cumplimiento real.
- Sin cuenta verificada, no se puede generar ningún certificado — esto es lo que evita que cualquiera invente uno falso.

---

## 6. Panel de administrador (dashboard)

Para el Admin de empresa y Supervisores:
- Vista de todos los colaboradores con su avance por escuela/módulo (completado, en progreso, no iniciado)
- Filtros por área, base/ubicación, nivel de puesto, escuela
- Tasa de aprobación promedio, calificación promedio, tiempo promedio de finalización
- Alertas de módulos vencidos o próximos a vencer
- Botón de "enviar recordatorio" a colaboradores específicos o grupos
- Exportar reporte en Excel/PDF para auditorías

---

## 7. Identidad visual

Diseño oscuro, minimalista, ejecutivo — inspirado en Apple Keynote y Tesla, no en el estilo genérico de "e-learning corporativo" de los 2010s. Cada empresa cliente debe poder personalizar:
- Color de acento (cada escuela/categoría puede tener su propio color distintivo)
- Logo de la empresa (aparece en certificados y en el encabezado)
- Nombre de la academia (ej. "PEM Excellence Academy")

Tipografía: una fuente geométrica de alto contraste para títulos, una fuente limpia de lectura para cuerpo de texto, una fuente monoespaciada para metadatos/códigos técnicos.

---

## 8. Producción de contenido (flujo de trabajo, no necesariamente una función de la app)

El contenido de cada módulo (guion de video, preguntas de examen, flashcards) se diseña con esta metodología de "doble riel":
1. **Riel normativo:** qué exige la cláusula exacta de la norma, tal como lo pediría un auditor.
2. **Riel operativo:** inmediatamente después, el mismo requisito anclado a un escenario real de la empresa — nunca se sustituye el requisito por el ejemplo, se refuerzan juntos.

---

## 9. Lo que NO se necesita (para no sobre-construir)

- No hace falta gamificación compleja (insignias, tablas de posiciones) a menos que el cliente lo pida explícitamente.
- No hace falta app móvil nativa — un sitio web responsivo que funcione bien en celular es suficiente.
- No hace falta soporte para miles de idiomas — empezar con español, diseñar pensando en poder agregar inglés después.

---

## 10. Primer caso de uso a construir (para probar la plataforma)

Usa como ejemplo de contenido piloto una empresa ficticia de servicios industriales petroleros con 4 categorías normativas (Calidad, Ambiental, Seguridad, Ética/Cumplimiento), 12 módulos cada una, y 3 perfiles de puesto de ejemplo (Operador, Gerente de Área, Administrativo) con niveles objetivo distintos por escuela.
