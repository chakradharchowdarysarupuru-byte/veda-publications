# backend/src status

Snapshot: 2026-10-22. Update after meaningful changes; this note is not a live runtime health check.

Runtime is split across config, controllers, middleware, models, routes, and server bootstrap. The selectable data store supports MongoDB (default) and Supabase; neither provider changes the API routes.

Direct files: `server.js`. Subfolders: `config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `utils/`.

2026-11-14: Same-origin browser requests are allowed by host match for Vercel's shared-domain `/api/*` routing; the explicit `CORS_ORIGINS` allowlist remains for other approved origins and local development.
