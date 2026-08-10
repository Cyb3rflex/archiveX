ArchiveX Non-Functional Requirements
1. Purpose

ArchiveX shall be designed to provide a secure, reliable, scalable, and maintainable platform for preserving and distributing university past examination questions.

2. Performance
NFR-001

Pages should load quickly.

Target:

Initial page load: < 3 seconds
Navigation between pages: < 1 second
Search results: < 2 seconds
NFR-002

PDF previews should begin loading within 3 seconds, depending on file size and network speed.

NFR-003

Downloads should start immediately after the user clicks the download button.

3. Availability
NFR-004

The system should target 99% availability.

Planned maintenance should be announced in advance where possible.

4. Reliability
NFR-005

The system shall continue functioning correctly even if individual requests fail.

NFR-006

Unexpected server errors shall not corrupt stored data.

NFR-007

The system shall recover gracefully after deployment failures.

5. Scalability

ArchiveX shall support future expansion without requiring a complete redesign.

Future additions may include:

Student accounts
Lecture notes
GPA calculator
AI assistant
Discussion forum
Assignment repository

The Version 1 architecture must remain compatible with these future modules.

6. Security

ArchiveX shall:

Hash passwords using bcrypt.
Authenticate administrators with JWT.
Restrict dashboard access to authenticated administrators.
Validate all uploaded files.
Reject unsupported file formats.
Validate all incoming requests.
Protect against SQL injection through Prisma.
Protect against Cross-Site Scripting (XSS).
Use security headers via Helmet.
Implement rate limiting on authentication endpoints.
7. Data Integrity

ArchiveX shall ensure:

Uploaded PDFs are not corrupted.
Course information remains consistent.
Deleted records do not leave orphaned references.
Database relationships remain valid.
8. Backup & Recovery

This is one of ArchiveX's core engineering principles.

The platform shall:

Maintain regular database backups.
Protect uploaded PDFs from accidental loss.
Support restoration after data loss.
Keep backup procedures documented.
Ensure backups are verified periodically.

No single failure should permanently destroy academic resources.

9. Maintainability

The system shall:

Follow a modular architecture.
Use consistent coding standards.
Separate frontend and backend concerns.
Keep documentation updated.
Be easy for future contributors to understand.
10. Usability

Students should be able to:

Find a course quickly.
Navigate without training.
Preview PDFs easily.
Download resources with minimal steps.

The interface should remain clean, intuitive, and mobile-friendly.

11. Compatibility

ArchiveX should support modern versions of:

Google Chrome
Microsoft Edge
Mozilla Firefox
Safari

It should also provide a responsive experience across phones, tablets, laptops, and desktops.

12. Accessibility

The application should:

Use readable typography.
Maintain good color contrast.
Provide descriptive labels for interactive elements.
Be keyboard navigable where practical.
13. Logging

The system shall log administrative events, including:

Login attempts
Uploads
Updates
Deletions

Logs should aid troubleshooting without exposing sensitive information.

14. File Storage

ArchiveX shall:

Store PDF files securely.
Store file metadata in the database.
Validate upload size limits.
Prevent unsupported file types from being uploaded.
15. Future Maintainability

The architecture shall allow new modules to be added independently without disrupting existing functionality.

Examples include:

Lecture Notes
Assignments
AI Study Assistant
GPA Calculator
Discussion Forum