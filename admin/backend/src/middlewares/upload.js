// File upload middleware using Multer (memory storage).
// Files are held in memory then passed to the controller, which streams them to Supabase Storage.
//
// Security:
//   - PDF only (by extension AND MIME type)
//   - Size limit from env config
//   - No files written to local disk

'use strict';

const multer = require('multer');
const { errorResponse } = require('../utils/api-response');
const config = require('../config/env');

const ALLOWED_MIME_TYPES = ['application/pdf'];
const ALLOWED_EXTENSIONS = ['.pdf'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.maxFileSizeBytes,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname || '').toLowerCase().slice(file.originalname.lastIndexOf('.'));
    const isPdfMime = ALLOWED_MIME_TYPES.includes(file.mimetype);
    const isPdfExt = ALLOWED_EXTENSIONS.includes(ext);

    if (!isPdfMime || !isPdfExt) {
      return cb(new Error('Only PDF files are allowed.'));
    }
    return cb(null, true);
  },
});

/**
 * Middleware to handle a single PDF upload under field name "pdf".
 * Returns a structured error response if the file is invalid.
 */
function uploadPdf(req, res, next) {
  upload.single('pdf')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(
          res,
          `File too large. Maximum size is ${config.maxFileSizeMb} MB.`,
          413,
        );
      }
      return errorResponse(res, err.message || 'File upload failed.', 400);
    }
    return next();
  });
}

module.exports = uploadPdf;
