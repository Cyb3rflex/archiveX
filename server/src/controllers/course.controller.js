// Course controller — public read-only endpoints.

'use strict';

const supabase = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

// GET /api/v1/courses
// Query params: departmentSlug, levelName, semesterName, q (search)
async function getAll(req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'No courses available (database not configured).', []);
    }

    const { departmentSlug, levelName, semesterName, q } = req.query;

    let query = supabase
      .from('courses')
      .select(`
        id, course_code, course_title, slug,
        department:departments(id, name, slug, faculty:faculties(id, name, slug)),
        level:levels(id, name),
        semester:semesters(id, name),
        pastQuestions:past_questions(count)
      `)
      .order('course_code', { ascending: true });

    if (departmentSlug) query = query.eq('department.slug', departmentSlug);
    if (levelName) query = query.eq('level.name', levelName);
    if (semesterName) query = query.eq('semester.name', semesterName);
    if (q) query = query.or(`course_code.ilike.%${q}%,course_title.ilike.%${q}%`);

    const { data: courses, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (courses || []).map((c) => ({
      id: c.id,
      courseCode: c.course_code,
      courseTitle: c.course_title,
      slug: c.slug,
      department: c.department
        ? { id: c.department.id, name: c.department.name, slug: c.department.slug, faculty: c.department.faculty }
        : null,
      level: c.level ? c.level.name : null,
      semester: c.semester ? c.semester.name : null,
      pastQuestionCount: c.pastQuestions?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Courses retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/courses/:slug
async function getBySlug(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        id, course_code, course_title, slug,
        department:departments(id, name, slug, faculty:faculties(id, name, slug)),
        level:levels(id, name),
        semester:semesters(id, name),
        pastQuestions:past_questions(id, session, year, exam_type, file_name, file_size, downloads, created_at)
      `)
      .eq('slug', req.params.slug)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!course) throw new AppError('Course not found.', 404);

    const pastQuestions = (course.pastQuestions || [])
      .map((q) => ({
        id: q.id,
        session: q.session,
        year: q.year,
        examType: q.exam_type,
        fileName: q.file_name,
        fileSize: q.file_size,
        downloads: q.downloads,
        createdAt: q.created_at,
      }))
      .sort((a, b) => b.year - a.year);

    return successResponse(res, 'Course retrieved.', {
      id: course.id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      slug: course.slug,
      department: course.department
        ? { id: course.department.id, name: course.department.name, slug: course.department.slug, faculty: course.department.faculty }
        : null,
      level: course.level ? course.level.name : null,
      semester: course.semester ? course.semester.name : null,
      pastQuestions,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getBySlug };
