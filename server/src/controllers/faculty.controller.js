// Faculty controller — public read-only endpoints.

'use strict';

const supabase = require('../config/database');
const { successResponse, errorResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

// GET /api/v1/faculties
async function getAll(_req, res, next) {
  try {
    if (!supabase) {
      return successResponse(res, 'No faculties available (database not configured).', []);
    }

    const { data: faculties, error } = await supabase
      .from('faculties')
      .select('id, name, slug, created_at, departments(count)')
      .order('name', { ascending: true });

    if (error) throw new AppError(error.message, 500);

    const data = (faculties || []).map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      createdAt: f.created_at,
      departmentCount: f.departments?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Faculties retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /api/v1/faculties/:slug
async function getBySlug(req, res, next) {
  try {
    if (!supabase) throw new AppError('Database not configured.', 503);

    const { data: faculty, error } = await supabase
      .from('faculties')
      .select('id, name, slug, created_at, departments(id, name, slug)')
      .eq('slug', req.params.slug)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!faculty) throw new AppError('Faculty not found.', 404);

    const departments = (faculty.departments || []).sort((a, b) => a.name.localeCompare(b.name));

    return successResponse(res, 'Faculty retrieved.', {
      id: faculty.id,
      name: faculty.name,
      slug: faculty.slug,
      createdAt: faculty.created_at,
      departments,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getBySlug };
