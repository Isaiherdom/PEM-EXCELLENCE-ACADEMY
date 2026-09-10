// Candado de acceso de PEM Excellence Academy — login real con cuenta de Microsoft
// (Fase: pantalla de bienvenida) redirige a bienvenida-login.html, y una vez logueado
// sigue el candado de puesto obligatorio (Fase: asignación por rol) — nadie ve el
// resto de la plataforma hasta que su perfil tenga un puesto guardado en Supabase.
// Reemplaza el gate anterior de contraseña compartida (assets/auth-config.js, en desuso).
(function(){
  var ROLES = [
    "Director General","Gerentes de área/base","Supervisores de campo","Calidad (área)",
    "HSE (área)","Operadores","Mecánicos","Compras","Recursos Humanos","Finanzas",
    "Director de Operación","Director/Gerente de Ventas y Desarrollo de Negocio",
    "Cuentas por Pagar","Cuentas por Cobrar","Almacén","Tesorería","Administrativos en general"
  ];

  function redirectToLogin(){
    var inSchool = /\/escuela-(ambiental|etica|seguridad)\//.test(window.location.pathname);
    var prefix = inSchool ? '../' : '';
    // ya estamos en la propia pantalla de bienvenida, no redirigir en círculo
    if(/bienvenida-login\.html$/.test(window.location.pathname)) return;
    window.location.href = prefix + 'bienvenida-login.html';
  }

  function buildRoleOverlay(session){
    if(document.getElementById('pemRoleGateOverlay')) return;
    var ov = document.createElement('div');
    ov.id = 'pemRoleGateOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#0B0E0C;display:flex;align-items:center;justify-content:center;padding:20px;';
    var options = '<option value="">Selecciona tu puesto...</option>' +
      ROLES.map(function(r){ return '<option>' + r + '</option>'; }).join('');
    ov.innerHTML =
      '<div style="max-width:360px;width:100%;background:#141815;border:1px solid #26302A;border-radius:14px;padding:28px 24px;text-align:center;font-family:\'Inter\',sans-serif;">' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:.14em;color:#16C270;text-transform:uppercase;margin-bottom:10px;">Antes de continuar</div>' +
        '<div style="color:#F1F3F0;font-size:14px;margin-bottom:18px;line-height:1.5;">¿Cuál es tu puesto? Con esto sabemos qué módulos son obligatorios para ti.</div>' +
        '<select id="pemRoleSelect" style="width:100%;box-sizing:border-box;padding:11px;font-size:14px;background:#0B0E0C;border:1px solid #26302A;color:#F1F3F0;border-radius:8px;margin-bottom:12px;">' + options + '</select>' +
        '<button id="pemRoleBtn" style="width:100%;background:#16C270;color:#06140D;border:none;padding:12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;">Continuar</button>' +
        '<div id="pemRoleError" style="color:#E8603D;font-size:12px;margin-top:12px;display:none;"></div>' +
      '</div>';
    document.body.appendChild(ov);
    document.getElementById('pemRoleBtn').addEventListener('click', async function(){
      var val = document.getElementById('pemRoleSelect').value;
      var errEl = document.getElementById('pemRoleError');
      if(!val){
        errEl.textContent = 'Elige un puesto para continuar.';
        errEl.style.display = 'block';
        return;
      }
      const { error } = await window.PEM_SB.from('profiles').upsert(
        { id: session.user.id, rol: val },
        { onConflict: 'id' }
      );
      if(error){
        errEl.textContent = 'No se pudo guardar (' + error.message + '). Intenta de nuevo.';
        errEl.style.display = 'block';
        return;
      }
      ov.remove();
    });
  }

  async function checkRole(session){
    try{
      const { data: profile, error } = await window.PEM_SB.from('profiles').select('rol').eq('id', session.user.id).maybeSingle();
      if(error){ console.warn('PEM: no se pudo verificar el puesto del perfil', error); return; }
      var existing = document.getElementById('pemRoleGateOverlay');
      if(!profile || !profile.rol){
        buildRoleOverlay(session);
      } else if(existing){
        existing.remove();
      }
    }catch(e){ console.warn('PEM: error inesperado verificando el puesto', e); }
  }

  async function checkAuth(){
    const { data: { session } } = await window.PEM_SB.auth.getSession();
    if(session){
      // Limpia el "#" residual que deja el regreso del login de Microsoft.
      if(window.location.hash){
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      checkRole(session);
    } else {
      redirectToLogin();
    }
  }

  window.PEM_SB.auth.onAuthStateChange(function(){ checkAuth(); });
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', checkAuth);
  } else {
    checkAuth();
  }
})();
