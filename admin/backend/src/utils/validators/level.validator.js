// Zod validators for level endpoints.

'use strict';

const { z } = require('zod');

const idParamSchema = z.object({ id: z.string().min(1) });

const createLevelSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

const updateLevelSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

module.exports = { idParamSchema, createLevelSchema, updateLevelSchema };
