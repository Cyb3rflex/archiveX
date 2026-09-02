// Standardised API response helpers.
// All controllers should use these instead of constructing raw JSON objects —
// this ensures a consistent response envelope across the entire API.
//
// Success shape:  { success: true,  message: "...", data: {...} }
// Error shape:    { success: false, message: "...", errors: []  }

'use strict';

/**
 * Send a successful API response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {object|null} data
 * @param {number} statusCode
 */
function successResponse(res, message, data = null, statusCode = 200) {
  const payload = {
    success: true,
    message,
  };

  if (data !== null) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
}

/**
 * Send an error API response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {Array} errors
 */
function errorResponse(res, message, statusCode = 500, errors = []) {
  const payload = {
    success: false,
    message,
  };

  if (errors.length > 0) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
}

module.exports = { successResponse, errorResponse };
