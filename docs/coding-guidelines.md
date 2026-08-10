# Coding Guidelines

## Purpose

These guidelines ensure that the ArchiveX codebase remains clean, consistent, and maintainable.

---

# General Principles

- Write readable code.
- Prefer simplicity over cleverness.
- Avoid unnecessary complexity.
- Keep functions small and focused.
- Document important decisions.

---

# Naming Conventions

Variables

Use camelCase.

Example

```js
courseTitle
```

Components

Use PascalCase.

Example

```jsx
CourseCard.jsx
```

Files

Use kebab-case where appropriate.

Example

```
course-service.js
```

Constants

Use UPPER_SNAKE_CASE.

Example

```js
MAX_UPLOAD_SIZE
```

---

# Folder Organization

Each feature should contain its own:

- Controller
- Service
- Routes
- Validation
- Types (where applicable)

Avoid placing unrelated logic together.

---

# Error Handling

Never ignore errors.

Provide meaningful error messages.

Log server errors for debugging.

---

# Comments

Write comments only when necessary.

Code should explain *how*.

Comments should explain *why*.

---

# Git Commit Messages

Use clear commit messages.

Examples

```
feat: add course management

fix: resolve upload validation bug

docs: update API specification

refactor: simplify authentication middleware
```

---

# Code Reviews

Every change should:

- Build successfully.
- Pass tests (when available).
- Follow project conventions.
- Not reduce readability.

---

# Dependencies

Only install dependencies that provide clear value.

Unused packages should be removed.

---

# Formatting

Use:

- ESLint
- Prettier

Maintain consistent formatting across the project.

---

# Documentation

New features should include:

- Updated documentation
- API changes
- Database changes (if applicable)

Documentation is part of the feature.

---

# Final Principle

Always leave the codebase better than you found it.