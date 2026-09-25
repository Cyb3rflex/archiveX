// Supabase Storage service for past question PDFs.
// Handles signed URL generation for secure file access.

'use strict';

const supabase = require('../config/database');
const config = require('../config/env');

/**
 * Generate a signed URL for secure file access.
 * @param {string} path - Storage object path
 * @param {number} expiresIn - Expiry in seconds (default 1 hour)
 * @returns {Promise<string>} Signed URL
 */
async function getSignedUrl(path, expiresIn = 3600) {
  if (!path) throw new Error('No file path provided');
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await supabase.storage
    .from(config.storageBucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

module.exports = { getSignedUrl };
