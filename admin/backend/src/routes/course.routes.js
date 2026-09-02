// Course routes — CRUD with search and filters.

'use strict';

const { Router } = require('express');
const course = require('../controllers/course.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  listCoursesQuerySchema,
  createCourseSchema,
  updateCourseSchema,
} = require('../utils/validators/course.validator');

const router = Router();

router.get('/', validate({ query: listCoursesQuerySchema }), course.getAll);
router.get('/:id', validate({ params: idParamSchema }), course.getOne);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ body: createCourseSchema }),
  course.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updateCourseSchema }),
  course.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  course.remove,
);

module.exports = router;
