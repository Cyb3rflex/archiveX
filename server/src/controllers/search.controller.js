// Search controller — public unified search endpoint.

'use strict';

const supabase = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

// GET /api/v1/search?q=...
async function search(req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'Search not available (database not configured).', {
        courses: [],
        pastQuestions: [],
      });
    }

    const { q } = req.query;
    if (!q || !q.trim()) {
      return successResponse(res, 'Search results.', { courses: [], pastQuestions: [] });
    }

    const term = q.trim();

    const [coursesResult, pqResult] = await Promise.all([
      supabase
        .from('courses')
        .select(`
          id, course_code, course_title, slug,
          department:departments(id, name, slug, faculty:faculties(id, name, slug)),
          level:levels(name),
          semester:semesters(name),
          pastQuestions:past_questions(count)
        `)
        .or(`course_code.ilike.%${term}%,course_title.ilike.%${term}%`)
        .order('course_code', { ascending: true })
        .limit(20),

      supabase
        .from('past_questions')
        .select(`
          id, session, year, exam_type, file_name, file_size, downloads, created_at,
          course:courses(id, course_code, course_title, slug, department:departments(name))
        `)
        .or(`session.ilike.%${term}%,file_name.ilike.%${term}%`)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    if (coursesResult.error) throw new AppError(coursesResult.error.message, 500);
    if (pqResult.error) throw new AppError(pqResult.error.message, 500);

    const courses = (coursesResult.data || []).map((c) => ({
      id: c.id,
      courseCode: c.course_code,
      courseTitle: c.course_title,
      slug: c.slug,
      department: c.department ? { name: c.department.name, slug: c.department.slug } : null,
      faculty: c.department?.faculty ? { name: c.department.faculty.name } : null,
      level: c.level?.name || null,
      semester: c.semester?.name || null,
      pastQuestionCount: c.pastQuestions?.[0]?.count ?? 0,
    }));

    const pastQuestions = (pqResult.data || []).map((q) => ({
      id: q.id,
      session: q.session,
      year: q.year,
      examType: q.exam_type,
      fileName: q.file_name,
      downloads: q.downloads,
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

    return successResponse(res, 'Search results.', { courses, pastQuestions });
  } catch (err) {
    return next(err);
  }
}

module.exports = { search };
