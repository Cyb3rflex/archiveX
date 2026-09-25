// Dashboard controller — aggregate statistics.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

async function getStats(_req, res, next) {
  try {
    const [
      { count: faculties, error: fErr },
      { count: departments, error: dErr },
      { count: courses, error: cErr },
      { count: pastQuestions, error: pErr },
    ] = await Promise.all([
      supabaseAdmin.from('faculties').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('departments').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('courses').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('past_questions').select('*', { count: 'exact', head: true }),
    ]);

    if (fErr || dErr || cErr || pErr) {
      const err = fErr || dErr || cErr || pErr;
      throw new AppError(err.message, 500);
    }

    // Recent 5 uploads
    const { data: recentUploads, error: uErr } = await supabaseAdmin
      .from('past_questions')
      .select(`
        id,
        session,
        year,
        exam_type,
        file_name,
        file_size,
        downloads,
        created_at,
        course:courses(
          course_code,
          course_title,
          department:departments(name, faculty:faculties(name))
        ),
        admin:admins(full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (uErr) throw new AppError(uErr.message, 500);

    const uploads = (recentUploads || []).map((q) => ({
      id: q.id,
      courseCode: q.course?.course_code || '',
      courseTitle: q.course?.course_title || '',
      faculty: q.course?.department?.faculty?.name || '',
      department: q.course?.department?.name || '',
      session: q.session,
      year: q.year,
      examType: q.exam_type,
      fileName: q.file_name,
      fileSize: q.file_size,
      downloads: q.downloads,
      uploadedBy: q.admin?.full_name || '',
      createdAt: q.created_at,
    }));

    return successResponse(res, 'Dashboard data retrieved.', {
      faculties: faculties ?? 0,
      departments: departments ?? 0,
      courses: courses ?? 0,
      pastQuestions: pastQuestions ?? 0,
      recentUploads: uploads,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getStats };
