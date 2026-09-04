// Configuración del cliente Supabase para PEM Excellence Academy.
// La "anon key" es pública por diseño (está pensada para vivir en el navegador) —
// la seguridad real la dan las políticas RLS configuradas en la base de datos.
window.PEM_SB = supabase.createClient(
  'https://hdvqxjgittoaloutxzma.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnF4amdpdHRvYWxvdXR4em1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjkxNzgsImV4cCI6MjEwNDEwNTE3OH0.8Dn953sFMg-eDov4b_DvwXMIohNmXt5mWRgRE7ljdQE'
);
