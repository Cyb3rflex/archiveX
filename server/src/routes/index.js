// Central route registry for API v1.
// All v1 routes are mounted here and then attached to /api/v1 in app.js.
// Adding a new module in Phase 2+ means adding one import and one router.use() here.

'use strict';

const { Router } = require('express');
const healthRoutes = require('./health.routes');

const router = Router();

// Health check — always the first registered route
router.use('/health', healthRoutes);

module.exports = router;
