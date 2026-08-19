// Health check controller.
// Performs a real database connectivity test — does not simply return a static string.
// If the database is unreachable, the endpoint responds with HTTP 503 Service Unavailable.

'use strict';

const prisma = require('../config/database');
const { successResponse, errorResponse } = require('../utils/api-response');

/**
 * GET /api/v1/health
 * Returns server and database health status.
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
async function healthCheck(_req, res) {
  try {
    // Execute a minimal query to verify the database connection is live
    await prisma.$queryRaw`SELECT 1`;

    return successResponse(res, 'ArchiveX API is healthy', {
      database: 'connected',
    });
  } catch (err) {
    // Log the real error server-side only — do not expose DB details to client
    console.error('[Health] Database connectivity check failed:', err.message);

    return errorResponse(
      res,
      'ArchiveX API is running, but the database is unavailable.',
      503,
    );
  }
}

module.exports = { healthCheck };
