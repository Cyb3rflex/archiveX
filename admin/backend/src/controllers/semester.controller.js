// Semester controller — CRUD operations.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

async function getAll(_req, res, next) {
  try {
    const { data: semesters, error } = await supabaseAdmin
      .from('semesters')
      .select('id, name')
      .order('name', { ascending: true });

    if (error) throw new AppError(error.message, 500);

    return successResponse(res, 'Semesters retrieved.', semesters || []);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const { data: semester, error } = await supabaseAdmin
      .from('semesters')
      .insert({ name })
      .select('id, name')
      .single();

    if (error) {
      if (error.code === '23505') throw new AppError('Semester already exists.', 409);
      throw new AppError(error.message, 500);
    }

    log({ action: 'semester.create', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: semester.id });
    return successResponse(res, 'Semester created.', semester, 201);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const { data: semester, error } = await supabaseAdmin
      .from('semesters')
      .update({ name })
      .eq('id', req.params.id)
      .select('id, name')
      .single();

    if (error) {
      if (error.code === '23505') throw new AppError('Semester with this name already exists.', 409);
      throw new AppError(error.message, 500);
    }
    if (!semester) throw new AppError('Semester not found.', 404);

    log({ action: 'semester.update', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: semester.id });
    return successResponse(res, 'Semester updated.', semester);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { error } = await supabaseAdmin
      .from('semesters')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === '23503') throw new AppError('Cannot delete semester because it is referenced by courses.', 409);
      throw new AppError(error.message, 500);
    }

    log({ action: 'semester.delete', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: req.params.id });
    return successResponse(res, 'Semester deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, create, update, remove };
