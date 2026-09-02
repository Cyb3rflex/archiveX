// Zod validators for search endpoint.

'use strict';

const { z } = require('zod');

const searchQuerySchema = z.object({
  q: z.string().min(1, 'Query parameter "q" is required').trim().max(120),
});

module.exports = { searchQuerySchema };
