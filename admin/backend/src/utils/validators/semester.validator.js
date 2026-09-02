// Zod validators for semester endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({ id: z.string().min(1) });

const createSemesterSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

const updateSemesterSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

module.exports = { idParamSchema, createSemesterSchema, updateSemesterSchema };
