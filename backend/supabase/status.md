# Supabase status

Snapshot: 2026-10-22. The initial schema is implemented alongside MongoDB; no remote project is configured or migrated.

The books/editor SQL schema is present in `migrations/`. Apply and validate it in a non-production project before selecting the Supabase provider. Do not mark cutover complete until data validation and rollback checks pass.

The `20261117000100_book_covers_bucket.sql` migration adds a public `book-covers` Storage bucket (4 MB, JPG/PNG/WebP); it has no write policies, so uploads use the backend secret key. Not applied to any remote project.

Direct files: none. Subfolders: `migrations/`.
