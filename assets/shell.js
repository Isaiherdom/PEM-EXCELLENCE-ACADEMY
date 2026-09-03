/* PEM Excellence Academy — Shell compartido
   Construye sidebar + header en tiempo de ejecución en las 200 páginas,
   y calcula progreso real a partir de los certificados guardados en localStorage
   (clave 'pemCert::' + ruta completa, generada por cada certificado-moduloN.html). */
(function(){
  var path = window.location.pathname;
  var siteRoot = path.replace(/(escuela-(ambiental|etica|seguridad)\/)?[^\/]*$/, '');
  var inSchool = /\/escuela-(ambiental|etica|seguridad)\//.test(path);
  var prefix = inSchool ? '../' : '';

  var SCHOOLS = [
    {key:'9001',  label:'Calidad',   folder:'',                 exam:'-iso9001'},
    {key:'14001', label:'Ambiental', folder:'escuela-ambiental/', exam:'-iso14001'},
    {key:'45001', label:'Seguridad', folder:'escuela-seguridad/', exam:'-iso45001'},
    {key:'37001', label:'Ética',     folder:'escuela-etica/',     exam:'-iso37001'}
  ];
  var MODULES_PER_SCHOOL = 12;

  function certKey(schoolFolder, n){
    return 'pemCert::' + siteRoot + schoolFolder + 'certificado-modulo' + n + '.html';
  }
  function readCert(schoolFolder, n){
    try{
      var raw = localStorage.getItem(certKey(schoolFolder, n));
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  // Progreso real por escuela + agregados
  function computeProgress(){
    var perSchool = {}, totalCerts = 0, lastDate = null, lastDateStr = '';
    SCHOOLS.forEach(function(s){
      var count = 0;
      for(var n=1;n<=MODULES_PER_SCHOOL;n++){
        var c = readCert(s.folder, n);
        if(c){
          count++;
          totalCerts++;
          if(c.date){
            var d = new Date(c.date);
            if(!lastDate || d > lastDate){ lastDate = d; lastDateStr = c.date; }
          }
        }
      }
      perSchool[s.key] = count;
    });
    var totalModules = SCHOOLS.length * MODULES_PER_SCHOOL;
    return {perSchool: perSchool, totalCerts: totalCerts, totalModules: totalModules, lastDateStr: lastDateStr};
  }

  // Próximo módulo pendiente en la escuela con más avance (o Calidad Módulo 1 si no hay nada aún)
  function nextStep(progress){
    var best = null;
    SCHOOLS.forEach(function(s){
      var done = progress.perSchool[s.key];
      if(done < MODULES_PER_SCHOOL && (!best || done > best.done) && done > 0){
        best = {school:s, done:done};
      }
    });
    if(!best){
      // nada empezado todavía: primer módulo de Calidad
      best = {school:SCHOOLS[0], done:0};
    }
    var nextN = best.done + 1;
    return {
      school: best.school,
      moduleN: nextN,
      examHref: prefix + best.school.folder + 'examen-modulo' + nextN + best.school.exam + '.html'
    };
  }

  // Algunos certificados muy antiguos (generados antes de que el examen forzara
  // el parámetro ?score=) se guardaron con "—" en vez de un número real.
  // Este helper evita que eso rompa promedios o se vea como "—%".
  function scoreNum(cert){
    var n = parseFloat(cert && cert.score);
    return isNaN(n) ? null : n;
  }
  function scoreLabel(cert){
    var n = scoreNum(cert);
    return n === null ? 'Sin calificación registrada' : n + '%';
  }

  window.PEM_SHELL = { SCHOOLS: SCHOOLS, MODULES_PER_SCHOOL: MODULES_PER_SCHOOL, computeProgress: computeProgress, nextStep: nextStep, prefix: prefix, readCert: readCert, scoreNum: scoreNum, scoreLabel: scoreLabel };

  // ---------- Enlace "Volver al módulo" (hacia Inicio, con la escuela correcta preseleccionada) ----------
  function backToModuleUrl(){
    var base = path.split('/').pop();
    var schoolKeyMap = {ambiental:'14001', etica:'37001', seguridad:'45001'};
    var schoolMatch = path.match(/\/escuela-(ambiental|etica|seguridad)\//);
    var schoolKey = schoolMatch ? schoolKeyMap[schoolMatch[1]] : '9001';
    var m = base.match(/^(?:certificado|examen|flashcards|infografia|video)-modulo(\d+)/);
    if(!m) return null;
    return prefix + 'index.html?escuela=' + schoolKey + '&modulo=' + m[1] + '#explorar';
  }

  // ---------- Breadcrumb / título de página según la ruta ----------
  function pageTitle(){
    var base = path.split('/').pop();
    var schoolMap = {ambiental:'Ambiental', etica:'Ética', seguridad:'Seguridad'};
    var schoolMatch = path.match(/\/escuela-(ambiental|etica|seguridad)\//);
    var schoolLabel = schoolMatch ? schoolMap[schoolMatch[1]] : 'Calidad';
    var m;
    if(base === '' || base === 'index.html') return 'Inicio';
    if(base === 'bienvenida-orientacion.html') return 'Bienvenida y orientación';
    if(base === 'rutas-aprendizaje-pem-excellence-academy.html') return 'Rutas de aprendizaje';
    if(base === 'mapa-academico-pem-excellence-academy.html') return 'Escuelas';
    if(base.indexOf('mapa-escuela-') === 0) return 'Mapa de escuela';
    if(base === 'cambiar-contrasena.html') return 'Cambiar contraseña';
    if(base === 'gold-standard-identidad-visual.html') return 'Identidad visual';
    if(base === 'mi-desarrollo.html') return 'Mi desarrollo';
    if(base === 'mis-cursos.html') return 'Mis cursos';
    if(base === 'mis-evaluaciones.html') return 'Evaluaciones';
    if(base === 'certificaciones.html') return 'Certificaciones';
    if(base === 'generar-dc3.html') return 'Generar DC-3';
    if(base === 'noticias.html') return 'Noticias';
    if(base === 'recursos.html') return 'Recursos';
    if(base === 'dashboard-ejecutivo.html') return 'Dashboard Ejecutivo';
    if(base === 'proximamente.html') return 'Próximamente';
    if((m = base.match(/^certificado-modulo(\d+)\.html$/))) return 'Certificado · Módulo ' + m[1] + ' · Escuela de ' + schoolLabel;
    if((m = base.match(/^examen-modulo(\d+)/))) return 'Examen · Módulo ' + m[1] + ' · Escuela de ' + schoolLabel;
    if((m = base.match(/^flashcards-modulo(\d+)/))) return 'Flashcards · Módulo ' + m[1] + ' · Escuela de ' + schoolLabel;
    if((m = base.match(/^infografia-modulo(\d+)/))) return 'Infografía · Módulo ' + m[1] + ' · Escuela de ' + schoolLabel;
    if((m = base.match(/^video-modulo(\d+)/))) return 'Video · Módulo ' + m[1];
    return 'PEM Excellence Academy';
  }

  // ---------- Construcción del sidebar ----------
  var NAV_REAL = [
    {label:'Inicio', href:prefix+'index.html', match:/(^|\/)index\.html$|\/$/, icon:'home'},
    {label:'Escuelas', href:prefix+'mapa-academico-pem-excellence-academy.html', match:/mapa-academico/, icon:'grid'},
    {label:'Rutas de aprendizaje', href:prefix+'rutas-aprendizaje-pem-excellence-academy.html', match:/rutas-aprendizaje/, icon:'route'},
    {label:'Mi desarrollo', href:prefix+'mi-desarrollo.html', match:/mi-desarrollo/, icon:'growth'},
    {label:'Mis cursos', href:prefix+'mis-cursos.html', match:/mis-cursos/, icon:'book'},
    {label:'Evaluaciones', href:prefix+'mis-evaluaciones.html', match:/mis-evaluaciones/, icon:'check'},
    {label:'Certificaciones', href:prefix+'certificaciones.html', match:/certificaciones\.html/, icon:'badge'},
    {label:'Generar DC-3', href:prefix+'generar-dc3.html', match:/generar-dc3/, icon:'doc'},
    {label:'Recursos', href:prefix+'recursos.html', match:/recursos\.html/, icon:'doc'},
    {label:'Noticias', href:prefix+'noticias.html', match:/noticias\.html/, icon:'news'}
  ];
  var NAV_SOON = [];

  var ICONS = {
    home:'<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/>',
    grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    route:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 7 16 17M8.5 6h7A3 3 0 0 1 18 9v3"/>',
    soon:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    growth:'<path d="M4 19h16" stroke-linecap="round"/><path d="M7 15v2M11 11v6M15 8v9M19 5v12" stroke-linecap="round"/>',
    book:'<path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13Z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z"/>',
    check:'<path d="M4 12l5.5 5.5L20 6.5" stroke-linecap="round" stroke-linejoin="round"/>',
    badge:'<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 20l5-2.5 5 2.5-1.5-6.5" stroke-linecap="round" stroke-linejoin="round"/>',
    news:'<path d="M4 6.5A1.5 1.5 0 0 1 5.5 5H15v14H5.5A1.5 1.5 0 0 1 4 17.5v-11Z"/><path d="M15 8h3.5A1.5 1.5 0 0 1 20 9.5v9a1.5 1.5 0 0 1-1.5 1.5H15"/><path d="M7 9h5M7 12h5M7 15h3" stroke-linecap="round"/>',
    doc:'<path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><path d="M14 3.5v4h4"/><path d="M9 13h6M9 16h6M9 10h2" stroke-linecap="round"/>',
    back:'<path d="M11 5 5 12l6 7"/><path d="M5 12h14" stroke-linecap="round"/>'
  };
  function svg(name){ return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICONS[name]+'</svg>'; }

  function buildSidebar(){
    var items = NAV_REAL.map(function(item){
      var active = item.match.test(path) || (item.href.indexOf('index.html')>-1 && /\/(index\.html)?$/.test(path));
      return '<a href="'+item.href+'" class="'+(active?'active':'')+'">'+svg(item.icon)+'<span>'+item.label+'</span></a>';
    }).join('');
    var soon = NAV_SOON.map(function(label){
      return '<a href="'+prefix+'proximamente.html" class="soon">'+svg('soon')+'<span>'+label+'</span><span class="badge">pronto</span></a>';
    }).join('');
    return (
      '<nav class="pem-sidebar" id="pemSidebar">'+
        '<div class="pem-sidebar-brand"><div class="k">Production Enhancement México</div><div class="t">PEM Excellence Academy</div></div>'+
        '<div class="pem-nav">'+items+soon+'</div>'+
        '<div class="pem-sidebar-foot"><div class="doc">PEM-ACAD-HUB-01<br>Production Enhancement México</div></div>'+
      '</nav>'
    );
  }
  function buildHeader(){
    var backUrl = backToModuleUrl();
    var backLink = backUrl ? '<a class="back-module" href="'+backUrl+'">'+svg('back')+'<span>Volver al módulo</span></a>' : '';
    return (
      '<header class="pem-header" id="pemHeader">'+
        '<button class="burger" id="pemBurger" aria-label="Abrir menú">'+svg('grid')+'</button>'+
        backLink+
        '<div class="crumb"><b>'+pageTitle()+'</b></div>'+
        '<button class="theme-toggle" id="pemThemeToggle" aria-label="Cambiar a modo oscuro" title="Cambiar a modo oscuro">🌙</button>'+
      '</header>'
    );
  }
  function buildOverlay(){
    return '<div class="pem-overlay" id="pemOverlay"></div>';
  }
  function initThemeToggle(){
    var btn = document.getElementById('pemThemeToggle');
    if(!btn) return;
    function isDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
    function updateBtn(){
      if(isDark()){
        btn.textContent = '☀️';
        btn.setAttribute('aria-label','Cambiar a modo claro');
        btn.setAttribute('title','Cambiar a modo claro');
      } else {
        btn.textContent = '🌙';
        btn.setAttribute('aria-label','Cambiar a modo oscuro');
        btn.setAttribute('title','Cambiar a modo oscuro');
      }
    }
    updateBtn();
    btn.addEventListener('click', function(){
      if(isDark()){
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('pemTheme','light');
      } else {
        document.documentElement.setAttribute('data-theme','dark');
        localStorage.setItem('pemTheme','dark');
      }
      updateBtn();
    });
  }

  function init(){
    if(document.body.hasAttribute('data-pem-no-shell-nav')) return;
    var skipHeader = document.body.hasAttribute('data-pem-no-shell-header');
    document.body.insertAdjacentHTML('afterbegin', (skipHeader ? '' : buildHeader()) + buildSidebar() + buildOverlay());
    var sidebar = document.getElementById('pemSidebar');
    var overlay = document.getElementById('pemOverlay');
    var burger = document.getElementById('pemBurger'); // shell's own, or a page-provided one with the same id
    function toggle(open){
      sidebar.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
    }
    if(burger) burger.addEventListener('click', function(){ toggle(!sidebar.classList.contains('open')); });
    overlay.addEventListener('click', function(){ toggle(false); });
    if(!skipHeader) initThemeToggle();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
