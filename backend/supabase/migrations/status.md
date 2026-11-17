# Supabase migrations status

Three migrations: the initial books/editor schema, `20261117000100_book_covers_bucket.sql` (public `book-covers` Storage bucket, no write policies), and `20261114000100_login_attempts.sql` (shared sign-in rate limit table plus `record_failed_login`, service-role only). The initial and login-attempts migrations were applied and exercised on a throwaway local Postgres 18 on 2026-11-14; the covers bucket migration is untested locally (needs Supabase's `storage` schema). None is applied to a Supabase project yet.
