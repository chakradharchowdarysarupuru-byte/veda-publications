# src/lib status

Snapshot: 2026-10-22. Update after meaningful changes; this note is not a live runtime health check.

Contains API base-path configuration, publisher contacts/enquiry URL builders, and duplicate synopsis detection.

2026-11-14: The API helper now uses the same-origin `/api` path so browser requests follow the Vercel service rewrite rather than a build-time API hostname.

Direct files: `api.ts`, `bookContact.ts`, `bookText.ts`. No child folders.
