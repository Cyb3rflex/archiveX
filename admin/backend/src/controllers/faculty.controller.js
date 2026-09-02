// Faculty controller — CRUD operations.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /faculties
async function getAll(req, res, next) {
  try {
    const faculties = await prisma.faculty.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { departments: true } },
      },
    });
    const data = faculties.map((f) => ({
      ...f,
      departmentCount: f._count.departments,
      _count: undefined,
    }));
    return successResponse(res, 'Faculties retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /faculties/:id
async function getOne(req, res, next) {
  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: req.params.id },
      include: {
        departments: {
          orderBy: { name: 'asc' },
          select: { id: true, name: true, slug: true },
        },
      },
    });
    if (!faculty) throw new AppError('Faculty not found.', 404);
    return successResponse(res, 'Faculty retrieved.', faculty);
  } catch (err) {
    return next(err);
  }
}

// POST /faculties
async function create(req, res, next) {
  try {
    const { name, slug } = req.body;
    const faculty = await prisma.faculty.create({ data: { name, slug } });
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
    const faculty = await prisma.faculty.update({
      where: { id: req.params.id },
      data: { name, slug },
    });
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
    await prisma.faculty.delete({ where: { id: req.params.id } });
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
