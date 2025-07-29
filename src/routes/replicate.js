const express = require('express');
const router = express.Router();
const { generateResponse } = require('../controllers/replicateController');

router.post('/', generateResponse);

module.exports = router;
