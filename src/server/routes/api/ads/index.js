const express = require('express');
const list = require('./list');
const details = require('./details');
const admin = require('./admin');

var router = express.Router();

router.use('/ads' , list);
router.use('/ads' , details);
router.use('/admin/ads' , admin);

module.exports = router;