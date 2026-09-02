// Supabase Storage service for past question PDFs.
// All file operations (upload, delete, signed URL) go through this module
// so the storage provider can be swapped without changing controllers.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const config = require('../config/env');
const { v4: uuidv4 } = require('uuid');

const BUCKET = config.storageBucket;

/**
 * Upload a PDF to Supabase Storage.
 * @param {object} file - Multer file object (memoryStorage)
 * @returns {Promise<{path: string, url: string}>}
 */
async function uploadPdf(file) {
  if (!file) throw new Error('No file provided');
  const ext = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.')) || '.pdf';
  const filename = `${uuidv4()}${ext}`;
  const path = `past-questions/${filename}`;

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file.buffer, {
      contentType: file.mimetype || 'application/pdf',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  return { path: data.path };
}

/**
 * Delete a PDF from Supabase Storage.
 * @param {string} path - Storage object path (e.g., "past-questions/abc.pdf")
 */
async function deletePdf(path) {
  if (!path) return;
  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
  if (error) {
    // Log but don't throw — caller decides how to handle
    console.error('[Storage] Failed to delete file:', error.message);
  }
}

/**
 * Generate a signed URL for secure file access.
 * @param {string} path - Storage object path
 * @param {number} expiresIn - Expiry in seconds (default 1 hour)
 * @returns {Promise<string>} Signed URL
 */
async function getSignedUrl(path, expiresIn = 3600) {
  if (!path) throw new Error('No file path provided');
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }
  return data.signedUrl;
}

module.exports = { uploadPdf, deletePdf, getSignedUrl };
