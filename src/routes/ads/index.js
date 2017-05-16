const express = require('express');
const list = require('./list');
const details = require('./details');
var router = express.Router();

router.use(list);

router.use(details);

module.exports = router;