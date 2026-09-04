// Candado de acceso de PEM Excellence Academy — login real con cuenta de Microsoft.
// Reemplaza el gate anterior de contraseña compartida (assets/auth-config.js, en desuso).
(function(){
  function buildOverlay(){
    if(document.getElementById('pemGateOverlay')) return;
    var ov = document.createElement('div');
    ov.id = 'pemGateOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#0B0E0C;display:flex;align-items:center;justify-content:center;padding:20px;';
    ov.innerHTML =
      '<div style="max-width:340px;width:100%;background:#141815;border:1px solid #26302A;border-radius:14px;padding:28px 24px;text-align:center;font-family:\'Inter\',sans-serif;">' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:.14em;color:#16C270;text-transform:uppercase;margin-bottom:10px;">PEM Excellence Academy</div>' +
        '<div style="color:#F1F3F0;font-size:14px;margin-bottom:18px;line-height:1.5;">Inicia sesión con tu cuenta de Microsoft de PEM para continuar</div>' +
        '<button id="pemGateBtn" style="width:100%;background:#16C270;color:#06140D;border:none;padding:12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;gap:9px;">' +
          '<svg width="16" height="16" viewBox="0 0 23 23"><rect width="10" height="10" fill="#F25022"/><rect x="12" width="10" height="10" fill="#7FBA00"/><rect y="12" width="10" height="10" fill="#00A4EF"/><rect x="12" y="12" width="10" height="10" fill="#FFB900"/></svg>' +
          'Iniciar sesión con Microsoft' +
        '</button>' +
        '<div id="pemGateError" style="color:#E8603D;font-size:12px;margin-top:12px;display:none;">No se pudo iniciar sesión. Intenta de nuevo.</div>' +
      '</div>';
    document.body.appendChild(ov);
    document.getElementById('pemGateBtn').addEventListener('click', async function(){
      const { error } = await window.PEM_SB.auth.signInWithOAuth({
        provider: 'azure',
        options: { redirectTo: window.location.href, scopes: 'email' }
      });
      if(error){
        var errEl = document.getElementById('pemGateError');
        if(errEl){ errEl.textContent = error.message; errEl.style.display = 'block'; }
      }
    });
  }

  async function checkAuth(){
    const { data: { session } } = await window.PEM_SB.auth.getSession();
    var ov = document.getElementById('pemGateOverlay');
    if(session){
      if(ov) ov.remove();
    } else {
      buildOverlay();
    }
  }

  window.PEM_SB.auth.onAuthStateChange(function(){ checkAuth(); });
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', checkAuth);
  } else {
    checkAuth();
  }
})();
