// Zod validators for department endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

const listDepartmentsQuerySchema = z.object({
  facultyId: z.string().optional(),
});

const createDepartmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120).trim(),
  facultyId: z.string().min(1, 'Faculty is required'),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens only')
    .trim(),
});

const updateDepartmentSchema = z
  .object({
    name: z.string().min(2).max(120).trim().optional(),
    slug: z
      .string()
      .min(2)
      .max(120)
      .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens only')
      .trim()
      .optional(),
  })
  .refine((data) => data.name || data.slug, {
    message: 'At least one field must be provided',
  });

module.exports = {
  idParamSchema,
  listDepartmentsQuerySchema,
  createDepartmentSchema,
  updateDepartmentSchema,
};
