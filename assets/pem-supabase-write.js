// Fase 4B/4C — escritura real en Supabase, compartida por los 48 certificados.
// Corre en paralelo al Google Sheet de siempre — si algo falla aquí, el certificado
// que ve la persona y el registro de auditoría existente NO se ven afectados.
//
// Fase de vencimiento/recertificación: cada certificado se sella con la versión
// de la norma vigente en ese momento (assets/modules.js → PEM_SCHOOLS[escuela].version).
// Si más adelante esa versión sube (la norma se actualizó), este certificado se
// marca como vencido automáticamente en todo el sitio — no hace falta tocarlo.
//
// Fase 4E — reintentos: una falla de red momentánea o una sesión que expira justo
// en ese instante ya no deja el certificado sin registrar en Supabase de forma
// silenciosa y permanente. Se reintenta hasta 3 veces con una pausa creciente
// antes de rendirse (y aun así, sin interrumpir ni alertar a la persona — el
// certificado que ve siempre se genera igual, esto solo protege el registro).
async function pemGuardarCertificado(escuela, modulo, name, base, rol, score, certId){
  const MAX_INTENTOS = 3;
  for(let intento = 1; intento <= MAX_INTENTOS; intento++){
    try{
      const { data: { session } } = await window.PEM_SB.auth.getSession();
      if(!session){ console.warn('Supabase: sin sesión activa, se omite el guardado.'); return; }
      const normaVersion = (window.PEM_SCHOOLS && PEM_SCHOOLS[escuela]) ? PEM_SCHOOLS[escuela].version : null;
      await window.PEM_SB.from('profiles').upsert(
        { id: session.user.id, nombre: name, base, rol },
        { onConflict: 'id' }
      );
      const { error } = await window.PEM_SB.from('certificados').upsert(
        { user_id: session.user.id, escuela, modulo, calificacion: parseInt(score) || null, certificado_id: certId, norma_version: normaVersion },
        { onConflict: 'user_id,escuela,modulo' }
      );
      if(error){ throw new Error(error.message); }
      return; // guardado con éxito, no hace falta reintentar
    }catch(e){
      if(intento === MAX_INTENTOS){
        console.warn('Supabase: no se pudo guardar el certificado tras ' + MAX_INTENTOS + ' intentos (no afecta tu certificado):', e);
      }else{
        await new Promise(function(r){ setTimeout(r, intento * 1500); });
      }
    }
  }
}
