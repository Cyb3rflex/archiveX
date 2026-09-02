// Semester routes — CRUD.

'use strict';

const { Router } = require('express');
const semester = require('../controllers/semester.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  createSemesterSchema,
  updateSemesterSchema,
} = require('../utils/validators/semester.validator');

const router = Router();

router.get('/', semester.getAll);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ body: createSemesterSchema }),
  semester.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updateSemesterSchema }),
  semester.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  semester.remove,
);

module.exports = router;
