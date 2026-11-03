# Home-Care Central Control System – Backend (Phase 1 + Milestone 2)

Node.js + Express + PostgreSQL. Five roles: Admin, HR, Staff (office), Caregiver (field) and Client.

## Quick start

```bash
cp .env.example .env        # set DATABASE_URL and a long random JWT_ACCESS_SECRET
createdb homecare_central   # or create the database any way you like
npm install
npm run db:setup            # runs migrations + seeds roles, permissions, first admin
npm run dev                 # http://localhost:5000
npm run test:smoke          # (with the server running) 43 end-to-end checks
```

`npm run db:setup` creates default accounts (set in `.env`, existing accounts are never overwritten):

| Role | Email | Password |
|---|---|---|
| Admin | `admin@homecare.local` | `Admin@12345` |
| HR | `hr@homecare.local` | `Hr@12345678` |
| Staff (office) | `staff@homecare.local` | `Staff@12345` |
| Caregiver | `caregiver@homecare.local` | `Caregiver@12345` |
| Client | `client@homecare.local` | `Client@12345` |

**Change these passwords before deploying.** Set `SEED_DEFAULT_USERS=false` to skip the default HR, staff, caregiver and client.

## Structure

```
src/
  config/        env + Postgres pool
  db/            migrate.js, seed.js, migrations/001_foundation.sql
  middleware/    authenticate, authorize (roles/permissions), validate, errorHandler
  modules/       one folder per feature: auth, users, dashboard, _template (for Phase 2)
  utils/         constants, ApiError, token helpers
  routes.js      central route registry
  app.js / server.js
scripts/smoke-test.js
```

## Database

| Table | Purpose |
|---|---|
| `roles` | `client`, `staff`, `caregiver`, `admin`, `hr` |
| `permissions`, `role_permissions` | Permission codes per role (login, dashboard access, user management) |
| `users` | email (case-insensitive unique), bcrypt hash, role, `is_active`, `last_login_at` |
| `profiles` | 1:1 with users: name, phone, DOB, address fields, avatar |
| `sessions` | Refresh sessions (SHA-256 hashed token, expiry, revoked flag) |
| `schema_migrations` | Applied migration files |

New modules add a numbered file in `src/db/migrations/` (see `src/modules/_template/README.md`).

## Authentication

- Password hashing: bcrypt (12 rounds).
- Login sets two **httpOnly** cookies: a 15-minute access JWT and a 7-day opaque refresh token (path `/api/auth`).
- `POST /api/auth/refresh` rotates the refresh token. Reusing an old one revokes all of that user's sessions.
- Each request re-checks the user in the DB, so deactivation or a role change applies immediately.
- `Authorization: Bearer <accessToken>` is also accepted (API clients / testing).
- Login is rate-limited (20 attempts / 15 min / IP).

## API

All responses: `{ success, data? , message?, errors? }`.

| Method | Path | Access |
|---|---|---|
| POST | `/api/auth/login` `{email,password}` → user + `redirectTo` | public |
| POST | `/api/auth/refresh` | refresh cookie |
| POST | `/api/auth/logout` | any |
| GET | `/api/auth/me` | logged in |
| GET | `/api/dashboard/client` | client only |
| GET | `/api/dashboard/staff` | staff only (office overview) |
| GET | `/api/dashboard/caregiver` | caregiver only |
| GET | `/api/dashboard/admin` | admin only |
| GET | `/api/admin/users?role=&isActive=&search=&page=&limit=` | admin |
| POST | `/api/admin/users` | admin |
| GET | `/api/admin/users/:id` | admin |
| PATCH | `/api/admin/users/:id` (role, isActive, password, profile fields) | admin |
| GET | `/api/health` | public |

`redirectTo` values: `/client/dashboard`, `/staff/dashboard`, `/caregiver/dashboard`, `/hr/dashboard`, `/admin/dashboard`.

Dashboard endpoints return the placeholder text, e.g. `Welcome Client – Phase 1 Placeholder`.

## Decisions to confirm with the client

- **No self-registration.** Admins create further client/staff/caregiver accounts from the Users page (or `/api/admin/users`).
- Each portal dashboard is strictly separate (an admin does not get the client dashboard).
- Production: set `NODE_ENV=production` (secure, SameSite=None cookies, HTTPS required), a strong
  `JWT_ACCESS_SECRET`, and `CLIENT_ORIGIN` to the real frontend URL.


---

## Milestone 2 (HR, caregivers, clients, scheduling)

Everything below lives in the same project; Phase 1 login, roles and users are unchanged.

**New role:** `hr` (lands on `/hr/dashboard`). Seeded: `hr@homecare.local` / `Hr@12345678`.

**Upgrade an existing Phase 1 database:** `npm install && npm run db:setup` (applies `002_milestone2_*.sql`; existing users are kept).

**Flow:** public application -> HR stages (applied, screening, interview, offer, hired/rejected) -> HR clicks hire -> a caregiver login (role `caregiver`) is created automatically with the default password `Test@1234` (the caregiver should change it after the first login) -> Admin schedules visits -> caregiver sees schedule, adds notes, marks visits completed -> clients see their visits and care plan.

| Area | Endpoints (all under `/api`) |
|---|---|
| Public | `GET /recruitment/options`, `POST /recruitment/applications` (multipart: resume, cprFirstAid, policeCheck, governmentId, certifications), `POST /auth/set-password` |
| HR/Admin | `/hr/applicants` (list, detail, `PATCH :id/status`, notes, documents, `POST :id/hire`), `/caregivers` (detail, availability, service-areas, certifications, documents) |
| Admin | `/clients` (+ `/clients/:id/care-plans`), `/visits` |
| Caregiver | `/caregiver/visits` (list, detail, notes, complete) |
| Client | `/client/visits`, `/client/care-plan` |
| Dashboards | `/dashboard/admin`, `/hr`, `/staff`, `/caregiver`, `/client` |

**Files:** PDF, JPG, PNG only, max 10 MB (`MAX_FILE_MB`), checked by extension and file signature, stored privately in `storage/` and only downloadable by logged-in HR/Admin.

**Email:** email notifications are not part of this release (a later, separate task).

**Scheduling rules:** only Admin creates/changes visits; the database refuses to double-book a caregiver; availability and service-area mismatches return a non-blocking `warnings` list; there is no clock-in/out.

**Tests:** start the API with `NODE_ENV=test npm start` (rate limits are off), then `npm run test:smoke` (Phase 1) and `npm run test:m2` (Milestone 2).

**Postman:** `postman/HomeCare-Milestone2.postman_collection.json`.
