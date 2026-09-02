// Zod validators for course endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({ id: z.string().min(1) });

const listCoursesQuerySchema = z.object({
  departmentId: z.string().optional(),
  levelId: z.string().optional(),
  semesterId: z.string().optional(),
  search: z.string().optional(),
});

const createCourseSchema = z.object({
  courseCode: z
    .string()
    .min(2, 'Course code must be at least 2 characters')
    .max(20)
    .trim()
    .toUpperCase(),
  courseTitle: z.string().min(2).max(200).trim(),
  departmentId: z.string().min(1, 'Department is required'),
  levelId: z.string().min(1, 'Level is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/)
    .trim(),
});

const updateCourseSchema = z
  .object({
    courseCode: z.string().min(2).max(20).trim().toUpperCase().optional(),
    courseTitle: z.string().min(2).max(200).trim().optional(),
    departmentId: z.string().optional(),
    levelId: z.string().optional(),
    semesterId: z.string().optional(),
    slug: z
      .string()
      .min(2)
      .max(120)
      .regex(/^[a-z0-9-]+$/)
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

module.exports = {
  idParamSchema,
  listCoursesQuerySchema,
  createCourseSchema,
  updateCourseSchema,
};
