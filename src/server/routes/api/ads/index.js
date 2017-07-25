const express = require('express');
const list = require('./list');
const details = require('./details');
var router = express.Router();

router.use('/ads' , list);
router.use('/ads' , details);

module.exports = router;