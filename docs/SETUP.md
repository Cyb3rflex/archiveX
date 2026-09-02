# ArchiveX Admin Stack — Setup Guide

This guide sets up the **admin stack** (separate from the public landing page):
**Supabase** (database + auth + storage) → **Admin Backend** (`admin/backend/`) → **Admin Dashboard** (`admin/frontend/`)

For the public landing page setup, see the main `README.md`.

---

## Project Layout

```
archiveX/
├── client/                    # Public landing page (students)
├── server/                    # Public landing page API
├── admin/
│   ├── frontend/              # Admin dashboard (React)
│   └── backend/               # Admin API (Node + Express)  ← THIS GUIDE
└── docs/
```

The admin stack is **fully isolated** from the public stack:
- Separate Supabase project (recommended)
- Separate database, auth, and storage
- Different API base URL
- Different frontend on a different port

---

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a new project.
2. Note your project reference (e.g., `abc123xyz`).
3. Wait for the project to finish provisioning (~2 minutes).

## 2. Get Your Credentials

From **Project Settings → API**:
- `SUPABASE_URL` (Project URL)
- `SUPABASE_ANON_KEY` (anon public key)
- `SUPABASE_SERVICE_ROLE_KEY` (service_role secret) ⚠️ server-side only

From **Project Settings → Database → Connection string**:
- `DATABASE_URL` (Transaction mode, port 6543 — for runtime)
- `DIRECT_URL` (Session mode, port 5432 — for migrations)

## 3. Create the Storage Bucket

1. Go to **Storage** in your Supabase dashboard.
2. Click **New bucket** and name it `past-questions`.
3. **Uncheck** "Public bucket" (we'll use signed URLs).
4. Click **Create bucket**.

## 4. Configure the Admin Backend

```bash
cd admin/backend
cp .env.example .env
# Edit .env and fill in all values
```

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 5. Run Database Migrations

```bash
cd admin/backend
npm install
npx prisma migrate dev
npx prisma generate
```

## 6. Seed the Initial Super Admin

```bash
npm run seed
```

This creates a SUPER_ADMIN account in Supabase Auth and the corresponding `Admin` record in the database. Default credentials:
- Email: `admin@archivex.com`
- Password: `ChangeMe123!@#`

**Change the password immediately after first login!**

## 7. Start the Admin Backend

```bash
npm run dev
```

The admin API runs on `http://localhost:5001` by default. Health check: `http://localhost:5001/api/v1/health`.

## 8. Start the Admin Dashboard

```bash
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api/*` → `http://localhost:5001`.

Log in with your seed credentials.

---

## Port Allocation

| Service | Default Port |
|---------|--------------|
| Admin Backend (API) | **5001** |
| Admin Frontend (Vite) | **5173** |
| Public Backend (server/) | 5000 |
| Public Frontend (client/) | 5173 (change if both run together) |

If running admin + public stacks at the same time, change the public frontend port (or any other conflicting port).

---

## API Base URL

All admin API endpoints are under `/api/v1`:

| Endpoint | Auth | Description |
|----------|------|-------------|
| `POST /auth/login` | public | Login (rate limited) |
| `GET /auth/me` | admin | Current user |
| `POST /auth/logout` | admin | Logout |
| `GET /faculties` | public | List faculties |
| `POST /faculties` | SUPER_ADMIN | Create faculty |
| `GET /dashboard` | admin | Dashboard stats |
| `POST /past-questions` | admin | Upload PDF (rate limited) |
| `GET /download/:id` | public | Get signed download URL |
| `GET /preview/:id` | public | Get signed preview URL |

Full spec: see `docs/api-specification.md`.

---

## Security Stack

- ✅ JWT authentication (HS256, 7-day expiry)
- ✅ Supabase Auth for credential management (bcrypt)
- ✅ Role-Based Access Control (SUPER_ADMIN / ADMIN)
- ✅ Helmet security headers
- ✅ CORS (restricted to known origins)
- ✅ Rate limiting (global 100/min, auth 5/min, uploads 10/15min)
- ✅ Input validation (Zod schemas on all routes)
- ✅ File validation (PDF only, size-limited, MIME-checked)
- ✅ Audit logging (JSON lines to console)
- ✅ Stack traces never exposed
- ✅ No hardcoded secrets

---

## Troubleshooting

### "Missing required environment variable"
Fill in all variables in `admin/backend/.env`. The server fails fast on startup if any are missing.

### "Prisma client did not initialize"
Run `npx prisma generate` in `admin/backend/`.

### "Invalid login credentials"
Run `npm run seed` in `admin/backend/` to create the initial admin.

### "File too large"
Increase `MAX_FILE_SIZE_MB` in `.env` (default 10 MB).

### "Connection refused" on frontend
Check that the admin backend is running on `http://localhost:5001`. If you changed the port, update `VITE_API_PROXY_URL` in `admin/frontend/.env`.

### Vite proxy errors
Check that `VITE_API_PROXY_URL` in `admin/frontend/.env` matches the backend URL.
