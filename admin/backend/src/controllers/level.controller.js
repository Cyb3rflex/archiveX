// Level controller — CRUD operations.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

async function getAll(_req, res, next) {
  try {
    const { data: levels, error } = await supabaseAdmin
      .from('levels')
      .select('id, name')
      .order('name', { ascending: true });

    if (error) throw new AppError(error.message, 500);

    return successResponse(res, 'Levels retrieved.', levels || []);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const { data: level, error } = await supabaseAdmin
      .from('levels')
      .insert({ name })
      .select('id, name')
      .single();

    if (error) {
      if (error.code === '23505') throw new AppError('Level already exists.', 409);
      throw new AppError(error.message, 500);
    }

    log({ action: 'level.create', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: level.id });
    return successResponse(res, 'Level created.', level, 201);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const { data: level, error } = await supabaseAdmin
      .from('levels')
      .update({ name })
      .eq('id', req.params.id)
      .select('id, name')
      .single();

    if (error) {
      if (error.code === '23505') throw new AppError('Level with this name already exists.', 409);
      throw new AppError(error.message, 500);
    }
    if (!level) throw new AppError('Level not found.', 404);

    log({ action: 'level.update', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: level.id });
    return successResponse(res, 'Level updated.', level);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { error } = await supabaseAdmin
      .from('levels')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === '23503') throw new AppError('Cannot delete level because it is referenced by courses.', 409);
      throw new AppError(error.message, 500);
    }

    log({ action: 'level.delete', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: req.params.id });
    return successResponse(res, 'Level deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, create, update, remove };
