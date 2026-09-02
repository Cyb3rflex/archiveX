// Central route registry for API v1.
// All v1 routes are mounted here and then attached to /api/v1 in app.js.

'use strict';

const { Router } = require('express');

const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const facultyRoutes = require('./faculty.routes');
const departmentRoutes = require('./department.routes');
const levelRoutes = require('./level.routes');
const semesterRoutes = require('./semester.routes');
const courseRoutes = require('./course.routes');
const pastQuestionRoutes = require('./pastQuestion.routes');
const dashboardRoutes = require('./dashboard.routes');
const searchRoutes = require('./search.routes');
const fileRoutes = require('./file.routes');

const router = Router();

// Health check — always first
router.use('/health', healthRoutes);

// Auth
router.use('/auth', authRoutes);

// File access (download/preview) — public, no auth required
router.use('/', fileRoutes);

// Search — public
router.use('/search', searchRoutes);

// Dashboard — admin only
router.use('/dashboard', dashboardRoutes);

// Resource routes
router.use('/faculties', facultyRoutes);
router.use('/departments', departmentRoutes);
router.use('/levels', levelRoutes);
router.use('/semesters', semesterRoutes);
router.use('/courses', courseRoutes);
router.use('/past-questions', pastQuestionRoutes);

module.exports = router;
