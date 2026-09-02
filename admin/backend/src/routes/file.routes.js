// File access routes — signed URLs for download and preview.

'use strict';

const { Router } = require('express');
const file = require('../controllers/file.controller');
const validate = require('../middlewares/validate');
const { idParamSchema } = require('../utils/validators/pastQuestion.validator');

const router = Router();

router.get('/download/:id', validate({ params: idParamSchema }), file.download);
router.get('/preview/:id', validate({ params: idParamSchema }), file.preview);

module.exports = router;
