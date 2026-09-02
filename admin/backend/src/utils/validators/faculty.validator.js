// Zod validators for faculty endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

const createFacultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120).trim(),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens only')
    .trim(),
});

const updateFacultySchema = z
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
    message: 'At least one field (name or slug) must be provided',
  });

module.exports = { idParamSchema, createFacultySchema, updateFacultySchema };
