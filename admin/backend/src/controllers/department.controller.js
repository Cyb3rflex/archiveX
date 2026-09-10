// Department controller — CRUD operations.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /departments
async function getAll(req, res, next) {
  try {
    const { facultyId } = req.query;
    let query = supabaseAdmin
      .from('departments')
      .select('id, faculty_id, name, slug, created_at, updated_at, faculty:faculties(id, name), courses(count)')
      .order('name', { ascending: true });

    if (facultyId) {
      query = query.eq('faculty_id', facultyId);
    }

    const { data: departments, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (departments || []).map((d) => ({
      id: d.id,
      facultyId: d.faculty_id,
      name: d.name,
      slug: d.slug,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
      facultyName: d.faculty?.name || '',
      courseCount: d.courses?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Departments retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /departments/:id
async function getOne(req, res, next) {
  try {
    const { data: department, error } = await supabaseAdmin
      .from('departments')
      .select('id, faculty_id, name, slug, created_at, updated_at, faculty:faculties(id, name, slug), courses(id, course_code, course_title)')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!department) throw new AppError('Department not found.', 404);

    const courses = (department.courses || [])
      .map((c) => ({
        id: c.id,
        courseCode: c.course_code,
        courseTitle: c.course_title,
      }))
      .sort((a, b) => a.courseCode.localeCompare(b.courseCode));

    const formatted = {
      id: department.id,
      facultyId: department.faculty_id,
      name: department.name,
      slug: department.slug,
      createdAt: department.created_at,
      updatedAt: department.updated_at,
      faculty: department.faculty,
      courses,
    };

    return successResponse(res, 'Department retrieved.', formatted);
  } catch (err) {
    return next(err);
  }
}

// POST /departments
async function create(req, res, next) {
  try {
    const { name, facultyId, slug } = req.body;
    const { data: department, error } = await supabaseAdmin
      .from('departments')
      .insert({ name, faculty_id: facultyId, slug })
      .select('id, faculty_id, name, slug, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Department with this name already exists in this faculty or slug is taken.', 409);
      }
      throw new AppError(error.message, 500);
    }

    const formatted = {
      id: department.id,
      facultyId: department.faculty_id,
      name: department.name,
      slug: department.slug,
      createdAt: department.created_at,
      updatedAt: department.updated_at,
    };

    log({
      action: 'department.create',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'department',
      resourceId: formatted.id,
      metadata: { name, facultyId, slug },
    });

    return successResponse(res, 'Department created.', formatted, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /departments/:id
async function update(req, res, next) {
  try {
    const { name, slug } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;

    const { data: department, error } = await supabaseAdmin
      .from('departments')
      .update(updateData)
      .eq('id', req.params.id)
      .select('id, faculty_id, name, slug, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Department with this name already exists in this faculty or slug is taken.', 409);
      }
      throw new AppError(error.message, 500);
    }
    if (!department) throw new AppError('Department not found.', 404);

    const formatted = {
      id: department.id,
      facultyId: department.faculty_id,
      name: department.name,
      slug: department.slug,
      createdAt: department.created_at,
      updatedAt: department.updated_at,
    };

    log({
      action: 'department.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'department',
      resourceId: formatted.id,
      metadata: { name, slug },
    });

    return successResponse(res, 'Department updated.', formatted);
  } catch (err) {
    return next(err);
  }
}

// DELETE /departments/:id
async function remove(req, res, next) {
  try {
    const { error } = await supabaseAdmin
      .from('departments')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === '23503') {
        throw new AppError('Cannot delete department because it contains courses.', 409);
      }
      throw new AppError(error.message, 500);
    }

    log({
      action: 'department.delete',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'department',
      resourceId: req.params.id,
    });

    return successResponse(res, 'Department deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
