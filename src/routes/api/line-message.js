const express = require('express');
var router = express.Router();

const messages = [];
router.use(function timeLog(req, resp, next) {
	console.log('Api messages Time: ', Date.now());
	next();
});

router.get('/', (req, resp) => {
	resp.send(messages);
})
	.post((req, resp) => {
		const id = messages.length + 1;
		messages.push({ id: id, messages: `added message ${id}` });
		resp.send(messages);

	}).put((res, resp) => {
		let indexOfMessage = null;
		const message = messages.find((message, index) => {
			index = indexOfMessage;
			return message.id === 1;

		});
		if (message) {
			messages[indexOfMessage] = message;
		}

		res.send(messages);

	})
	.get(
	'/post',
	(req, resp) => {
		const id = messages.length + 1;
		messages.push({ id: id, messages: `added message ${id}` });
		resp.send(messages);
	}
	).get('/:messageId', (req, resp) => {
		resp.send(messages.find((message) => message.id === parseInt(req.params.messageId, 0)))
	});

module.exports = router;