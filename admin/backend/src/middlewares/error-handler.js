// Centralized error handling middleware.
// This must be registered LAST in the Express app (after all routes).
//
// Security rules enforced here:
//  - Stack traces are NEVER sent to clients.
//  - Database URLs, secrets, and file paths are NEVER leaked.
//  - In production, unexpected errors return a generic message.
//  - Full error details are only logged on the server.

'use strict';

const { errorResponse } = require('../utils/api-response');

/**
 * Express error-handling middleware (4 arguments required by Express).
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Always log the full error server-side
  console.error('[Error]', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Operational errors (AppError instances) are expected and safe to expose
  if (err.isOperational) {
    return errorResponse(res, err.message, err.statusCode);
  }

  // Handle Prisma known errors
  if (err.code) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      return errorResponse(res, 'A record with that value already exists.', 409);
    }
    // Record not found
    if (err.code === 'P2025') {
      return errorResponse(res, 'Record not found.', 404);
    }
    // Foreign key constraint failure
    if (err.code === 'P2003') {
      return errorResponse(res, 'Related record does not exist.', 400);
    }
  }

  // Unknown / programmer errors — never expose internals in production
  const isProduction = process.env.NODE_ENV === 'production';
  const message = isProduction
    ? 'An unexpected error occurred. Please try again later.'
    : err.message;

  return errorResponse(res, message, 500);
}

module.exports = errorHandler;
