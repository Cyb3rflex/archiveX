# Backup & Disaster Recovery Plan

## Overview

ArchiveX is designed with data preservation as a fundamental principle.

The platform exists to preserve academic resources for current and future students. Therefore, protecting data from accidental loss, corruption, hardware failure, deployment failures, and human error is a primary engineering objective.

The goal is simple:

> No single failure should permanently destroy ArchiveX's data.

---

# Backup Objectives

ArchiveX backups are designed to:

- Protect database records.
- Protect uploaded PDF documents.
- Protect source code.
- Enable quick recovery after failures.
- Minimize downtime.
- Preserve historical academic resources.

---

# Backup Strategy

ArchiveX follows the **3-2-1 Backup Rule**.

This means:

- Keep **3 copies** of important data.
- Store backups on **2 different storage systems**.
- Keep **1 copy** in a separate location.

This approach reduces the risk of permanent data loss.

---

# Backup Scope

The following assets are backed up.

## Database

Database backups include:

- Faculties
- Departments
- Levels
- Semesters
- Courses
- Past Question records
- Administrator accounts
- System configuration

---

## Uploaded Files

Uploaded PDF documents are backed up.

Files should always exist in:

Primary Storage

- Cloudinary

Future Secondary Storage

- Independent cloud object storage

---

## Source Code

The ArchiveX source code should always exist in multiple locations.

Primary

- GitHub Repository

Secondary

- Local development machine

Future

- Additional repository mirror

---

# Backup Frequency

## Database

Daily

- Incremental backup

Weekly

- Full backup

Monthly

- Long-term archive

---

## Uploaded PDFs

Every uploaded file should exist in Cloudinary.

Future versions may automatically replicate uploaded files to secondary storage.

---

# Backup Verification

Creating backups is not enough.

ArchiveX backups must be verified regularly.

Verification includes:

- Confirm backup completed.
- Confirm backup is readable.
- Confirm backup is restorable.
- Record verification date.

A backup that cannot be restored is not considered a valid backup.

---

# Recovery Objectives

## Recovery Time Objective (RTO)

Target

Less than **4 hours**

This is the maximum acceptable downtime after a major incident.

---

## Recovery Point Objective (RPO)

Target

Less than **24 hours**

This means no more than one day's worth of data should ever be lost.

Future versions may reduce this target.

---

# Disaster Scenarios

## Scenario 1

Application Server Failure

Examples

- Render outage
- Server crash
- Deployment failure

Recovery

Redeploy backend.

Reconnect to Neon Database.

Reconnect to Cloudinary.

No data should be lost.

---

## Scenario 2

Database Corruption

Recovery

Restore latest verified backup.

Validate restored data.

Resume service.

---

## Scenario 3

Accidental Data Deletion

Recovery

Restore affected records from backup.

Validate relationships.

Resume normal operation.

---

## Scenario 4

Cloud Storage Failure

Recovery

Restore PDFs from secondary backup storage.

Update file references if necessary.

---

## Scenario 5

Developer Mistake

Examples

- Wrong migration
- Accidental deletion
- Faulty deployment

Recovery

Rollback changes.

Restore affected data.

Deploy corrected version.

---

# Backup Security

Backups must be protected.

Requirements

- Restricted access
- Secure storage
- Encryption where applicable
- Regular verification
- Secure transfer

Backups should never be publicly accessible.

---

# Backup Documentation

Every backup should record:

- Date
- Time
- Backup type
- Storage location
- Verification status

This information should be maintained in operational records.

---

# Recovery Procedure

In the event of data loss:

1. Identify the affected system.
2. Stop further damage.
3. Locate the latest verified backup.
4. Restore data.
5. Validate integrity.
6. Test application functionality.
7. Resume production services.
8. Document the incident.

---

# Future Improvements

Future versions may include:

- Automated nightly backups
- Multi-region storage
- Continuous database replication
- Automatic failover
- Backup health dashboard
- One-click recovery
- Disaster recovery drills

---

# Engineering Principle

Backups are not optional.

Every deployment, migration, and infrastructure change must preserve the ability to recover ArchiveX in the event of failure.

Protecting academic resources is a permanent responsibility of the ArchiveX project.