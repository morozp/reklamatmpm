const express = require('express');
const lineMessages = require('./line-message');
var router = express.Router();

router.use('/messages', lineMessages);

module.exports = router;