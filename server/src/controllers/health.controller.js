// Health check controller for ArchiveX public server.
// Checks server health and Supabase database connectivity.

'use strict';

const supabase = require('../config/database');
const { successResponse, errorResponse } = require('../utils/api-response');

/**
 * GET /api/v1/health
 * Returns server and database health status.
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
async function healthCheck(_req, res) {
  try {
    if (!supabase) {
      return successResponse(res, 'ArchiveX API is running (Supabase not configured)', {
        database: 'unconfigured',
      });
    }

    // Ping Supabase with a lightweight query to verify connectivity
    const { error } = await supabase.from('faculties').select('id').limit(1);

    if (error) {
      console.error('[Health] Database connectivity check failed:', error.message);
      return errorResponse(
        res,
        'ArchiveX API is running, but the database is unavailable.',
        503,
      );
    }

    return successResponse(res, 'ArchiveX API is healthy', {
      database: 'connected',
    });
  } catch (err) {
    console.error('[Health] Unexpected error during health check:', err.message);

    return errorResponse(
      res,
      'ArchiveX API is running, but health check failed.',
      503,
    );
  }
}

module.exports = { healthCheck };

