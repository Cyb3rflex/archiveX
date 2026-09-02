// Zod validators for past question endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({ id: z.string().min(1) });

const listPastQuestionsQuerySchema = z.object({
  courseId: z.string().optional(),
  session: z.string().optional(),
  year: z
    .string()
    .regex(/^\d{4}$/, 'Year must be a 4-digit number')
    .optional(),
});

const createPastQuestionSchema = z.object({
  courseId: z.string().min(1, 'Course is required'),
  session: z
    .string()
    .regex(/^\d{4}\/\d{4}$/, 'Session must be in YYYY/YYYY format')
    .trim(),
  year: z
    .number({ invalid_type_error: 'Year must be a number' })
    .int()
    .min(1900)
    .max(2100),
  examType: z.enum(['CA', 'MID_SEMESTER', 'FINAL']),
});

const updatePastQuestionSchema = z
  .object({
    session: z
      .string()
      .regex(/^\d{4}\/\d{4}$/, 'Session must be in YYYY/YYYY format')
      .trim()
      .optional(),
    year: z.number().int().min(1900).max(2100).optional(),
    examType: z.enum(['CA', 'MID_SEMESTER', 'FINAL']).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

module.exports = {
  idParamSchema,
  listPastQuestionsQuerySchema,
  createPastQuestionSchema,
  updatePastQuestionSchema,
};
