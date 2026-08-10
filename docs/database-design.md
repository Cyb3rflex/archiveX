# Database Design

## Overview

ArchiveX uses a relational database built on PostgreSQL (Neon) and managed through Prisma ORM.

The database is designed using normalization principles to minimize redundancy, maintain data integrity, and support future scalability.

Version 1 stores only metadata about uploaded files. PDF documents themselves are stored in Cloudinary.

---

# Database Design Principles

The ArchiveX database follows these principles:

- Normalized structure
- Strong referential integrity
- Minimal data duplication
- Future scalability
- Consistent naming conventions
- Secure data storage

---

# Entity Relationship

The academic hierarchy follows this structure:

```
Faculty
    │
    ▼
Department
    │
    ▼
Course
    │
    ├──────────────┐
    ▼              ▼
Level         Semester
    │              │
    └──────┬───────┘
           ▼
    Past Question
```

---

# Tables

## Faculty

Represents a faculty within the university.

Example

- Faculty of Communication and Information Sciences
- Faculty of Engineering

Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| name | String | Faculty name |
| slug | String | URL-friendly name |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update |

---

## Department

Represents an academic department.

Example

- Computer Science
- Information and Communication Science

Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| facultyId | UUID | References Faculty |
| name | String | Department name |
| slug | String | URL slug |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update |

Relationship

One Faculty → Many Departments

---

## Level

Represents academic level.

Examples

- 100 Level
- 200 Level
- 300 Level
- 400 Level
- 500 Level

Fields

| Field | Type |
|--------|------|
| id | UUID |
| name | String |

---

## Semester

Represents an academic semester.

Examples

- First Semester
- Second Semester

Fields

| Field | Type |
|--------|------|
| id | UUID |
| name | String |

---

## Course

Represents a university course.

Examples

- CSC101
- CSC214
- MAT111

Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| departmentId | UUID | Department |
| levelId | UUID | Level |
| semesterId | UUID | Semester |
| courseCode | String | CSC214 |
| courseTitle | String | Operating Systems |
| slug | String | URL slug |
| createdAt | DateTime | Timestamp |
| updatedAt | DateTime | Timestamp |

Relationship

One Department → Many Courses

One Level → Many Courses

One Semester → Many Courses

---

## PastQuestion

Stores metadata for uploaded PDFs.

The actual PDF is stored in Cloudinary.

Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| courseId | UUID | Related course |
| session | String | Example: 2024/2025 |
| year | Integer | 2025 |
| examType | String | CA, Mid Semester, Final |
| fileName | String | Original filename |
| fileUrl | String | Cloudinary URL |
| fileSize | Integer | Size in bytes |
| downloads | Integer | Download count |
| uploadedBy | UUID | Admin ID |
| createdAt | DateTime | Upload date |
| updatedAt | DateTime | Last update |

Relationship

One Course → Many Past Questions

---

## Admin

Stores administrator accounts.

Fields

| Field | Type |
|--------|------|
| id | UUID |
| fullName | String |
| email | String |
| password | String |
| role | Enum |
| createdAt | DateTime |
| updatedAt | DateTime |

Roles

- SUPER_ADMIN
- ADMIN

---

# Relationships

Faculty

```
1 Faculty

↓

Many Departments
```

Department

```
1 Department

↓

Many Courses
```

Course

```
1 Course

↓

Many Past Questions
```

Level

```
1 Level

↓

Many Courses
```

Semester

```
1 Semester

↓

Many Courses
```

Admin

```
1 Admin

↓

Many Uploaded Past Questions
```

---

# Constraints

The following constraints must be enforced.

Faculty

- Faculty name must be unique.

Department

- Department name must be unique within a faculty.

Course

The combination of:

- courseCode
- levelId
- semesterId
- departmentId

must be unique.

This prevents duplicate courses.

Past Question

The combination of:

- courseId
- session
- examType

must be unique.

This prevents duplicate uploads of the same examination.

Admin

Email addresses must be unique.

---

# Indexing Strategy

Indexes improve search performance.

Indexes should be created for:

Faculty

- slug

Department

- facultyId
- slug

Course

- courseCode
- courseTitle
- departmentId
- levelId
- semesterId

PastQuestion

- courseId
- session
- year

Admin

- email

---

# File Storage Strategy

ArchiveX does not store PDF documents inside PostgreSQL.

Instead:

```
PDF

↓

Cloudinary

↓

Returns URL

↓

URL stored in Database
```

This keeps the database lightweight and improves performance.

---

# Naming Conventions

Tables

Use singular names.

Example

- Faculty
- Department
- Course

Columns

Use camelCase.

Examples

- courseCode
- createdAt
- fileUrl

Primary Keys

Use

id

Foreign Keys

Use

facultyId

departmentId

courseId

---

# Soft Delete Policy

Version 1 will use permanent deletion.

Future versions may introduce soft deletes using:

deletedAt

for data recovery and auditing.

---

# Future Database Expansion

The schema is designed to allow future tables without breaking existing relationships.

Possible future tables include:

- Student
- Bookmark
- LectureNote
- Assignment
- CourseOutline
- Announcement
- Notification
- Discussion
- Comment
- AIConversation
- AuditLog

These tables can be added independently while preserving the existing architecture.

---

# Summary

The ArchiveX database is designed to be:

- Reliable
- Secure
- Normalized
- Scalable
- Easy to maintain
- Ready for future expansion

It provides a strong foundation for Version 1 while allowing ArchiveX to grow into a comprehensive academic resource platform in future releases.