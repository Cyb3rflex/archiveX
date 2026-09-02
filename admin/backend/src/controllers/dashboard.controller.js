// Dashboard controller — aggregate statistics.

'use strict';

const prisma = require('../config/database');
const { successResponse } = require('../utils/api-response');

async function getStats(req, res, next) {
  try {
    const [faculties, departments, courses, pastQuestions] = await Promise.all([
      prisma.faculty.count(),
      prisma.department.count(),
      prisma.course.count(),
      prisma.pastQuestion.count(),
    ]);

    // Recent 5 uploads
    const recentUploads = await prisma.pastQuestion.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        course: {
          select: {
            courseCode: true,
            courseTitle: true,
            department: { select: { name: true, faculty: { select: { name: true } } } },
          },
        },
        admin: { select: { fullName: true } },
      },
    });

    const uploads = recentUploads.map((q) => ({
      id: q.id,
      courseCode: q.course.courseCode,
      courseTitle: q.course.courseTitle,
      faculty: q.course.department.faculty.name,
      department: q.course.department.name,
      session: q.session,
      year: q.year,
      examType: q.examType,
      fileName: q.fileName,
      fileSize: q.fileSize,
      downloads: q.downloads,
      uploadedBy: q.admin.fullName,
      createdAt: q.createdAt,
    }));

    return successResponse(res, 'Dashboard data retrieved.', {
      faculties,
      departments,
      courses,
      pastQuestions,
      recentUploads: uploads,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getStats };
