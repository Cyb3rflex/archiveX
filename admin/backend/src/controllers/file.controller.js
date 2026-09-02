// File access controller — signed URLs for download and preview.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { getSignedUrl } = require('../services/storage.service');

// GET /download/:id
async function download(req, res, next) {
  try {
    const question = await prisma.pastQuestion.findUnique({
      where: { id: req.params.id },
      select: { id: true, fileUrl: true, fileName: true, downloads: true },
    });
    if (!question) throw new AppError('Past question not found.', 404);

    // Increment download count
    await prisma.pastQuestion.update({
      where: { id: question.id },
      data: { downloads: { increment: 1 } },
    });

    // Generate a 1-hour signed URL
    const signedUrl = await getSignedUrl(question.fileUrl, 3600);

    return successResponse(res, 'Download URL generated.', {
      url: signedUrl,
      fileName: question.fileName,
    });
  } catch (err) {
    return next(err);
  }
}

// GET /preview/:id
async function preview(req, res, next) {
  try {
    const question = await prisma.pastQuestion.findUnique({
      where: { id: req.params.id },
      select: { id: true, fileUrl: true, fileName: true },
    });
    if (!question) throw new AppError('Past question not found.', 404);

    // Generate a 15-minute signed URL for preview
    const signedUrl = await getSignedUrl(question.fileUrl, 900);

    return successResponse(res, 'Preview URL generated.', {
      url: signedUrl,
      fileName: question.fileName,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { download, preview };
