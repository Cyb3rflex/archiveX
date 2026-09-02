// Request validation middleware.
// Wraps a Zod schema and validates the request body, params, or query.
// Usage: router.post('/', validate({ body: createSchema }), handler)

'use strict';

const { ZodError } = require('zod');
const { errorResponse } = require('../utils/api-response');

/**
 * Validate request data against Zod schemas.
 * @param {object} schemas - { body?, params?, query? } — each is a Zod schema
 */
function validate(schemas = {}) {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return errorResponse(res, 'Validation failed.', 422, errors);
      }
      return next(err);
    }
  };
}

module.exports = validate;
