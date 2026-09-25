// Central route registry for API v1.
// All v1 routes are mounted here and then attached to /api/v1 in app.js.

'use strict';

const { Router } = require('express');
const healthRoutes = require('./health.routes');
const facultyRoutes = require('./faculty.routes');
const departmentRoutes = require('./department.routes');
const courseRoutes = require('./course.routes');
const pastQuestionRoutes = require('./pastQuestion.routes');
const searchRoutes = require('./search.routes');

const router = Router();

// Health check — always the first registered route
router.use('/health', healthRoutes);

// Public read-only resource routes
router.use('/faculties', facultyRoutes);
router.use('/departments', departmentRoutes);
router.use('/courses', courseRoutes);
router.use('/past-questions', pastQuestionRoutes);
router.use('/search', searchRoutes);

module.exports = router;
