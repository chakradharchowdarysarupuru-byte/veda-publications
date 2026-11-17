# src/app/admin/books status

Snapshot: 2026-11-17. Update after meaningful changes; this note is not a live runtime health check.

Catalogue management UI calls protected backend APIs; session token is stored in sessionStorage. The cover field has an "Upload cover" button (JPG, PNG or WebP, up to 4 MB, checked client-side and server-side) that fills the URL field, plus a preview thumbnail.

Direct files: `page.tsx`. No child folders.
