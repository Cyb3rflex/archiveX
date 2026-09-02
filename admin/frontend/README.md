# ArchiveX Admin Dashboard

The administrative interface for **ArchiveX** — a digital archive for university past examination questions.

This dashboard is used by administrators to manage faculties, departments, levels, semesters, courses, past question PDFs, and administrator accounts.

---

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **React Router DOM** — Client-side routing
- **Tailwind CSS v4** — Utility-first styling
- **Lucide React** — Icon library

---

## Project Structure

```
src/
├── App.jsx                       # Root component with router
├── main.jsx                      # Entry point
├── index.css                     # Global styles + design tokens
├── context/
│   └── AuthContext.jsx           # Authentication state
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx    # Route guard
│   ├── layout/
│   │   ├── Layout.jsx            # Sidebar + main layout
│   │   └── Header.jsx            # Top bar with user info
│   ├── dashboard/
│   │   ├── RecentActivity.jsx    # Recent uploads list
│   │   └── QuickActions.jsx      # Quick action shortcuts
│   └── ui/
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── EmptyState.jsx
│       ├── Input.jsx
│       ├── LoadingState.jsx
│       ├── Modal.jsx
│       ├── SearchBar.jsx
│       ├── Select.jsx
│       └── StatCard.jsx
└── pages/
    ├── auth/
    │   └── Login.jsx
    ├── Dashboard.jsx
    ├── Faculties.jsx
    ├── Departments.jsx
    ├── Levels.jsx
    ├── Semesters.jsx
    ├── Courses.jsx
    ├── PastQuestions.jsx
    └── Users.jsx                 # Super Admin only
```

---

## Features

### Authentication
- Secure login form
- JWT-based session management
- Protected routes
- Logout

### Dashboard
- Summary statistics (Faculties, Departments, Courses, Past Questions)
- Recent uploads list
- Quick action shortcuts
- Branded summary card

### Entity Management (CRUD)
- **Faculties** — Create, edit, delete, search
- **Departments** — Create, edit, delete, search (with faculty filter)
- **Levels** — Create, edit, delete, search
- **Semesters** — Create, edit, delete, search
- **Courses** — Create, edit, delete, search (with all related entities)
- **Past Questions** — Upload PDF, edit metadata, delete, search
- **Administrators** — Create admins, manage roles (Super Admin only)

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Collapsible sidebar on mobile
- Loading & empty states
- Success & error notifications
- Search bars on every list page
- Modal-based forms
- Smooth animations & transitions
- Accessible focus states

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Environment

The dashboard expects a backend API at `/api/v1` (configured in the AuthContext). For local development, the Vite dev server proxies `/api/*` requests to the backend.

For demo purposes, the login accepts any credentials and falls back to a mock admin user.

---

## Design System

Colors, typography, and other design tokens are defined in `src/index.css` as CSS custom properties. The dashboard follows the ArchiveX UI/UX guidelines (Inter font, blue primary color, accessible contrast, soft rounded corners).

---

## License

MIT — same as the parent ArchiveX project.
