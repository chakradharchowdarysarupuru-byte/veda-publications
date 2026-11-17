-- Public bucket for Chief Editor book covers. Uploads go through the backend
-- with the secret key only; no storage policies grant anon or authenticated
-- writes, and public reads come from the bucket being public.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'book-covers',
  'book-covers',
  true,
  4194304,
  '{image/jpeg,image/png,image/webp}'
)
on conflict (id) do nothing;
