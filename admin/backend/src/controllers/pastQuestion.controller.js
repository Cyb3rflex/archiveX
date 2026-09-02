// Past Question controller — CRUD with PDF upload via Supabase Storage.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');
const { uploadPdf, deletePdf, getSignedUrl } = require('../services/storage.service');

// GET /past-questions
async function getAll(req, res, next) {
  try {
    const { courseId, session, year } = req.query;
    const where = {};
    if (courseId) where.courseId = courseId;
    if (session) where.session = session;
    if (year) where.year = parseInt(year, 10);

    const questions = await prisma.pastQuestion.findMany({
      where,
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            courseTitle: true,
            department: { select: { name: true, faculty: { select: { name: true } } } },
          },
        },
      },
    });

    const data = questions.map((q) => ({
      ...q,
      courseCode: q.course.courseCode,
      courseTitle: q.course.courseTitle,
      department: q.course.department.name,
      faculty: q.course.department.faculty.name,
      course: undefined,
    }));

    return successResponse(res, 'Past questions retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /past-questions/:id
async function getOne(req, res, next) {
  try {
    const question = await prisma.pastQuestion.findUnique({
      where: { id: req.params.id },
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            courseTitle: true,
            department: { select: { name: true } },
          },
        },
        admin: { select: { id: true, fullName: true, email: true } },
      },
    });
    if (!question) throw new AppError('Past question not found.', 404);
    return successResponse(res, 'Past question retrieved.', question);
  } catch (err) {
    return next(err);
  }
}

// POST /past-questions
async function create(req, res, next) {
  try {
    const { courseId, session, year, examType } = req.body;

    if (!req.file) {
      throw new AppError('PDF file is required.', 400);
    }

    const { path } = await uploadPdf(req.file);

    const question = await prisma.pastQuestion.create({
      data: {
        courseId,
        session,
        year: parseInt(year, 10),
        examType,
        fileName: req.file.originalname,
        fileUrl: path,
        fileSize: req.file.size,
        uploadedBy: req.user.id,
      },
    });

    log({
      action: 'pastquestion.upload',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'pastquestion',
      resourceId: question.id,
      metadata: { courseId, session, year, examType, fileName: req.file.originalname },
    });

    return successResponse(res, 'Past question uploaded.', question, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /past-questions/:id
async function update(req, res, next) {
  try {
    const { session, year, examType } = req.body;
    const data = {};
    if (session) data.session = session;
    if (year) data.year = parseInt(year, 10);
    if (examType) data.examType = examType;

    const question = await prisma.pastQuestion.update({
      where: { id: req.params.id },
      data,
    });

    log({
      action: 'pastquestion.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'pastquestion',
      resourceId: question.id,
      metadata: { session, year, examType },
    });

    return successResponse(res, 'Past question updated.', question);
  } catch (err) {
    return next(err);
  }
}

// DELETE /past-questions/:id
async function remove(req, res, next) {
  try {
    const question = await prisma.pastQuestion.findUnique({
      where: { id: req.params.id },
      select: { id: true, fileUrl: true },
    });
    if (!question) throw new AppError('Past question not found.', 404);

    // Delete file from Supabase Storage
    await deletePdf(question.fileUrl);

    // Delete DB record
    await prisma.pastQuestion.delete({ where: { id: req.params.id } });

    log({
      action: 'pastquestion.delete',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'pastquestion',
      resourceId: req.params.id,
    });

    return successResponse(res, 'Past question deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
