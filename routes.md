# Repository routes

## Frontend
- / — homepage, catalogue categories, About, submission guidance, and contact.
- /books — searchable/filterable published catalogue with abstract dialogs.
- /books/[id] — legacy segment redirects to /books.
- /calls — current call for chapters and edited volumes (all themes plus an email enquiry). Content is fixed in `src/lib/calls.ts`; Chief Editor editing is planned for a later phase.
- /admin/login — Chief Editor sign-in.
- /admin/books — Chief Editor catalogue management.
- /login — redirects to /admin/login.
- /cart and /checkout — redirect to /books; no order flow is implemented.
- Legacy WordPress links (`/?page_id=N`, `/?p=N`, `/index.php`) — 308 redirects in `src/proxy.ts`: About→/#about, Contact→/#contact, Publications→/books, ISBN pages→/#submissions, Call for chapters→/calls.

## Backend API (port 5000 in container; host port 5001 in local Compose)
- Vercel routes `/api/*` to the backend service; all other public paths go to the frontend service.
- GET / — API health response.
- GET /api/books — published books.
- GET /api/books/admin — all books; Chief Editor JWT required.
- POST /api/books, PUT /api/books/:id, DELETE /api/books/:id — protected catalogue management.
- POST /api/auth/login — Chief Editor sign-in.
- GET /api/auth/me — protected Chief Editor identity.
