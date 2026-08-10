Project Vision

ArchiveX

Tagline:

Preserving Academic Knowledge, One Paper at a Time.

Mission

ArchiveX is a modern digital archive designed to preserve, organize, and provide easy access to university past examination questions.

It eliminates the need for students to rely on scattered WhatsApp groups, Telegram channels, or photocopies by providing a centralized platform where past questions are permanently stored, searchable, and accessible.

The platform is built with long-term sustainability in mind, allowing it to evolve into a complete academic resource hub while maintaining a strong focus on reliability, security, and data preservation.

Core Principles
1. Reliability

The platform should be available whenever students need it.

2. Simplicity

Students should find a past question in under 30 seconds.

3. Scalability

Every feature should be built so future versions can extend it without major rewrites.

4. Security

Only authorized administrators can upload, modify, or delete content.

5. Data Preservation

Academic resources should never be lost because of hardware failure, accidental deletion, or deployment issues.

6. Accessibility

The platform should work well on phones, tablets, and desktops, with fast performance even on slower internet connections.

Version 1 Scope
Student

✅ Browse faculties

✅ Browse departments

✅ Browse levels

✅ Browse semesters

✅ Browse courses

✅ Search courses

✅ Preview PDFs

✅ Download PDFs

Administrator

✅ Secure login

✅ Dashboard

✅ Manage faculties

✅ Manage departments

✅ Manage levels

✅ Manage semesters

✅ Manage courses

✅ Upload PDFs

✅ Edit PDFs

✅ Delete PDFs

Excluded from Version 1

These are intentionally postponed:

Student accounts
Bookmarks
Recently viewed
Comments
Ratings
AI study assistant
GPA calculator
Discussion forum
Lecture notes
Assignments
Notifications
Analytics dashboard
Multiple universities

Keeping V1 focused increases the chances of delivering a polished product.

Future Versions
Version 2
Student accounts
Favorites
Recently viewed
Download history
Upload requests
Version 3
Lecture notes
Handouts
Assignments
Books
Course outlines
Version 4
GPA calculator
Timetable
Academic calendar
AI study assistant
Practice quizzes
Discussion forum
Technology Decisions
Layer	Technology
Frontend	React + Vite
Styling	Tailwind CSS v4
Backend	Node.js + Express
ORM	Prisma
Database	Neon PostgreSQL
Storage	Cloudinary
Authentication	JWT + bcrypt
Frontend Hosting	Vercel
Backend Hosting	Render
Version Control	Git + GitHub
Backup Strategy

ArchiveX will follow the 3-2-1 Backup Rule:

3 copies of important data (live data + two backups).
2 different storage locations (for example, Neon backups and encrypted database dumps stored elsewhere).
1 off-site backup independent of the primary hosting platform.

This minimizes the risk of permanent data loss.

Security Principles
Passwords are hashed with bcrypt.
JWT authentication for administrators.
Role-Based Access Control (RBAC).
File type validation for uploads.
SQL injection protection through Prisma.
Rate limiting on sensitive endpoints.
Security headers with Helmet.
Input validation and sanitization.
Comprehensive audit logging for administrative actions (future enhancement).
Development Phases

We'll build ArchiveX in this order:

Project Planning & Documentation (current phase)
UI/UX Design
Database Design (Prisma Schema)
Backend API
Frontend
Admin Dashboard
Testing
Deployment
Backup & Disaster Recovery
Launch 🚀