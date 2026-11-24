/* PEM Excellence Academy — utilidades de la Videoteca (Escuela de Operaciones)
   Los videos son ENLACES a su origen (Instagram, YouTube, TikTok…): no se alojan aquí. */
(function(){
  var ORIGENES = {
    instagram:{label:'Instagram', color:'#E1306C', host:/(^|\.)instagram\.com$/},
    youtube:  {label:'YouTube',   color:'#E02B20', host:/(^|\.)(youtube\.com|youtu\.be)$/},
    tiktok:   {label:'TikTok',    color:'#17A5A8', host:/(^|\.)tiktok\.com$/},
    facebook: {label:'Facebook',  color:'#1877F2', host:/(^|\.)(facebook\.com|fb\.watch|fb\.com)$/},
    linkedin: {label:'LinkedIn',  color:'#0A66C2', host:/(^|\.)linkedin\.com$/},
    x:        {label:'X',         color:'#555555', host:/(^|\.)(x\.com|twitter\.com)$/},
    vimeo:    {label:'Vimeo',     color:'#1AB7EA', host:/(^|\.)vimeo\.com$/},
    otro:     {label:'Enlace',    color:'#6B7280', host:null}
  };
  // Quita parámetros de rastreo para que el enlace quede limpio.
  var TRACK = /^(utm_|hvrq$|igsh$|igshid$|fbclid$|si$|feature$|is_from_webapp$|sender_device$|ref$)/i;

  function parse(u){ try{ return new URL(String(u||'').trim()); }catch(e){ return null; } }
  function cleanUrl(u){
    var p = parse(u); if(!p) return String(u||'').trim();
    Array.from(p.searchParams.keys()).forEach(function(k){ if(TRACK.test(k)) p.searchParams.delete(k); });
    var s = p.toString();
    return s.replace(/\?$/, '');
  }
  function detectOrigen(u){
    var p = parse(u); if(!p) return 'otro';
    var h = p.hostname.toLowerCase();
    for(var k in ORIGENES){ if(ORIGENES[k].host && ORIGENES[k].host.test(h)) return k; }
    return 'otro';
  }
  // Los títulos copiados de redes suelen traer letras "decorativas" (𝐁𝐨𝐭𝐭𝐨𝐦) que se ven mal: se normalizan.
  function normTexto(t){ try{ return String(t==null?'':t).normalize('NFKC').replace(/\s+/g,' ').trim(); }catch(e){ return String(t||'').trim(); } }
  function esc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function origenInfo(k){ return ORIGENES[k] || ORIGENES.otro; }

  window.PEM_VIDEOS = { ORIGENES:ORIGENES, cleanUrl:cleanUrl, detectOrigen:detectOrigen, normTexto:normTexto, esc:esc, origenInfo:origenInfo };
})();
