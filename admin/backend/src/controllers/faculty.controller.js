// Faculty controller — CRUD operations.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /faculties
async function getAll(req, res, next) {
  try {
    const { data: faculties, error } = await supabaseAdmin
      .from('faculties')
      .select('id, name, slug, created_at, updated_at, departments(count)')
      .order('name', { ascending: true });

    if (error) throw new AppError(error.message, 500);

    const data = (faculties || []).map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
      departmentCount: f.departments?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Faculties retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /faculties/:id
async function getOne(req, res, next) {
  try {
    const { data: faculty, error } = await supabaseAdmin
      .from('faculties')
      .select('id, name, slug, created_at, updated_at, departments(id, name, slug)')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!faculty) throw new AppError('Faculty not found.', 404);

    if (Array.isArray(faculty.departments)) {
      faculty.departments.sort((a, b) => a.name.localeCompare(b.name));
    }

    const formatted = {
      id: faculty.id,
      name: faculty.name,
      slug: faculty.slug,
      createdAt: faculty.created_at,
      updatedAt: faculty.updated_at,
      departments: faculty.departments || [],
    };

    return successResponse(res, 'Faculty retrieved.', formatted);
  } catch (err) {
    return next(err);
  }
}

// POST /faculties
async function create(req, res, next) {
  try {
    const { name, slug } = req.body;
    const { data: faculty, error } = await supabaseAdmin
      .from('faculties')
      .insert({ name, slug })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Faculty with this name or slug already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }

    log({
      action: 'faculty.create',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'faculty',
      resourceId: faculty.id,
      metadata: { name, slug },
    });

    return successResponse(res, 'Faculty created.', faculty, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /faculties/:id
async function update(req, res, next) {
  try {
    const { name, slug } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;

    const { data: faculty, error } = await supabaseAdmin
      .from('faculties')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Faculty with this name or slug already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }
    if (!faculty) throw new AppError('Faculty not found.', 404);

    log({
      action: 'faculty.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'faculty',
      resourceId: faculty.id,
      metadata: { name, slug },
    });

    return successResponse(res, 'Faculty updated.', faculty);
  } catch (err) {
    return next(err);
  }
}

// DELETE /faculties/:id
async function remove(req, res, next) {
  try {
    const { error } = await supabaseAdmin
      .from('faculties')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === '23503') {
        throw new AppError('Cannot delete faculty because it contains departments.', 409);
      }
      throw new AppError(error.message, 500);
    }

    log({
      action: 'faculty.delete',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'faculty',
      resourceId: req.params.id,
    });

    return successResponse(res, 'Faculty deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
