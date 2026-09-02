// Search controller — search courses by code or title.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');

async function search(req, res, next) {
  try {
    const { q } = req.query;
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { courseCode: { contains: q, mode: 'insensitive' } },
          { courseTitle: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: { courseCode: 'asc' },
      include: {
        department: { select: { name: true, faculty: { select: { name: true } } } },
        level: { select: { name: true } },
        semester: { select: { name: true } },
        _count: { select: { pastQuestions: true } },
      },
    });

    const data = courses.map((c) => ({
      id: c.id,
      courseCode: c.courseCode,
      courseTitle: c.courseTitle,
      slug: c.slug,
      department: c.department.name,
      faculty: c.department.faculty.name,
      level: c.level.name,
      semester: c.semester.name,
      pastQuestionCount: c._count.pastQuestions,
    }));

    return successResponse(res, 'Search results.', data);
  } catch (err) {
    return next(err);
  }
}

module.exports = { search };
