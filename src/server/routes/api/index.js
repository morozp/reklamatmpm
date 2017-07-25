const express = require('express');
const lineMessages = require('./line-message');
const ads = require('./ads');
var router = express.Router();


router.use('/api', ads);

module.exports = router;