# API Specification

## Overview

ArchiveX exposes a RESTful API that enables communication between the frontend, backend, and database.

All endpoints return JSON unless otherwise specified.

The API follows REST principles, uses HTTPS in production, and employs JWT authentication for protected endpoints.

---

# Base URL

Development

```
http://localhost:5000/api/v1
```

Production

```
https://your-domain.com/api/v1
```

---

# Response Format

## Success Response

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong.",
  "errors": []
}
```

---

# Authentication

Version 1 requires authentication only for administrators.

Students can browse, search, preview, and download resources without logging in.

Protected endpoints require a valid JWT.

Authorization Header

```
Authorization: Bearer <token>
```

---

# Authentication Endpoints

## POST /auth/login

Description

Authenticate an administrator.

Authentication

Public

Request

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Success

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

## POST /auth/logout

Description

Invalidate the current session on the client.

Authentication

Protected

---

# Faculty Endpoints

## GET /faculties

Returns all faculties.

Authentication

Public

---

## GET /faculties/:id

Returns a single faculty.

Authentication

Public

---

## POST /faculties

Create a faculty.

Authentication

Super Admin

---

## PATCH /faculties/:id

Update faculty.

Authentication

Super Admin

---

## DELETE /faculties/:id

Delete faculty.

Authentication

Super Admin

---

# Department Endpoints

## GET /departments

Return all departments.

Public

---

## GET /departments/:id

Return one department.

Public

---

## POST /departments

Create department.

Protected

---

## PATCH /departments/:id

Update department.

Protected

---

## DELETE /departments/:id

Delete department.

Protected

---

# Level Endpoints

## GET /levels

Return all levels.

Public

---

## POST /levels

Create level.

Protected

---

## PATCH /levels/:id

Update level.

Protected

---

## DELETE /levels/:id

Delete level.

Protected

---

# Semester Endpoints

## GET /semesters

Return all semesters.

Public

---

## POST /semesters

Create semester.

Protected

---

## PATCH /semesters/:id

Update semester.

Protected

---

## DELETE /semesters/:id

Delete semester.

Protected

---

# Course Endpoints

## GET /courses

Return all courses.

Supports filters.

Query Parameters

```
department

level

semester

search
```

Example

```
/courses?department=computer-science&level=100&semester=first
```

---

## GET /courses/:id

Return a course.

Public

---

## POST /courses

Create course.

Protected

---

## PATCH /courses/:id

Update course.

Protected

---

## DELETE /courses/:id

Delete course.

Protected

---

# Past Question Endpoints

## GET /past-questions

Returns available past questions.

Supports filters.

Query Parameters

```
course

session

year

examType
```

---

## GET /past-questions/:id

Returns metadata for a past question.

Public

---

## POST /past-questions

Upload a PDF.

Protected

Multipart Form Data

```
pdf

courseId

session

year

examType
```

---

## PATCH /past-questions/:id

Update metadata.

Protected

---

## DELETE /past-questions/:id

Delete past question.

Protected

---

# Search Endpoint

## GET /search

Search across available courses.

Example

```
/search?q=CSC214
```

Returns

Matching courses.

---

# Dashboard Endpoint

## GET /dashboard

Returns administrator dashboard statistics.

Authentication

Protected

Example Response

```json
{
  "faculties": 12,
  "departments": 48,
  "courses": 356,
  "pastQuestions": 2401
}
```

---

# File Download

## GET /download/:id

Downloads the requested PDF.

Public

---

# PDF Preview

## GET /preview/:id

Returns the PDF for browser preview.

Public

---

# Health Check

## GET /health

Returns server health.

Example

```json
{
  "status": "OK"
}
```

Useful for deployment monitoring.

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|OK|
|201|Created|
|204|No Content|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|422|Validation Error|
|500|Internal Server Error|

---

# API Versioning

ArchiveX uses URL versioning.

Current Version

```
/api/v1
```

Future versions

```
/api/v2
```

```
/api/v3
```

Older versions remain available during migration periods.

---

# Rate Limiting

Authentication endpoints

Maximum

```
5 login attempts

per minute

per IP
```

Public API

Rate limiting may be introduced in future releases.

---

# Validation

Every incoming request must be validated.

Examples

- Required fields
- Invalid UUIDs
- Invalid email addresses
- Invalid PDF uploads
- Invalid query parameters

---

# Security

The API must implement

- JWT Authentication
- Password Hashing
- Helmet
- CORS
- Rate Limiting
- Input Validation
- File Validation
- Secure HTTP Headers

---

# Future API Modules

Future versions may expose additional endpoints for

- Student Accounts
- Bookmarks
- Notifications
- Lecture Notes
- Assignments
- AI Assistant
- GPA Calculator
- Discussion Forum

The Version 1 API is intentionally minimal while remaining extensible.