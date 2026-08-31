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

  window.PEM_SHELL = { SCHOOLS: SCHOOLS, MODULES_PER_SCHOOL: MODULES_PER_SCHOOL, computeProgress: computeProgress, nextStep: nextStep, prefix: prefix, readCert: readCert };

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
    {label:'Rutas de aprendizaje', href:prefix+'rutas-aprendizaje-pem-excellence-academy.html', match:/rutas-aprendizaje/, icon:'route'}
  ];
  var NAV_SOON = ['Mi desarrollo','Mis cursos','Evaluaciones','Certificaciones','Recursos','Noticias'];

  var ICONS = {
    home:'<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/>',
    grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    route:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 7 16 17M8.5 6h7A3 3 0 0 1 18 9v3"/>',
    soon:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
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
