// Faculty routes — CRUD (SUPER_ADMIN only for write).

'use strict';

const { Router } = require('express');
const faculty = require('../controllers/faculty.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  createFacultySchema,
  updateFacultySchema,
} = require('../utils/validators/faculty.validator');

const router = Router();

// Public reads (students browse faculties)
router.get('/', faculty.getAll);
router.get('/:id', validate({ params: idParamSchema }), faculty.getOne);

// Protected writes (super admins only)
router.post(
  '/',
  authenticate,
  authorize(['SUPER_ADMIN']),
  validate({ body: createFacultySchema }),
  faculty.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updateFacultySchema }),
  faculty.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  faculty.remove,
);

module.exports = router;
