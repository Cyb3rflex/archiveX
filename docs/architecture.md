# ArchiveX Architecture

## Overview

ArchiveX is designed as a modern, modular, and scalable web application following a three-tier architecture.

The architecture separates the presentation layer, business logic, and data layer, making the system easier to maintain, test, and extend.

The Version 1 architecture is intentionally lightweight while providing a strong foundation for future versions.

---

# Architectural Principles

ArchiveX is built around the following principles:

- Simplicity
- Scalability
- Reliability
- Security
- Maintainability
- Data Integrity
- Disaster Recovery

Every architectural decision should support one or more of these principles.

---

# High-Level Architecture

```
                 Student Browser
                        │
                        │
                React Frontend (Vite)
                        │
             HTTPS REST API Requests
                        │
                 Express.js Backend
                        │
      ┌─────────────────┴─────────────────┐
      │                                   │
Prisma ORM                        Cloudinary Storage
      │                                   │
Neon PostgreSQL                  PDF Documents
```

---

# Architecture Layers

## Presentation Layer

Technology

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion

Responsibilities

- Display user interface
- Browse archive
- Search courses
- Preview PDFs
- Download PDFs
- Administrator dashboard

The frontend must never communicate directly with the database.

---

## Application Layer

Technology

- Node.js
- Express.js

Responsibilities

- Business logic
- Authentication
- Authorization
- Request validation
- File upload
- Database communication
- Error handling

The backend serves as the single gateway between the frontend and the database.

---

## Data Layer

Technology

- Neon PostgreSQL
- Prisma ORM

Responsibilities

- Store academic information
- Store administrator accounts
- Store PDF metadata
- Maintain relationships
- Ensure data integrity

The database never stores PDF files.

Only metadata is stored.

---

## Storage Layer

Technology

- Cloudinary

Responsibilities

- Store PDF documents
- Deliver PDFs
- Secure uploaded files

The database stores only the Cloudinary URL.

---

# Request Flow

## Student

```
Student

↓

React

↓

Express API

↓

Prisma

↓

Neon Database

↓

Response

↓

React UI
```

---

## PDF Upload

```
Administrator

↓

Admin Dashboard

↓

Express API

↓

Cloudinary

↓

Receive File URL

↓

Store Metadata in Database

↓

Success Response
```

---

# Module Architecture

The backend is divided into independent modules.

```
Authentication

Faculty

Department

Level

Semester

Course

Past Question

Upload

Search

Admin
```

Each module is responsible for its own routes, controllers, services, and validation.

Modules should remain independent to reduce coupling.

---

# Folder Structure

## Frontend

```
client/

src/

assets/

components/

layouts/

pages/

hooks/

services/

context/

utils/

routes/

types/
```

---

## Backend

```
server/

src/

config/

controllers/

middlewares/

routes/

services/

prisma/

validators/

utils/

uploads/

app.js

server.js
```

---

# Authentication Architecture

ArchiveX uses JWT authentication.

Authentication flow

```
Admin Login

↓

Verify Password

↓

Generate JWT

↓

Return Token

↓

Protected Requests

↓

Verify Token

↓

Grant Access
```

Only authenticated administrators may access protected endpoints.

---

# Error Handling

ArchiveX follows centralized error handling.

Errors are processed by a single middleware responsible for:

- Logging
- Formatting responses
- Returning appropriate HTTP status codes

Example

```
404 Not Found

400 Bad Request

401 Unauthorized

403 Forbidden

500 Internal Server Error
```

---

# Logging Strategy

Administrative activities should be logged.

Version 1 includes

- Login
- Upload
- Edit
- Delete

Future versions may include a dedicated audit log.

---

# Backup Architecture

ArchiveX follows the 3-2-1 Backup Strategy.

## Database

- Scheduled backups
- Backup verification
- Recovery documentation

## PDF Files

Primary

Cloudinary

Future Backup

Secondary storage provider

## Source Code

Primary

GitHub Repository

Secondary

Local development machine

---

# Disaster Recovery

ArchiveX is designed so that no single failure permanently destroys academic resources.

Recovery priorities

1. Database
2. PDF Files
3. Backend
4. Frontend

Application servers can always be redeployed.

Academic data must never be lost.

---

# Security Architecture

Security measures include

- JWT Authentication
- Password hashing with bcrypt
- Prisma ORM
- Helmet
- CORS
- Rate Limiting
- Request Validation
- File Validation

Only PDF files are accepted.

---

# Scalability

The architecture supports future modules without major redesign.

Possible future modules include

- Student Accounts
- Lecture Notes
- Assignment Repository
- GPA Calculator
- AI Study Assistant
- Academic Calendar
- Discussion Forum

These modules should integrate through independent services while preserving the existing architecture.

---

# Design Philosophy

ArchiveX is designed as a long-term digital archive for preserving academic resources.

Every architectural decision should prioritize:

- Reliability
- Simplicity
- Performance
- Security
- Scalability
- Data Preservation

Short-term convenience must never compromise long-term maintainability.