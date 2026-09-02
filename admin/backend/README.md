# ArchiveX Admin Backend

REST API for the **ArchiveX Admin Dashboard**. Manages authentication, faculties, departments, levels, semesters, courses, past question PDFs, and administrator accounts.

Built with **Node.js + Express + Prisma + Supabase** (Postgres + Auth + Storage).

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Generate Prisma client + run migrations
npx prisma generate
npx prisma migrate dev

# 4. Seed the initial super admin
npm run seed

# 5. Start
npm run dev
```

Server runs on `http://localhost:5001`. Health: `http://localhost:5001/api/v1/health`.

See `docs/SETUP.md` for the full setup walkthrough.

---

## Project Structure

```
src/
├── server.js                 # Entry point
├── app.js                    # Express app factory
├── config/
│   ├── env.js                # Environment validation
│   ├── supabase.js           # Public Supabase client (browser-side)
│   └── database.js           # Prisma singleton
├── lib/
│   ├── jwt.js                # JWT sign/verify
│   └── supabase-admin.js     # Supabase service-role client (server-side)
├── middlewares/
│   ├── authenticate.js       # JWT verification
│   ├── authorize.js          # Role-based access control
│   ├── rateLimiter.js        # Rate limiting (auth, upload, general)
│   ├── validate.js           # Zod request validation
│   ├── upload.js             # PDF file upload (Multer)
│   ├── error-handler.js      # Centralized error response
│   └── not-found.js          # 404 handler
├── controllers/
│   ├── auth.controller.js         # Login, logout, current user
│   ├── faculty.controller.js      # Faculty CRUD
│   ├── department.controller.js   # Department CRUD
│   ├── level.controller.js        # Level CRUD
│   ├── semester.controller.js     # Semester CRUD
│   ├── course.controller.js       # Course CRUD
│   ├── pastQuestion.controller.js # PDF upload + CRUD
│   ├── dashboard.controller.js    # Stats
│   ├── search.controller.js       # Search
│   ├── file.controller.js         # Signed URLs
│   └── health.controller.js       # Health check
├── routes/                   # All route modules
├── services/
│   ├── storage.service.js    # Supabase Storage wrapper
│   └── audit.service.js      # Audit logging
└── utils/
    ├── api-response.js       # Response envelope helpers
    ├── app-error.js          # Custom error class
    └── validators/           # Zod schemas
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/auth/login` | public | Login (rate limited: 5/min) |
| `POST` | `/api/v1/auth/logout` | admin | Logout |
| `GET` | `/api/v1/auth/me` | admin | Current user |
| `GET` | `/api/v1/faculties` | public | List faculties |
| `GET` | `/api/v1/faculties/:id` | public | Get one faculty |
| `POST` | `/api/v1/faculties` | SUPER_ADMIN | Create faculty |
| `PATCH` | `/api/v1/faculties/:id` | SUPER_ADMIN | Update faculty |
| `DELETE` | `/api/v1/faculties/:id` | SUPER_ADMIN | Delete faculty |
| `GET` | `/api/v1/departments` | public | List departments |
| `POST` | `/api/v1/departments` | ADMIN+ | Create department |
| `PATCH` | `/api/v1/departments/:id` | ADMIN+ | Update department |
| `DELETE` | `/api/v1/departments/:id` | ADMIN+ | Delete department |
| `GET` | `/api/v1/levels` | public | List levels |
| `GET` | `/api/v1/semesters` | public | List semesters |
| `GET` | `/api/v1/courses` | public | List courses (with filters) |
| `GET` | `/api/v1/courses/:id` | public | Get one course |
| `POST` | `/api/v1/courses` | ADMIN+ | Create course |
| `PATCH` | `/api/v1/courses/:id` | ADMIN+ | Update course |
| `DELETE` | `/api/v1/courses/:id` | ADMIN+ | Delete course |
| `GET` | `/api/v1/past-questions` | public | List past questions |
| `GET` | `/api/v1/past-questions/:id` | public | Get one |
| `POST` | `/api/v1/past-questions` | ADMIN+ | Upload PDF (rate limited: 10/15min) |
| `PATCH` | `/api/v1/past-questions/:id` | ADMIN+ | Update metadata |
| `DELETE` | `/api/v1/past-questions/:id` | ADMIN+ | Delete (file + DB) |
| `GET` | `/api/v1/dashboard` | admin | Aggregate stats + recent uploads |
| `GET` | `/api/v1/search?q=` | public | Search courses |
| `GET` | `/api/v1/download/:id` | public | Get signed download URL |
| `GET` | `/api/v1/preview/:id` | public | Get signed preview URL |
| `GET` | `/api/v1/health` | public | Health check |

---

## Security

| Feature | Implementation |
|---------|---------------|
| Auth | JWT (HS256) — `Authorization: Bearer <token>` |
| Password | Supabase Auth (bcrypt) |
| RBAC | `ADMIN` and `SUPER_ADMIN` roles |
| Rate limiting | express-rate-limit (auth, upload, global) |
| Validation | Zod on all incoming data |
| File validation | PDF only (MIME + extension) |
| Security headers | Helmet |
| CORS | Restrictive origin allowlist |
| Audit log | JSON to console (pipe to Datadog/CloudWatch) |
| Error handling | Stack traces never sent to client |

---

## Scripts

```bash
npm run dev                  # Start with nodemon
npm start                    # Start with node
npm run seed                 # Seed initial super admin
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate       # Run dev migrations
npm run prisma:migrate:deploy # Run production migrations
npm run prisma:studio        # Open Prisma Studio
```

---

## License

MIT — same as the parent ArchiveX project.
