/* PEM Excellence Academy — CTA dinámico de sesión de bienvenida en vivo (Inducción)
   ---------------------------------------------------------------------------
   Este archivo NO guarda ningún enlace fijo. En cada carga, pregunta al
   proyecto Supabase del sistema "Evidencias Dinámicas" (panel del instructor,
   https://isaiherdom.github.io/pem-evidencias-capacitacion-v1/) cuál es la
   sesión de bienvenida actualmente abierta, y arma el botón de registro con
   el token real de esa sesión.

   Cómo se marca una sesión como "de inducción" en el panel del instructor:
   basta con que, al programar el evento, su NOMBRE contenga la palabra
   "induc" (p. ej. "Inducción PEM — Septiembre 2026") y su estado sea
   "abierto". La función obtener_sesion_induccion_activa() (creada en el
   proyecto Supabase "Evidencias Dinámicas") ya filtra por eso — no hay que
   tocar nada aquí cuando Isaí programe una sesión nueva.

   Requiere en la página un contenedor: <div id="induccionCTA"></div> */
(function(){
  var SUPA_URL  = 'https://wrhrqlnuiaowymyflpwn.supabase.co';
  var SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyaHJxbG51aWFvd3lteWZscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MjMzMTEsImV4cCI6MjEwNDk5OTMxMX0.SELZqmZUWjkFtXPtMqByvQSC_obKuTlwBeL1PN0GDpc';
  var REGISTRO_BASE = 'https://isaiherdom.github.io/pem-evidencias-capacitacion-v1/prototipo-evidencias-conectado.html';

  function renderPlaceholder(el){
    el.innerHTML =
      '<div class="induc-cta-inner">'+
        '<div class="induc-cta-txt"><b>Sesión de bienvenida en vivo</b>'+
        '<span>Aún no hay una sesión abierta en el panel del instructor — próxima fecha: por anunciar.</span></div>'+
      '</div>';
  }
  function renderError(el){
    el.innerHTML =
      '<div class="induc-cta-inner">'+
        '<div class="induc-cta-txt"><b>Sesión de bienvenida en vivo</b>'+
        '<span>No pudimos consultar el panel de registro en este momento. Pregunta a tu responsable de SGI por la próxima fecha.</span></div>'+
      '</div>';
  }
  function fmtFecha(iso){
    try{
      var d = new Date(iso + 'T00:00:00');
      var s = d.toLocaleDateString('es-MX', {day:'numeric', month:'long', year:'numeric'});
      return s.charAt(0).toUpperCase() + s.slice(1);
    }catch(e){ return iso; }
  }
  function renderSession(el, s){
    var url = REGISTRO_BASE + '?token=' + encodeURIComponent(s.token_acceso);
    var detalle = fmtFecha(s.fecha) + (s.tipo ? ' · ' + s.tipo : '');
    el.innerHTML =
      '<div class="induc-cta-inner">'+
        '<div class="induc-cta-txt"><b>'+(s.nombre || 'Sesión de bienvenida en vivo')+'</b>'+
        '<span>'+detalle+' — tu asistencia (firma y foto) se registra ahí, no en esta página.</span></div>'+
        '<a class="induc-cta-btn" href="'+url+'" target="_blank" rel="noopener">Registrarme →</a>'+
      '</div>';
  }

  function init(){
    var el = document.getElementById('induccionCTA');
    if(!el) return;
    renderPlaceholder(el);
    if(!window.fetch) return;
    fetch(SUPA_URL + '/rest/v1/rpc/obtener_sesion_induccion_activa', {
      method:'POST',
      headers:{
        'apikey': SUPA_ANON,
        'Authorization':'Bearer '+SUPA_ANON,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({})
    }).then(function(r){ return r.ok ? r.json() : Promise.reject(new Error('http '+r.status)); })
      .then(function(rows){
        if(rows && rows.length && rows[0].token_acceso){ renderSession(el, rows[0]); }
      })
      .catch(function(){ renderError(el); });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
