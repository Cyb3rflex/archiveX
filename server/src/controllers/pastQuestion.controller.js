// Past question controller — public read-only endpoints.

'use strict';

const supabase = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { getSignedUrl } = require('../services/storage.service');

// GET /api/v1/past-questions  (optional ?courseSlug=..., ?courseId=...)
async function getAll(req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'No past questions available (database not configured).', []);
    }

    const { courseSlug, courseId } = req.query;

    let query = supabase
      .from('past_questions')
      .select(`
        id, session, year, exam_type, file_name, file_size, downloads, created_at,
        course:courses(id, course_code, course_title, slug, department:departments(name))
      `)
      .order('year', { ascending: false })
      .order('created_at', { ascending: false });

    if (courseId) {
      query = query.eq('course_id', courseId);
    } else if (courseSlug) {
      const { data: course } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', courseSlug)
        .maybeSingle();

      if (!course) {
        return successResponse(res, 'Past questions retrieved.', []);
      }
      query = query.eq('course_id', course.id);
    }


    const { data: questions, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (questions || []).map((q) => ({
      id: q.id,
      session: q.session,
      year: q.year,
      examType: q.exam_type,
      fileName: q.file_name,
      fileSize: formatFileSize(q.file_size),
      downloads: q.downloads,
      createdAt: q.created_at,
      course: q.course
        ? {
            id: q.course.id,
            courseCode: q.course.course_code,
            courseTitle: q.course.course_title,
            slug: q.course.slug,
            departmentName: q.course.department?.name || '',
          }
        : null,
    }));

    return successResponse(res, 'Past questions retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/past-questions/recent?limit=5
async function getRecent(req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'No recent uploads (database not configured).', []);
    }

    const limit = Math.min(parseInt(req.query.limit ?? '5', 10), 20);

    const { data: questions, error } = await supabase
      .from('past_questions')
      .select(`
        id, session, year, exam_type, file_name, file_size, downloads, created_at,
        course:courses(id, course_code, course_title, slug, department:departments(name, faculty:faculties(name)))
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new AppError(error.message, 500);

    const data = (questions || []).map((q) => ({
      id: q.id,
      session: q.session,
      year: q.year,
      examType: q.exam_type,
      fileName: q.file_name,
      fileSize: formatFileSize(q.file_size),
      downloads: q.downloads,
      createdAt: q.created_at,
      course: q.course
        ? {
            id: q.course.id,
            courseCode: q.course.course_code,
            courseTitle: q.course.course_title,
            slug: q.course.slug,
            departmentName: q.course.department?.name || '',
            facultyName: q.course.department?.faculty?.name || '',
          }
        : null,
    }));

    return successResponse(res, 'Recent past questions retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/past-questions/:id
async function getById(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: question, error } = await supabase
      .from('past_questions')
      .select(`
        id, session, year, exam_type, file_name, file_size, downloads, created_at,
        course:courses(id, course_code, course_title, slug,
          department:departments(id, name, slug, faculty:faculties(id, name, slug)),
          level:levels(name),
          semester:semesters(name)
        )
      `)
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    return successResponse(res, 'Past question retrieved.', formatQuestion(question));
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/past-questions/:id/download
async function getDownloadUrl(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: question, error } = await supabase
      .from('past_questions')
      .select('id, file_url, file_name, downloads')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    // Increment download count (fire-and-forget)
    supabase
      .from('past_questions')
      .update({ downloads: (question.downloads || 0) + 1 })
      .eq('id', question.id)
      .then(() => {})
      .catch(() => {});

    const url = await getSignedUrl(question.file_url, 3600);

    return successResponse(res, 'Download URL generated.', {
      url,
      fileName: question.file_name,
      expiresIn: 3600,
    });
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/past-questions/:id/preview
async function getPreviewUrl(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: question, error } = await supabase
      .from('past_questions')
      .select('id, file_url, file_name')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!question) throw new AppError('Past question not found.', 404);

    const url = await getSignedUrl(question.file_url, 900);

    return successResponse(res, 'Preview URL generated.', {
      url,
      fileName: question.file_name,
      expiresIn: 900,
    });
  } catch (err) {
    return next(err);
  }
}

// ─── helpers ───────────────────────────────────────
function formatFileSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatQuestion(q) {
  return {
    id: q.id,
    session: q.session,
    year: q.year,
    examType: q.exam_type,
    fileName: q.file_name,
    fileSize: formatFileSize(q.file_size),
    downloads: q.downloads,
    createdAt: q.created_at,
    uploadedAt: q.created_at,
    course: q.course
      ? {
          id: q.course.id,
          courseCode: q.course.course_code,
          courseTitle: q.course.course_title,
          slug: q.course.slug,
          level: q.course.level?.name || null,
          semester: q.course.semester?.name || null,
          department: q.course.department
            ? {
                id: q.course.department.id,
                name: q.course.department.name,
                slug: q.course.department.slug,
                faculty: q.course.department.faculty || null,
              }
            : null,
        }
      : null,
  };
}

module.exports = { getAll, getRecent, getById, getDownloadUrl, getPreviewUrl };
