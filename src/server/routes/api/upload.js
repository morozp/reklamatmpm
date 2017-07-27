const express = require('express');
const router = express.router;

router.put(
	'/upload',
 	function(req, res) {
  		console.log(req.files);
	},
);
