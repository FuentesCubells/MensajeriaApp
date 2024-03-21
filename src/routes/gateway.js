const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/gatewayController');

router.get('/auth', getData)

module.exports = router;