// Role-Based Access Control middleware.
// Use after authenticate to restrict a route to specific roles.
// Usage: router.post('/', authenticate, authorize(['SUPER_ADMIN']), handler)

'use strict';

const { errorResponse } = require('../utils/api-response');

/**
 * Restrict a route to one or more roles.
 * @param {string[]} allowedRoles - Roles that may access the route
 */
function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required.', 401);
    }

    if (allowedRoles.length === 0) {
      return next(); // no restriction
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        'You do not have permission to perform this action.',
        403,
      );
    }

    return next();
  };
}

module.exports = authorize;
