// Course controller — CRUD operations with search.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /courses
async function getAll(req, res, next) {
  try {
    const { departmentId, levelId, semesterId, search } = req.query;

    const where = {};
    if (departmentId) where.departmentId = departmentId;
    if (levelId) where.levelId = levelId;
    if (semesterId) where.semesterId = semesterId;
    if (search) {
      where.OR = [
        { courseCode: { contains: search, mode: 'insensitive' } },
        { courseTitle: { contains: search, mode: 'insensitive' } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: [{ courseCode: 'asc' }],
      include: {
        department: { select: { id: true, name: true } },
        level: { select: { id: true, name: true } },
        semester: { select: { id: true, name: true } },
        _count: { select: { pastQuestions: true } },
      },
    });

    const data = courses.map((c) => ({
      ...c,
      departmentName: c.department.name,
      levelName: c.level.name,
      semesterName: c.semester.name,
      department: undefined,
      level: undefined,
      semester: undefined,
      pastQuestionCount: c._count.pastQuestions,
      _count: undefined,
    }));

    return successResponse(res, 'Courses retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /courses/:id
async function getOne(req, res, next) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        department: { select: { id: true, name: true, slug: true } },
        level: { select: { id: true, name: true } },
        semester: { select: { id: true, name: true } },
        pastQuestions: {
          orderBy: [{ year: 'desc' }, { session: 'desc' }],
          select: { id: true, year: true, session: true, examType: true, downloads: true, createdAt: true },
        },
      },
    });
    if (!course) throw new AppError('Course not found.', 404);
    return successResponse(res, 'Course retrieved.', course);
  } catch (err) {
    return next(err);
  }
}

// POST /courses
async function create(req, res, next) {
  try {
    const { courseCode, courseTitle, departmentId, levelId, semesterId, slug } = req.body;
    const course = await prisma.course.create({
      data: { courseCode, courseTitle, departmentId, levelId, semesterId, slug },
    });
    log({
      action: 'course.create',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'course',
      resourceId: course.id,
      metadata: { courseCode, courseTitle },
    });
    return successResponse(res, 'Course created.', course, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /courses/:id
async function update(req, res, next) {
  try {
    const { courseCode, courseTitle, departmentId, levelId, semesterId, slug } = req.body;
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: { courseCode, courseTitle, departmentId, levelId, semesterId, slug },
    });
    log({ action: 'course.update', userId: req.user.id, userEmail: req.user.email, resource: 'course', resourceId: course.id });
    return successResponse(res, 'Course updated.', course);
  } catch (err) {
    return next(err);
  }
}

// DELETE /courses/:id
async function remove(req, res, next) {
  try {
    await prisma.course.delete({ where: { id: req.params.id } });
    log({ action: 'course.delete', userId: req.user.id, userEmail: req.user.email, resource: 'course', resourceId: req.params.id });
    return successResponse(res, 'Course deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
