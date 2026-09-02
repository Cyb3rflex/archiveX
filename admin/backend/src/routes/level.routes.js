// Level routes — CRUD.

'use strict';

const { Router } = require('express');
const level = require('../controllers/level.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  createLevelSchema,
  updateLevelSchema,
} = require('../utils/validators/level.validator');

const router = Router();

router.get('/', level.getAll);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ body: createLevelSchema }),
  level.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updateLevelSchema }),
  level.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  level.remove,
);

module.exports = router;
