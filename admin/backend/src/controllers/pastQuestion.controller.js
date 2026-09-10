// Past Question controller — CRUD with PDF upload via Supabase Storage.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');
const { uploadPdf, deletePdf } = require('../services/storage.service');

// GET /past-questions
async function getAll(req, res, next) {
  try {
    const { courseId, session, year } = req.query;

    let query = supabaseAdmin
      .from('past_questions')
      .select(`
        id,
        course_id,
        session,
        year,
        exam_type,
        file_name,
        file_url,
        file_size,
        downloads,
        uploaded_by,
        created_at,
        updated_at,
        course:courses(
          id,
          course_code,
          course_title,
          department:departments(name, faculty:faculties(name))
        )
      `)
      .order('year', { ascending: false })
      .order('created_at', { ascending: false });

    if (courseId) query = query.eq('course_id', courseId);
    if (session) query = query.eq('session', session);
    if (year) query = query.eq('year', parseInt(year, 10));

    const { data: questions, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (questions || []).map((q) => ({
      id: q.id,
      courseId: q.course_id,
      session: q.session,
      year: q.year,
      examType: q.exam_type,
      fileName: q.file_name,
      fileUrl: q.file_url,
      fileSize: q.file_size,
      downloads: q.downloads,
      uploadedBy: q.uploaded_by,
      createdAt: q.created_at,
      updatedAt: q.updated_at,
      courseCode: q.course?.course_code || '',
      courseTitle: q.course?.course_title || '',
      department: q.course?.department?.name || '',
      faculty: q.course?.department?.faculty?.name || '',
    }));

    return successResponse(res, 'Past questions retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /past-questions/:id
async function getOne(req, res, next) {
  try {
    const { data: question, error } = await supabaseAdmin
      .from('past_questions')
      .select(`
        id,
        course_id,
        session,
        year,
        exam_type,
        file_name,
        file_url,
        file_size,
        downloads,
        uploaded_by,
        created_at,
        updated_at,
        course:courses(
          id,
          course_code,
          course_title,
          department:departments(name)
        ),
        admin:admins(id, full_name, email)
      `)
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    const formatted = {
      id: question.id,
      courseId: question.course_id,
      session: question.session,
      year: question.year,
      examType: question.exam_type,
      fileName: question.file_name,
      fileUrl: question.file_url,
      fileSize: question.file_size,
      downloads: question.downloads,
      uploadedBy: question.uploaded_by,
      createdAt: question.created_at,
      updatedAt: question.updated_at,
      course: {
        id: question.course?.id,
        courseCode: question.course?.course_code,
        courseTitle: question.course?.course_title,
        department: question.course?.department,
      },
      admin: {
        id: question.admin?.id,
        fullName: question.admin?.full_name,
        email: question.admin?.email,
      },
    };

    return successResponse(res, 'Past question retrieved.', formatted);
  } catch (err) {
    return next(err);
  }
}

// POST /past-questions
async function create(req, res, next) {
  let uploadedPath = null;
  try {
    const { courseId, session, year, examType } = req.body;

    if (!req.file) {
      throw new AppError('PDF file is required.', 400);
    }

    const { path } = await uploadPdf(req.file);
    uploadedPath = path;

    const { data: question, error } = await supabaseAdmin
      .from('past_questions')
      .insert({
        course_id: courseId,
        session,
        year: parseInt(year, 10),
        exam_type: examType,
        file_name: req.file.originalname,
        file_url: path,
        file_size: req.file.size,
        uploaded_by: req.user.id,
      })
      .select('id, course_id, session, year, exam_type, file_name, file_url, file_size, downloads, uploaded_by, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('A past question for this course, session, and exam type already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }

    const formatted = {
      id: question.id,
      courseId: question.course_id,
      session: question.session,
      year: question.year,
      examType: question.exam_type,
      fileName: question.file_name,
      fileUrl: question.file_url,
      fileSize: question.file_size,
      downloads: question.downloads,
      uploadedBy: question.uploaded_by,
      createdAt: question.created_at,
      updatedAt: question.updated_at,
    };

    log({
      action: 'pastquestion.upload',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'pastquestion',
      resourceId: formatted.id,
      metadata: { courseId, session, year, examType, fileName: req.file.originalname },
    });

    return successResponse(res, 'Past question uploaded.', formatted, 201);
  } catch (err) {
    if (uploadedPath) {
      try {
        await deletePdf(uploadedPath);
      } catch (deleteErr) {
        console.error('Failed to cleanup uploaded PDF after database error:', deleteErr.message);
      }
    }
    return next(err);
  }
}

// PATCH /past-questions/:id
async function update(req, res, next) {
  try {
    const { session, year, examType } = req.body;
    const updateData = {};
    if (session !== undefined) updateData.session = session;
    if (year !== undefined) updateData.year = parseInt(year, 10);
    if (examType !== undefined) updateData.exam_type = examType;

    const { data: question, error } = await supabaseAdmin
      .from('past_questions')
      .update(updateData)
      .eq('id', req.params.id)
      .select('id, course_id, session, year, exam_type, file_name, file_url, file_size, downloads, uploaded_by, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('A past question for this course, session, and exam type already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }
    if (!question) throw new AppError('Past question not found.', 404);

    const formatted = {
      id: question.id,
      courseId: question.course_id,
      session: question.session,
      year: question.year,
      examType: question.exam_type,
      fileName: question.file_name,
      fileUrl: question.file_url,
      fileSize: question.file_size,
      downloads: question.downloads,
      uploadedBy: question.uploaded_by,
      createdAt: question.created_at,
      updatedAt: question.updated_at,
    };

    log({
      action: 'pastquestion.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'pastquestion',
      resourceId: formatted.id,
      metadata: { session, year, examType },
    });

    return successResponse(res, 'Past question updated.', formatted);
  } catch (err) {
    return next(err);
  }
}

// DELETE /past-questions/:id
async function remove(req, res, next) {
  try {
    const { data: question, error: fetchError } = await supabaseAdmin
      .from('past_questions')
      .select('id, file_url')
      .eq('id', req.params.id)
      .maybeSingle();

    if (fetchError) throw new AppError(fetchError.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    // Delete file from Supabase Storage
    await deletePdf(question.file_url);

    // Delete DB record
    const { error: deleteError } = await supabaseAdmin
      .from('past_questions')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) throw new AppError(deleteError.message, 500);

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
