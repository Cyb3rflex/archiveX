// Search routes — search across courses.

'use strict';

const { Router } = require('express');
const search = require('../controllers/search.controller');
const validate = require('../middlewares/validate');
const { searchQuerySchema } = require('../utils/validators/search.validator');

const router = Router();

router.get('/', validate({ query: searchQuerySchema }), search.search);

module.exports = router;
