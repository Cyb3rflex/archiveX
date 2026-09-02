// Past Question routes — CRUD + PDF upload (ADMIN+ for writes).

'use strict';

const { Router } = require('express');
const pastQuestion = require('../controllers/pastQuestion.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const uploadPdf = require('../middlewares/upload');
const { uploadLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validate');
const {
  idParamSchema,
  listPastQuestionsQuerySchema,
  createPastQuestionSchema,
  updatePastQuestionSchema,
} = require('../utils/validators/pastQuestion.validator');

const router = Router();

router.get('/', validate({ query: listPastQuestionsQuerySchema }), pastQuestion.getAll);
router.get('/:id', validate({ params: idParamSchema }), pastQuestion.getOne);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  uploadLimiter,
  uploadPdf,
  validate({ body: createPastQuestionSchema }),
  pastQuestion.create,
);
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema, body: updatePastQuestionSchema }),
  pastQuestion.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validate({ params: idParamSchema }),
  pastQuestion.remove,
);

module.exports = router;
