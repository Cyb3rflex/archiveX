// Auth routes — login, logout, current user.

'use strict';

const { Router } = require('express');
const auth = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate');
const { authLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validate');
const { loginSchema } = require('../utils/validators/auth.validator');

const router = Router();

router.post('/login', authLimiter, validate({ body: loginSchema }), auth.login);
router.post('/logout', authenticate, auth.logout);
router.get('/me', authenticate, auth.me);

module.exports = router;
