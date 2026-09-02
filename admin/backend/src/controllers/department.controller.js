// Department controller — CRUD operations.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /departments
async function getAll(req, res, next) {
  try {
    const { facultyId } = req.query;
    const where = facultyId ? { facultyId } : {};
    const departments = await prisma.department.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        faculty: { select: { id: true, name: true } },
        _count: { select: { courses: true } },
      },
    });
    const data = departments.map((d) => ({
      ...d,
      facultyName: d.faculty.name,
      faculty: undefined,
      courseCount: d._count.courses,
      _count: undefined,
    }));
    return successResponse(res, 'Departments retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /departments/:id
async function getOne(req, res, next) {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        faculty: { select: { id: true, name: true, slug: true } },
        courses: {
          orderBy: { courseCode: 'asc' },
          select: { id: true, courseCode: true, courseTitle: true },
        },
      },
    });
    if (!department) throw new AppError('Department not found.', 404);
    return successResponse(res, 'Department retrieved.', department);
  } catch (err) {
    return next(err);
  }
}

// POST /departments
async function create(req, res, next) {
  try {
    const { name, facultyId, slug } = req.body;
    const department = await prisma.department.create({
      data: { name, facultyId, slug },
    });
    log({
      action: 'department.create',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'department',
      resourceId: department.id,
      metadata: { name, facultyId, slug },
    });
    return successResponse(res, 'Department created.', department, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /departments/:id
async function update(req, res, next) {
  try {
    const { name, slug } = req.body;
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: { name, slug },
    });
    log({
      action: 'department.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'department',
      resourceId: department.id,
      metadata: { name, slug },
    });
    return successResponse(res, 'Department updated.', department);
  } catch (err) {
    return next(err);
  }
}

// DELETE /departments/:id
async function remove(req, res, next) {
  try {
    await prisma.department.delete({ where: { id: req.params.id } });
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
