// JWT authentication middleware.
// Verifies the JWT in the Authorization header and attaches user info to req.user.
// Usage: router.use(authenticate) — all routes below require auth.

'use strict';

const { verifyToken } = require('../lib/jwt');
const { errorResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Authentication required. No token provided.', 401);
    }

    const decoded = verifyToken(token);
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      supabaseUserId: decoded.supabaseUserId,
    };

    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired. Please log in again.', 401);
    }
    if (err.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token. Please log in again.', 401);
    }
    return next(new AppError('Authentication failed.', 401));
  }
}

module.exports = authenticate;
