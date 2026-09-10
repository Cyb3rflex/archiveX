'use strict';

const { Router } = require('express');
const controller = require('../controllers/search.controller');

const router = Router();

router.get('/', controller.search);

module.exports = router;
