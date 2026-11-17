# backend/src/routes routes

bookRoutes.js mounts public GET /, protected admin GET /admin, and protected POST /, PUT /:id, DELETE /:id under /api/books. Protected POST /cover (registered before /:id) accepts a raw JPG, PNG or WebP body up to 4 MB (400 on bad type or magic bytes, 413 when oversize) and returns 201 `{ success, url }`. server.js also serves stored local covers read-only at GET /api/uploads/covers/:file. authRoutes.js mounts POST /login and protected GET /me under /api/auth.
