// Department controller — public read-only endpoints.

'use strict';

const supabase = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

// GET /api/v1/departments  (optional ?facultySlug=...)
async function getAll(req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'No departments available (database not configured).', []);
    }

    const { facultySlug } = req.query;

    let query = supabase
      .from('departments')
      .select('id, name, slug, faculty_id, faculty:faculties(id, name, slug), courses(count)')
      .order('name', { ascending: true });

    if (facultySlug) {
      const { data: faculty } = await supabase
        .from('faculties')
        .select('id')
        .eq('slug', facultySlug)
        .maybeSingle();

      if (!faculty) {
        return successResponse(res, 'Departments retrieved.', []);
      }
      query = query.eq('faculty_id', faculty.id);
    }

    const { data: departments, error } = await query;

    if (error) throw new AppError(error.message, 500);

    const data = (departments || []).map((d) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      facultyId: d.faculty_id,
      faculty: d.faculty,
      courseCount: d.courses?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Departments retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/departments/:slug
async function getBySlug(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: department, error } = await supabase
      .from('departments')
      .select(`
        id, name, slug, faculty_id,
        faculty:faculties(id, name, slug),
        courses(id, course_code, course_title, slug, level:levels(name), semester:semesters(name))
      `)
      .eq('slug', req.params.slug)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!department) throw new AppError('Department not found.', 404);

    // Derive available levels from courses
    const levelSet = new Set();
    (department.courses || []).forEach((c) => {
      if (c.level?.name) levelSet.add(c.level.name);
    });
    const levels = [...levelSet].sort();

    return successResponse(res, 'Department retrieved.', {
      id: department.id,
      name: department.name,
      slug: department.slug,
      facultyId: department.faculty_id,
      faculty: department.faculty,
      levels,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getBySlug };
