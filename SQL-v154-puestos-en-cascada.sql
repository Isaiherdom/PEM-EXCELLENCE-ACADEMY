-- PEM Excellence Academy v154 — Puestos ligados en cascada
-- Pegar completo en Supabase > SQL Editor > Run. Correr UNA vez, ANTES de subir el v154.

-- 1) Reparar datos que quedaron huérfanos por renombrar puestos con el método anterior
update public.profiles set rol = 'Supervisor de Operación' where rol = 'Supervisores de campo';
delete from public.rutas_puesto where puesto not in (select nombre from public.puestos);

-- 2) De ahora en adelante, el puesto de cada persona y su ruta siempre apuntan al catálogo
alter table public.profiles
  add constraint profiles_rol_fkey foreign key (rol) references public.puestos(nombre)
  on update cascade on delete set null;
alter table public.rutas_puesto
  add constraint rutas_puesto_puesto_fkey foreign key (puesto) references public.puestos(nombre)
  on update cascade on delete cascade;
