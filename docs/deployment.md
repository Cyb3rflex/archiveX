# Deployment Guide

## Overview

ArchiveX is deployed as a modern cloud-native web application.

The frontend, backend, database, and file storage are deployed independently to improve scalability, maintainability, and reliability.

---

# Production Architecture

```
Users
   │
   ▼
Vercel (Frontend)
   │
   ▼
Render (Backend API)
   │
   ├──────────────┐
   ▼              ▼
Neon         Cloudinary
Database     PDF Storage
```

---

# Services

## Frontend

Platform

- Vercel

Responsibilities

- Serve the React application
- Static asset delivery
- HTTPS
- CDN

---

## Backend

Platform

- Render

Responsibilities

- REST API
- Authentication
- Business Logic
- Database Communication
- File Upload

---

## Database

Platform

- Neon PostgreSQL

Responsibilities

- Store application data
- Maintain relationships
- Ensure data integrity

---

## File Storage

Platform

- Cloudinary

Responsibilities

- Store PDF files
- Deliver PDFs
- File optimization

---

# Environment Variables

## Frontend

- VITE_API_URL

---

## Backend

- DATABASE_URL
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PORT
- NODE_ENV

---

# Deployment Workflow

1. Push changes to GitHub.
2. Vercel deploys the frontend.
3. Render deploys the backend.
4. Run Prisma migrations if required.
5. Verify deployment.
6. Monitor logs.

---

# Health Checks

Before each release, verify:

- API is online.
- Database connection is successful.
- Cloudinary upload works.
- PDF preview works.
- PDF download works.
- Authentication works.

---

# Rollback Plan

If deployment fails:

1. Roll back to the previous stable version.
2. Verify API functionality.
3. Verify database integrity.
4. Verify file accessibility.
5. Redeploy after resolving the issue.

---

# Monitoring

Monitor:

- API uptime
- Response times
- Deployment logs
- Database health
- Storage usage

---

# Security Checklist

Before production:

- HTTPS enabled
- Environment variables configured
- JWT secret secured
- CORS configured
- Rate limiting enabled
- Helmet enabled
- Debug mode disabled

---

# Deployment Philosophy

Every deployment should be safe, repeatable, and recoverable.

No deployment should place user data at risk.