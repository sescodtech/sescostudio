-- Run once in Supabase SQL Editor. Public read; authenticated staff upload.
-- Keep the project-preview bucket separate from the CMS JSON document.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sesco-project-previews', 'sesco-project-previews', true, 5242880, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
allowed_mime_types = array['image/png','image/jpeg','image/webp'];

-- IMPORTANT: Supabase authenticated users can upload to this bucket.
-- Restrict to staff in your existing role/permission system before production use.
create policy "sesco project previews public read" on storage.objects
for select to public using (bucket_id = 'sesco-project-previews');
create policy "sesco project previews authenticated upload" on storage.objects
for insert to authenticated with check (bucket_id = 'sesco-project-previews');
