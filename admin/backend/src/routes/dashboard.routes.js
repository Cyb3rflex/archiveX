// Dashboard routes — aggregate stats (admin only).

'use strict';

const { Router } = require('express');
const dashboard = require('../controllers/dashboard.controller');
const authenticate = require('../middlewares/authenticate');

const router = Router();

router.get('/', authenticate, dashboard.getStats);

module.exports = router;
