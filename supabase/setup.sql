-- شغّل هذا الملف مرة واحدة في Supabase: SQL Editor → New query → Run

create table if not exists public.site_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table public.site_data enable row level security;

drop policy if exists "public read" on public.site_data;
create policy "public read" on public.site_data for select using (true);

drop policy if exists "admin write" on public.site_data;
create policy "admin write" on public.site_data for all to authenticated using (true) with check (true);

-- bucket للصور
insert into storage.buckets (id, name, public) values ('catalog', 'catalog', true)
on conflict (id) do nothing;

drop policy if exists "public read catalog" on storage.objects;
create policy "public read catalog" on storage.objects for select using (bucket_id = 'catalog');

drop policy if exists "admin write catalog" on storage.objects;
create policy "admin write catalog" on storage.objects for all to authenticated
  using (bucket_id = 'catalog') with check (bucket_id = 'catalog');
