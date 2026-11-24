-- Ya aplicado en Supabase (24-nov-2026). Se guarda aquí como respaldo.
create table if not exists public.videos_instructivos (
  id uuid primary key default gen_random_uuid(),
  escuela text not null default 'operaciones',
  titulo text not null,
  descripcion text,
  tema text not null default 'General',
  url text not null check (url ~* '^https?://'),
  origen text not null default 'otro',
  orden int not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists videos_instructivos_tema_idx on public.videos_instructivos (escuela, tema, orden);
alter table public.videos_instructivos enable row level security;
create policy "videos_leer_autenticados" on public.videos_instructivos for select to authenticated using (activo or public.is_admin());
create policy "videos_admin_insert" on public.videos_instructivos for insert to authenticated with check (public.is_admin());
create policy "videos_admin_update" on public.videos_instructivos for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "videos_admin_delete" on public.videos_instructivos for delete to authenticated using (public.is_admin());
