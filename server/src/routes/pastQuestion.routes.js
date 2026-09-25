'use strict';

const { Router } = require('express');
const controller = require('../controllers/pastQuestion.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/recent', controller.getRecent);
router.get('/:id', controller.getById);
router.get('/:id/download', controller.getDownloadUrl);
router.get('/:id/preview', controller.getPreviewUrl);

module.exports = router;
