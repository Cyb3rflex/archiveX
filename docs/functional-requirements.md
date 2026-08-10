ArchiveX Functional Requirements (Version 1.0)
1. Introduction

This document defines the functional requirements for ArchiveX Version 1.0.

The objective of Version 1 is to provide a centralized digital archive where students can browse, preview, and download past examination questions, while allowing administrators to manage academic resources efficiently.

2. User Roles

ArchiveX Version 1 has three roles.

Student

Can:

Browse faculties
Browse departments
Browse levels
Browse semesters
Browse courses
Search courses
Preview PDFs
Download PDFs

Cannot:

Upload files
Edit records
Delete records
Access the admin dashboard
Administrator

Can:

Login securely
Access Admin Dashboard
Manage courses
Upload PDFs
Edit PDFs
Delete PDFs
View upload history

Cannot:

Create other administrators
Modify system settings
Super Administrator

Has full access.

Can:

Manage administrators
Manage faculties
Manage departments
Manage all uploaded resources
Configure system settings
3. Student Requirements
FR-001

The system shall allow students to browse faculties.

FR-002

The system shall allow students to browse departments within a faculty.

FR-003

The system shall allow students to browse levels.

Example:

100 Level
200 Level
300 Level
400 Level
500 Level
FR-004

The system shall allow students to browse semesters.

First Semester

Second Semester
FR-005

The system shall display all available courses.

Example:

CSC101

CSC102

MAT111

PHY101
FR-006

Students shall be able to search using:

Course Code
Course Title

Examples:

CSC214

Operating Systems

Database

Calculus
FR-007

The system shall display all available past questions for a selected course.

Example

CSC214

2021

2022

2023

2024
FR-008

Students shall be able to preview PDFs directly in the browser.

FR-009

Students shall be able to download PDFs.

FR-010

The system shall display file information.

Example

Year

Session

File Size

Upload Date
4. Administrator Requirements
FR-011

Administrators shall authenticate before accessing the dashboard.

FR-012

Administrators shall manage faculties.

Operations:

Create
Update
Delete
FR-013

Administrators shall manage departments.

FR-014

Administrators shall manage levels.

FR-015

Administrators shall manage semesters.

FR-016

Administrators shall manage courses.

Operations:

Create
Update
Delete
FR-017

Administrators shall upload PDF files.

Accepted format:

PDF only
FR-018

Administrators shall edit uploaded records.

FR-019

Administrators shall delete uploaded records.

FR-020

The system shall record:

Upload date
Uploaded by
File size
5. Super Administrator Requirements
FR-021

Create administrators.

FR-022

Suspend administrators.

FR-023

Delete administrators.

FR-024

Manage system settings.

6. Search Requirements

The search engine shall support:

Partial search

Example:

Searching

CSC

returns

CSC101

CSC201

CSC325

Searching

Database

returns

CSC326 Database Systems
7. File Requirements

Uploaded files shall:

Be PDF format only.
Have a maximum upload size (configurable).
Be stored securely.
Be retrievable at any time.
Retain metadata.
8. Error Handling

The system shall display friendly error messages.

Examples

Course not found.

No past questions available.

Upload failed.

Network error.

PDF unavailable.
9. Logging

The system shall log:

Admin login
File upload
File deletion
File modification

This is the minimum audit trail for Version 1.

10. Backup Requirements

ArchiveX shall:

Maintain automated database backups.
Protect uploaded PDFs from accidental loss.
Support restoration of data from backups.
Ensure recovery procedures are documented.
11. Future Functional Requirements

Reserved for future releases:

Student accounts
Bookmarks
Recently viewed
Notifications
AI Study Assistant
GPA Calculator
Academic Calendar
Timetable
Discussion Forum
Assignment Repository
Lecture Notes Repository
Analytics Dashboard