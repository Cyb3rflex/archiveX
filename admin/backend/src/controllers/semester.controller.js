// Semester controller — CRUD operations.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

async function getAll(req, res, next) {
  try {
    const semesters = await prisma.semester.findMany({ orderBy: { name: 'asc' } });
    return successResponse(res, 'Semesters retrieved.', semesters);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const semester = await prisma.semester.create({ data: { name } });
    log({ action: 'semester.create', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: semester.id });
    return successResponse(res, 'Semester created.', semester, 201);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const semester = await prisma.semester.update({ where: { id: req.params.id }, data: { name } });
    log({ action: 'semester.update', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: semester.id });
    return successResponse(res, 'Semester updated.', semester);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    await prisma.semester.delete({ where: { id: req.params.id } });
    log({ action: 'semester.delete', userId: req.user.id, userEmail: req.user.email, resource: 'semester', resourceId: req.params.id });
    return successResponse(res, 'Semester deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, create, update, remove };
