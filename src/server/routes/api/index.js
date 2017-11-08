const express = require('express');
const lineMessages = require('./line-message');
const ads = require('./ads');
const users = require('./users');
const files = require('./files');
var router = express.Router();


router.use('/api', ads);
router.use('/api', users);
router.use('/api', files);

module.exports = router;