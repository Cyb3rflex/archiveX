// Department routes — CRUD (ADMIN+ for writes).

'use strict';

const { Router } = require('express');
const department = require('../controllers/department.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  listDepartmentsQuerySchema,
  createDepartmentSchema,
  updateDepartmentSchema,
} = require('../utils/validators/department.validator');

const router = Router();

router.get('/', validate({ query: listDepartmentsQuerySchema }), department.getAll);
router.get('/:id', validate({ params: idParamSchema }), department.getOne);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ body: createDepartmentSchema }),
  department.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updateDepartmentSchema }),
  department.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  department.remove,
);

module.exports = router;
