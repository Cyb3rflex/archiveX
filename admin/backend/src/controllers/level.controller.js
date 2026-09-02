// Level controller — CRUD operations.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

async function getAll(req, res, next) {
  try {
    const levels = await prisma.level.findMany({ orderBy: { name: 'asc' } });
    return successResponse(res, 'Levels retrieved.', levels);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const level = await prisma.level.create({ data: { name } });
    log({ action: 'level.create', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: level.id });
    return successResponse(res, 'Level created.', level, 201);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const level = await prisma.level.update({ where: { id: req.params.id }, data: { name } });
    log({ action: 'level.update', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: level.id });
    return successResponse(res, 'Level updated.', level);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    await prisma.level.delete({ where: { id: req.params.id } });
    log({ action: 'level.delete', userId: req.user.id, userEmail: req.user.email, resource: 'level', resourceId: req.params.id });
    return successResponse(res, 'Level deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, create, update, remove };
