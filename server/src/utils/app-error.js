// Custom error class for operational errors (expected, handled errors).
// Extends the native Error so instanceof checks work correctly.
// The isOperational flag lets the error handler distinguish between:
//   - Operational errors (e.g. 404, 400): safe to expose message to client
//   - Programmer errors (unexpected bugs): suppress details in production

'use strict';

class AppError extends Error {
  /**
   * @param {string} message - User-facing error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // Maintain correct stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
