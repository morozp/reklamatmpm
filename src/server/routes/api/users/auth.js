const express = require('express');
//const userService = require('../../../services/users').init();

var router = express.Router();

router.post('/login', (req, resp) => {
	console.login(req);
	resp.send("login")
});

router.post('/logout', (req, resp) => {
	resp.send("logout")
});

router.post('/authorize', (req, resp) => {
	resp.send("authorize")
});

module.exports = router;