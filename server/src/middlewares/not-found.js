// 404 handler — catches any request that did not match a registered route.
// Must be registered AFTER all routes but BEFORE the error handler.

'use strict';

const AppError = require('../utils/app-error');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFound;
