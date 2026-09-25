// File access controller — signed URLs for download and preview.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { getSignedUrl } = require('../services/storage.service');

// GET /download/:id
async function download(req, res, next) {
  try {
    const { data: question, error: fetchError } = await supabaseAdmin
      .from('past_questions')
      .select('id, file_url, file_name, downloads')
      .eq('id', req.params.id)
      .maybeSingle();

    if (fetchError) throw new AppError(fetchError.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    // Increment download count
    await supabaseAdmin
      .from('past_questions')
      .update({ downloads: (question.downloads || 0) + 1 })
      .eq('id', question.id);

    // Generate a 1-hour signed URL
    const signedUrl = await getSignedUrl(question.file_url, 3600);

    return successResponse(res, 'Download URL generated.', {
      url: signedUrl,
      fileName: question.file_name,
    });
  } catch (err) {
    return next(err);
  }
}

// GET /preview/:id
async function preview(req, res, next) {
  try {
    const { data: question, error: fetchError } = await supabaseAdmin
      .from('past_questions')
      .select('id, file_url, file_name')
      .eq('id', req.params.id)
      .maybeSingle();

    if (fetchError) throw new AppError(fetchError.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    // Generate a 15-minute signed URL for preview
    const signedUrl = await getSignedUrl(question.file_url, 900);

    return successResponse(res, 'Preview URL generated.', {
      url: signedUrl,
      fileName: question.file_name,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { download, preview };
