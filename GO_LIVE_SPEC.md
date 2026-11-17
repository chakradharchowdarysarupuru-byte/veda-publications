# Go-live spec: Supabase + Vercel

**Status:** Approved 14 Nov 2026: personal accounts, `vercel.app` first, `books.json` is the full catalogue (step 4 uses `import:books`); admin add/remove stays.
**Builds on:** `SUPABASE_MIGRATION_SPEC.md` (data model, RLS, acceptance criteria stay as written).

## Outcome

The catalogue and Chief Editor admin run live on Vercel, backed by Supabase. The Chief Editor signs in at `/admin/login`. MongoDB leaves production.

## Stack

| Part | Host | Notes |
|---|---|---|
| Next.js site | Vercel project (service root `.`) | Public site; browser calls use same-origin `/api` |
| Express API | Vercel project (service root `backend`) | Public only via `/api/*`; one Vercel function |
| Database and covers | Supabase, Mumbai (`ap-south-1`) | Free tier; backend-only secret key; public `book-covers` Storage bucket |

## Work

1. **Supabase project.** Create the project, apply all migrations in `backend/supabase/migrations/` in order (the last creates the `book-covers` bucket), and check that browser roles can't read either table.
2. **Login rate limit table.** The limiter lives in server memory, which resets per Vercel instance. Add a `login_attempts` table (IP hash, count, reset time) and use it when `DATABASE_PROVIDER=supabase`. Login behaviour stays: 8 attempts per 15 minutes.
3. **Express on Vercel.** Export the app from `server.js`, calling `listen` only locally; connect once per cold start; set `trust proxy` for real IPs. Docker Compose still works locally.
4. **Data.** Local MongoDB is the only Mongo copy. If it holds edits, back it up and run `migrate:supabase --execute --backup-confirmed`. If not, run `import:books` against Supabase from `backend/data/books.json` (15 titles). Check counts and IDs either way.
5. **Admin login.** The owner types `CHIEF_EDITOR_EMAIL`, `CHIEF_EDITOR_PASSWORD` (12–72 characters) and `CHIEF_EDITOR_NAME` into the backend environment; Claude never sees them. Run `seed:editor` once against Supabase, then remove the password variable from Vercel; the bcrypt hash suffices.
6. **Vercel env.** Set backend service variables: `DATABASE_PROVIDER=supabase`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `JWT_SECRET` (32+ bytes). Optional `COVER_BUCKET` (default `book-covers`). Same-origin requests need no frontend API URL or CORS allowlist. Secrets go only into the Vercel dashboard; Claude never asks for values.
7. **Verify on a preview deploy.** Only published books are public; login works and a wrong password fails; create, edit, delete and cover upload work; bad tokens are rejected; no Supabase key is in the browser bundle.
8. **Promote to production.** Retire MongoDB from production config; keep the code path and backup 30 days for rollback.

## Not in scope

Supabase Auth (Storage is in scope for book covers only, approved 17 Nov 2026), orders and checkout, a second admin, email password reset (re-run the seed script), and custom domain DNS unless named.

## Owner decisions needed

1. Which accounts own it: personal GitHub, Vercel and Supabase, or the Vandorio ones? Default: personal.
2. Custom domain now, or `*.vercel.app` first?
3. Does local MongoDB hold admin edits, or is `books.json` the full catalogue?

## Gates

Creating the Supabase and Vercel projects, pushing, and the production deploy each need a go-ahead. Code changes and the preview deploy proceed under this approval.
