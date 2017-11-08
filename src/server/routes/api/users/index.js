const express = require('express');

const auth = require('./auth');
//const admin = require('./admin');
// const admin = require('./profile');

const router = express.Router();
router.use('/user/auth', auth);
//router.use('/user/profile', details);
//router.use('/admin/users', admin);

module.exports = router;