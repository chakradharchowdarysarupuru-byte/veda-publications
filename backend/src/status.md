# backend/src status

Snapshot: 2026-11-17. Update after meaningful changes; this note is not a live runtime health check.

Runtime is split across config, controllers, middleware, models, routes, and server bootstrap. The selectable data store supports MongoDB (default) and Supabase; neither provider changes the API routes.

Direct files: `server.js`. Subfolders: `config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `utils/`.

2026-11-14: Same-origin browser requests are allowed by host match for Vercel's shared-domain `/api/*` routing; the explicit `CORS_ORIGINS` allowlist remains for other approved origins and local development.

2026-11-17: Chief Editor cover upload (`POST /api/books/cover`) is implemented and tested locally. Covers go to the Supabase `book-covers` bucket when `DATABASE_PROVIDER=supabase`, otherwise to `backend/uploads/covers/`. The Supabase path is only unit-tested with a fake client; the bucket migration is not applied to any remote project.
