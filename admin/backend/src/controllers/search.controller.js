// Search controller — search courses by code or title.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

async function search(req, res, next) {
  try {
    const { q } = req.query;

    let query = supabaseAdmin
      .from('courses')
      .select(`
        id,
        course_code,
        course_title,
        slug,
        department:departments(name, faculty:faculties(name)),
        level:levels(name),
        semester:semesters(name),
        pastQuestions:past_questions(count)
      `)
      .order('course_code', { ascending: true })
      .limit(20);

    if (q) {
      query = query.or(`course_code.ilike.%${q}%,course_title.ilike.%${q}%`);
    }

    const { data: courses, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (courses || []).map((c) => ({
      id: c.id,
      courseCode: c.course_code,
      courseTitle: c.course_title,
      slug: c.slug,
      department: c.department?.name || '',
      faculty: c.department?.faculty?.name || '',
      level: c.level?.name || '',
      semester: c.semester?.name || '',
      pastQuestionCount: c.pastQuestions?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Search results.', data);
  } catch (err) {
    return next(err);
  }
}

module.exports = { search };
