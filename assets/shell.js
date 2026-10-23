/* PEM Excellence Academy — Shell compartido
   Construye sidebar + header en tiempo de ejecución en las 200 páginas,
   y calcula progreso real a partir de los certificados guardados en Supabase
   (Fase 4D — antes vivía en localStorage; PEM_SHELL.ready se resuelve cuando
   la lectura desde Supabase para la sesión activa ya está en caché). */
(function(){
  try{ if(localStorage.getItem('pemSidebarCollapsed') === '1') document.documentElement.classList.add('pem-collapsed'); }catch(e){}
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

  var INDUC_TITLES = {
    1:'Qué es PEM', 2:'Historia', 3:'Organigrama y quién es quién', 4:'Mapa de procesos',
    5:'Panorama de Calidad, Ambiental, Seguridad y Ética', 6:'Certificaciones de PEM',
    7:'La operación en campo', 8:'Primeros pasos prácticos'
  };

  // Caché en memoria, poblada una vez por carga de página desde Supabase (ver PEM_SHELL.ready).
  var _certCache = {};
  function readCert(schoolFolder, n){
    var school = SCHOOLS.filter(function(s){ return s.folder === schoolFolder; })[0];
    var key = (school ? school.key : schoolFolder) + '::' + n;
    return _certCache[key] || null;
  }

  // Progreso real por escuela + agregados. Solo cuenta certificados vigentes —
  // uno vencido (norma actualizada de versión) no cuenta como completo aquí,
  // aunque readCert() lo siga devolviendo para que la página lo muestre como
  // "vencido" en vez de borrarlo sin explicación.
  function computeProgress(){
    var perSchool = {}, totalCerts = 0, lastDate = null, lastDateStr = '';
    SCHOOLS.forEach(function(s){
      var count = 0;
      for(var n=1;n<=MODULES_PER_SCHOOL;n++){
        var c = readCert(s.folder, n);
        if(c && c.vigente !== false){
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

  // ---------- Candado secuencial: el módulo N solo abre si el N-1 ya está aprobado ----------
  // - Lo ya aprobado (vigente) siempre queda abierto: nadie pierde avance previo.
  // - Los administradores están exentos.
  // - Si no se pudo leer el avance (error de red), NO se bloquea (falla abierta).
  var _isAdmin = false, _loaded = false;
  function certOk(folder, n){ var c = readCert(folder, n); return !!(c && c.vigente !== false); }
  function isLocked(folder, n){
    if(_isAdmin || !_loaded || n <= 1) return false;
    if(certOk(folder, n)) return false;
    return !certOk(folder, n - 1);
  }
  function firstPending(folder){
    for(var n=1;n<=MODULES_PER_SCHOOL;n++){ if(!certOk(folder, n)) return n; }
    return MODULES_PER_SCHOOL;
  }

  window.PEM_SHELL = { isLocked: isLocked, firstPending: firstPending, SCHOOLS: SCHOOLS, MODULES_PER_SCHOOL: MODULES_PER_SCHOOL, computeProgress: computeProgress, nextStep: nextStep, prefix: prefix, readCert: readCert, scoreNum: scoreNum, scoreLabel: scoreLabel };

  // Fase 4D — llena _certCache desde Supabase para la sesión activa.
  // Todas las páginas que consultan progreso deben esperar esta promesa antes de leerlo
  // (computeProgress/readCert siguen siendo síncronas, pero solo tienen datos reales
  // una vez que PEM_SHELL.ready se resuelve).
  window.PEM_SHELL.ready = (async function(){
    try{
      if(!window.PEM_SB) return;
      var sessionRes = await window.PEM_SB.auth.getSession();
      var session = sessionRes && sessionRes.data && sessionRes.data.session;
      if(!session) return;
      var res = await window.PEM_SB.from('certificados').select('*').eq('user_id', session.user.id);
      if(res.error || !res.data) { console.warn('PEM_SHELL: no se pudo leer certificados de Supabase', res.error); return; }
      try{
        var pr = await window.PEM_SB.from('profiles').select('is_admin').eq('id', session.user.id).maybeSingle();
        _isAdmin = !!(pr && pr.data && pr.data.is_admin);
      }catch(e){}
      _loaded = true;
      res.data.forEach(function(row){
        var dateStr = '';
        if(row.fecha){
          try{ dateStr = new Date(row.fecha).toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric'}); }catch(e){}
        }
        // Vigente/vencido: solo lo sabemos si esta página cargó modules.js (PEM_SCHOOLS)
        // Y el certificado trae su versión guardada — si falta cualquiera de las dos,
        // se asume vigente (nunca lo marcamos vencido por falta de datos).
        var currentVersion = (window.PEM_SCHOOLS && PEM_SCHOOLS[row.escuela]) ? PEM_SCHOOLS[row.escuela].version : null;
        var vigente = (row.norma_version == null || currentVersion == null) ? true : (row.norma_version === currentVersion);
        _certCache[row.escuela + '::' + row.modulo] = {
          score: (row.calificacion === null || row.calificacion === undefined) ? '—' : row.calificacion,
          date: dateStr,
          certId: row.certificado_id,
          normaVersion: row.norma_version || null,
          vigente: vigente
        };
      });
    }catch(e){ console.warn('PEM_SHELL: error inesperado leyendo progreso de Supabase', e); }
  })();


  // ---------- Guardia: si abren por URL directa un módulo bloqueado, se regresa al que toca ----------
  (function(){
    var base = path.split('/').pop();
    var m = base.match(/^(?:examen|flashcards|infografia|video)-modulo(\d+)/);
    if(!m) return; // los certificados no se guardan aquí: se llegan desde el examen aprobado
    var n = parseInt(m[1], 10);
    var schoolMatch = path.match(/\/escuela-(ambiental|etica|seguridad)\//);
    var folder = schoolMatch ? 'escuela-' + schoolMatch[1] + '/' : '';
    var keyMap = {'':'9001','escuela-ambiental/':'14001','escuela-seguridad/':'45001','escuela-etica/':'37001'};
    var de = document.documentElement;
    de.style.visibility = 'hidden';
    var reveal = function(){ de.style.visibility = ''; };
    setTimeout(reveal, 6000); // por si algo tarda: nunca dejar la página en blanco
    Promise.resolve(window.PEM_SHELL.ready).then(function(){
      if(window.PEM_SHELL.isLocked(folder, n)){
        var go = window.PEM_SHELL.firstPending(folder);
        try{ sessionStorage.setItem('pemLockMsg', 'Primero completa y aprueba el Módulo ' + (n-1) + ' para abrir el Módulo ' + n + '.'); }catch(e){}
        window.location.replace(prefix + 'index.html?escuela=' + keyMap[folder] + '&modulo=' + go + '#explorar');
      } else { reveal(); }
    }).catch(reveal);
  })();

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
    if(base === 'induccion.html') return 'Inducción a PEM';
    if((m = base.match(/^induccion-0(\d)-/))) return 'Inducción · ' + INDUC_TITLES[Number(m[1])];
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
    if(base === 'admin-plantilla.html') return 'Administrar plantilla';
    if(base === 'admin-puestos.html') return 'Administrar puestos';
    if(base === 'admin-requisitos.html') return 'Administrar requisitos por puesto';
    if(base === 'admin-rutas.html') return 'Administrar rutas';
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
    {label:'Mi perfil', href:prefix+'mi-perfil.html', match:/mi-perfil/, icon:'user'},
    {label:'Escuelas', href:prefix+'mapa-academico-pem-excellence-academy.html', match:/mapa-academico/, icon:'grid'},
    {label:'Inducción', href:prefix+'induccion.html', match:/(^|\/)induccion(-|\.html)/, icon:'induc'},
    {label:'Rutas de aprendizaje', href:prefix+'rutas-aprendizaje-pem-excellence-academy.html', match:/rutas-aprendizaje/, icon:'route'},
    {label:'Mi desarrollo', href:prefix+'mi-desarrollo.html', match:/mi-desarrollo/, icon:'growth'},
    {label:'Mis cursos', href:prefix+'mis-cursos.html', match:/mis-cursos/, icon:'book'},
    {label:'Evaluaciones', href:prefix+'mis-evaluaciones.html', match:/mis-evaluaciones/, icon:'check'},
    {label:'Certificaciones', href:prefix+'certificaciones.html', match:/certificaciones\.html/, icon:'badge'},
    {label:'Generar DC-3', href:prefix+'generar-dc3.html', match:/generar-dc3/, icon:'doc'},
    {label:'Recursos', href:prefix+'recursos.html', match:/recursos\.html/, icon:'doc'},
    {label:'Dashboard Ejecutivo', href:prefix+'dashboard-ejecutivo.html', match:/dashboard-ejecutivo/, icon:'growth'},
    {label:'Noticias', href:prefix+'noticias.html', match:/noticias\.html/, icon:'news'}
  ];
  var NAV_SOON = [];

  // Los paneles de "Administrador" se agrupan aparte (menú plegable) para no saturar
  // el resto del menú — ver buildSidebar().
  var NAV_ADMIN = [
    {label:'Administrar usuarios', href:prefix+'admin-usuarios.html', match:/admin-usuarios/, icon:'users'},
    {label:'Administrar plantilla', href:prefix+'admin-plantilla.html', match:/admin-plantilla/, icon:'users'},
    {label:'Administrar puestos', href:prefix+'admin-puestos.html', match:/admin-puestos/, icon:'users'},
    {label:'Administrar requisitos', href:prefix+'admin-requisitos.html', match:/admin-requisitos/, icon:'users'},
    {label:'Administrar rutas', href:prefix+'admin-rutas.html', match:/admin-rutas/, icon:'users'}
  ];

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
    users:'<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke-linecap="round"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 13.2c2.3.3 4 2 4 4.3" stroke-linecap="round"/>',
    user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M4.5 19.5c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" stroke-linecap="round"/>',
    back:'<path d="M11 5 5 12l6 7"/><path d="M5 12h14" stroke-linecap="round"/>',
    induc:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke-linecap="round"/><circle cx="12" cy="12" r="6"/><path d="m12 9 1.8 3.8L18 14l-4.2 1.2L12 19l-1.8-3.8L6 14l4.2-1.2Z"/>',
    logout:'<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17l5-5-5-5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12H9" stroke-linecap="round"/>',
    collapse:'<path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>',
    chev:'<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  function svg(name){ return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICONS[name]+'</svg>'; }

  function buildSidebar(){
    var items = NAV_REAL.map(function(item){
      var active = item.match.test(path) || (item.href.indexOf('index.html')>-1 && /\/(index\.html)?$/.test(path));
      return '<a href="'+item.href+'" class="'+(active?'active':'')+'" title="'+item.label+'">'+svg(item.icon)+'<span>'+item.label+'</span></a>';
    }).join('');
    var soon = NAV_SOON.map(function(label){
      return '<a href="'+prefix+'proximamente.html" class="soon" title="'+label+'">'+svg('soon')+'<span>'+label+'</span><span class="badge">pronto</span></a>';
    }).join('');

    // Grupo plegable "Administrador": se abre solo si ya estás en uno de sus paneles,
    // o si tú mismo lo dejaste abierto la última vez (se recuerda en este navegador).
    var adminActive = NAV_ADMIN.some(function(item){ return item.match.test(path); });
    var adminOpenStored = null;
    try{ adminOpenStored = localStorage.getItem('pemAdminNavOpen'); }catch(e){}
    var adminOpen = adminActive || adminOpenStored === '1';
    var adminItems = NAV_ADMIN.map(function(item){
      var active = item.match.test(path);
      return '<a href="'+item.href+'" class="'+(active?'active':'')+'" title="'+item.label+'">'+svg(item.icon)+'<span>'+item.label+'</span></a>';
    }).join('');
    var adminGroup =
      '<div class="pem-nav-group'+(adminOpen?' open':'')+'" id="pemAdminGroup">'+
        '<button type="button" class="pem-nav-toggle'+(adminActive?' active':'')+'" id="pemAdminToggle" title="Administrador">'+
          svg('users')+'<span>Administrador</span>'+svg('chev')+
        '</button>'+
        '<div class="pem-nav-sub">'+adminItems+'</div>'+
      '</div>';

    return (
      '<nav class="pem-sidebar" id="pemSidebar">'+
        '<div class="pem-sidebar-brand"><div class="txt"><div class="k">Production Enhancement México</div><div class="t">PEM Excellence Academy</div></div>'+
          '<button type="button" class="pem-collapse" id="pemCollapse" aria-label="Contraer o expandir menú" title="Contraer / expandir menú">'+svg('collapse')+'</button></div>'+
        '<div class="pem-nav">'+items+adminGroup+soon+'</div>'+
        '<div class="pem-sidebar-foot"><a href="#" id="pemLogoutBtn">'+svg('logout')+'<span>Cerrar sesión</span></a></div>'+
      '</nav>'
    );
  }
  function setCollapsed(c){
    document.documentElement.classList.toggle('pem-collapsed', c);
    try{ localStorage.setItem('pemSidebarCollapsed', c ? '1' : '0'); }catch(e){}
  }
  function wireCollapse(){
    var b = document.getElementById('pemCollapse');
    if(b) b.addEventListener('click', function(){ setCollapsed(!document.documentElement.classList.contains('pem-collapsed')); });
  }
  function wireAdminToggle(){
    var toggle = document.getElementById('pemAdminToggle');
    var group = document.getElementById('pemAdminGroup');
    if(!toggle || !group) return;
    toggle.addEventListener('click', function(){
      // con el menú contraído, el grupo no cabe: primero se expande el menú
      if(document.documentElement.classList.contains('pem-collapsed') && window.innerWidth > 900){
        setCollapsed(false);
      }
      var nowOpen = !group.classList.contains('open');
      group.classList.toggle('open', nowOpen);
      try{ localStorage.setItem('pemAdminNavOpen', nowOpen ? '1' : '0'); }catch(e){}
    });
  }
  function wireLogout(){
    var btn = document.getElementById('pemLogoutBtn');
    if(!btn) return;
    btn.addEventListener('click', async function(e){
      e.preventDefault();
      try{ await window.PEM_SB.auth.signOut(); }catch(err){ console.warn('Error al cerrar sesión:', err); }
      window.location.href = prefix + 'bienvenida-login.html';
    });
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
    wireLogout();
    wireAdminToggle();
    wireCollapse();
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
