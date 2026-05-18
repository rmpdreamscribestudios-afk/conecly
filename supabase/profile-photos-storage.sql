-- CONECLY profile photo storage setup.
-- Run this in the Supabase SQL editor for the project used by VITE_SUPABASE_URL.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-photos',
  'profile-photos',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read profile photos" on storage.objects;
create policy "Public can read profile photos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'profile-photos');

drop policy if exists "Public can upload profile photos" on storage.objects;
create policy "Public can upload profile photos"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = 'public'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
);
